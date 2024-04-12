const AccountController = require("./account");

describe("AccountController", () => {
  describe("create", () => {
    describe("when validateAccount throws an error", () => {
      let req,
        res,
        next,
        validationError,
        mockValidateAccount,
        mockResponseSend;

      beforeEach(async () => {
        req = { body: { name: "TestAccountName" }, user: { id: 123 } };
        validationError = { message: "TestErrorMessage" };
        mockValidateAccount = jest
          .fn()
          .mockReturnValueOnce({ error: validationError });
        const accountController = new AccountController(
          null,
          mockValidateAccount,
          null
        );
        mockResponseSend = jest.fn();
        res = {
          status: jest.fn().mockReturnValueOnce({ send: mockResponseSend }),
        };
        next = jest.fn();
        await accountController.create(req, res, next);
      });

      it("should call validateAccount with correct parameters", () => {
        expect(mockValidateAccount).toHaveBeenCalledWith(req.body);
      });

      it("should call res.status with correct parameters (400)", () => {
        expect(res.status).toHaveBeenCalledWith(400);
      });

      it("should call res.send with correct parameters", () => {
        expect(mockResponseSend).toHaveBeenCalledWith(validationError.message);
      });

      it("should not call next", () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("when validateAccount does not throw an error", () => {
      let req,
        res,
        next,
        mockAccount,
        mockValidateAccount,
        mockResponseSend,
        accountController;

      beforeEach(async () => {
        req = { body: { name: "TestAccountName" }, user: { id: 123 } };
        mockAccount = { name: "TestAccountName" };
        mockValidateAccount = jest.fn().mockReturnValueOnce({});
        accountController = new AccountController(
          {
            create: jest.fn().mockResolvedValueOnce(mockAccount),
          },
          mockValidateAccount,
          null
        );
        mockResponseSend = jest.fn();
        res = {
          status: jest.fn().mockReturnValueOnce({ send: mockResponseSend }),
        };
        next = jest.fn();
        await accountController.create(req, res, next);
      });

      it("should call validateAccount with correct parameters", () => {
        expect(mockValidateAccount).toHaveBeenCalledWith(req.body);
      });

      it("should call res.status", () => {
        expect(res.status).toHaveBeenCalled();
      });

      it("should call this.Account.create with correct parameters", () => {
        expect(accountController.Account.create).toHaveBeenCalledWith({
          name: req.body.name,
          userId: req.user.id,
        });
      });

      it("should call res.send with correct parameters", () => {
        expect(mockResponseSend).toHaveBeenCalledWith({
          name: mockAccount.name,
        });
      });

      it("should not call next", () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("when create method throws an error", () => {
      let req, res, next, mockValidateAccount, mockResponseSend;

      beforeEach(async () => {
        req = { body: { name: "TestAccountName" }, user: { id: 123 } };
        mockValidateAccount = jest.fn().mockReturnValueOnce({});
        const accountController = new AccountController(
          {
            // Mock this.Account.create method to throw an error
            create: jest.fn().mockRejectedValueOnce(new Error("TestError")),
          },
          mockValidateAccount,
          null
        );
        mockResponseSend = jest.fn();
        res = {
          status: jest.fn().mockReturnValueOnce({ send: mockResponseSend }),
        };
        next = jest.fn();
        await accountController.create(req, res, next);
      });

      it("should call validateAccount with correct parameters", () => {
        expect(mockValidateAccount).toHaveBeenCalledWith(req.body);
      });

      it("should not call res.status", () => {
        expect(res.status).not.toHaveBeenCalled();
      });

      it("should not call res.send", () => {
        expect(mockResponseSend).not.toHaveBeenCalled();
      });

      it("should call next with the error", () => {
        expect(next).toHaveBeenCalledWith(new Error("TestError"));
      });
    });
  });

  describe("getAll", () => {
    describe("when database operation succeeds", () => {
      let req, res, next, mockUser, mockAccountFindAll, mockResponseSend;

      beforeEach(async () => {
        req = { user: { id: "user_id" } };
        mockUser = { id: "user_id" };
        mockAccountFindAll = jest
          .fn()
          .mockResolvedValueOnce([{ name: "Account1" }, { name: "Account2" }]);
        const accountController = new AccountController(
          { findAll: mockAccountFindAll },
          null,
          mockUser
        );
        mockResponseSend = jest.fn();
        res = {
          status: jest.fn().mockReturnValueOnce({ send: mockResponseSend }),
        };
        next = jest.fn();
        await accountController.getAll(req, res, next);
      });

      it("should call Account.findAll with correct parameters", () => {
        expect(mockAccountFindAll).toHaveBeenCalledWith({
          where: { userId: req.user.id, deletedAt: null },
        });
      });

      it("should call res.status with correct parameters (200)", () => {
        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("should call res.send with correct parameters", () => {
        expect(mockResponseSend).toHaveBeenCalledWith([
          { name: "Account1" },
          { name: "Account2" },
        ]);
      });

      it("should not call next", () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("when database operation fails", () => {
      let req, res, next, mockUser, mockAccountFindAll, error;

      beforeEach(async () => {
        req = { user: { id: "user_id" } };
        mockUser = { id: "user_id" };
        error = new Error("Database error");
        mockAccountFindAll = jest.fn().mockRejectedValueOnce(error);
        const accountController = new AccountController(
          { findAll: mockAccountFindAll },
          null,
          mockUser
        );
        res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
        await accountController.getAll(req, res, next);
      });

      it("should call Account.findAll with correct parameters", () => {
        expect(mockAccountFindAll).toHaveBeenCalledWith({
          where: { userId: req.user.id, deletedAt: null },
        });
      });

      it("should not call res.status", () => {
        expect(res.status).not.toHaveBeenCalled(); // here is ok
      });

      it("should not call res.send", () => {
        expect(res.send).not.toHaveBeenCalled();
      });

      it("should call next with the error", () => {
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });

  describe("update", () => {
    describe("when validation fails", () => {
      let req, res, next, mockValidateAccount, mockResponseSend;

      beforeEach(async () => {
        req = { body: { name: "TestAccountName" } };
        mockValidateAccount = jest
          .fn()
          .mockReturnValueOnce({ error: { message: "TestErrorMessage" } });
        const accountController = new AccountController(
          null,
          mockValidateAccount,
          null
        );
        mockResponseSend = jest.fn();
        res = {
          status: jest.fn().mockReturnValueOnce({ send: mockResponseSend }),
        };
        next = jest.fn();
        await accountController.update(req, res, next);
      });

      it("should call validateAccount with correct parameters", () => {
        expect(mockValidateAccount).toHaveBeenCalledWith(req.body);
      });

      it("should call res.status with correct parameters (400)", () => {
        expect(res.status).toHaveBeenCalledWith(400);
      });

      it("should call res.send with correct parameters", () => {
        expect(mockResponseSend).toHaveBeenCalledWith("TestErrorMessage");
      });

      it("should not call next", () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("when account is not found", () => {
      let req, res, next, mockValidateAccount, mockAccount, mockResponseSend;

      beforeEach(async () => {
        req = { body: { name: "TestAccountName" }, params: { id: "123456" } };
        mockValidateAccount = jest.fn().mockReturnValueOnce({ error: null });
        // Mocking that account is not found
        mockAccount = {
          findOne: jest.fn().mockResolvedValueOnce(null),
        };
        const accountController = new AccountController(
          mockAccount,
          mockValidateAccount,
          null
        );
        mockResponseSend = jest.fn();
        res = {
          status: jest.fn().mockReturnValueOnce({ send: mockResponseSend }),
        };
        next = jest.fn();
        await accountController.update(req, res, next);
      });

      it("should call findOne with correct parameters", () => {
        expect(mockAccount.findOne).toHaveBeenCalledWith({
          where: { id: "123456" },
        });
      });

      it("should call res.status with correct parameters (404)", () => {
        expect(res.status).toHaveBeenCalledWith(404);
      });

      it("should call res.send with correct parameters", () => {
        expect(mockResponseSend).toHaveBeenCalledWith("Account not found.");
      });

      it("should not call next", () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("when update is successful", () => {
      let req,
        res,
        next,
        mockValidateAccount,
        mockAccount,
        mockResponseSend,
        mockResponseStatus;

      beforeEach(async () => {
        req = { body: { name: "TestAccountName" }, params: { id: "123456" } };
        mockValidateAccount = jest.fn().mockReturnValueOnce({ error: null });
        // Mocking the successful finding of the account
        mockAccount = {
          findOne: jest.fn().mockResolvedValueOnce({
            id: "123456",
            name: "Old Account Name",
            save: jest.fn().mockResolvedValueOnce(), // Mocking the successful update of the account
          }),
        };
        const accountController = new AccountController(
          mockAccount,
          mockValidateAccount,
          null
        );
        mockResponseSend = jest.fn();
        mockResponseStatus = jest
          .fn()
          .mockReturnValueOnce({ send: mockResponseSend });
        res = {
          status: mockResponseStatus,
        };
        next = jest.fn();
        await accountController.update(req, res, next);
      });

      it("should call findOne with correct parameters", () => {
        expect(mockAccount.findOne).toHaveBeenCalledWith({
          where: { id: "123456" },
        });
      });

      it("should call validateAccount with correct parameters", () => {
        expect(mockValidateAccount).toHaveBeenCalledWith(req.body);
      });

      it("should call account.save", () => {
        // Access the saved account object directly from the mock, not from findOne
        expect(mockAccount.findOne().save).toHaveBeenCalled();
      });

      it("should call res.status with correct parameters (200)", () => {
        expect(mockResponseStatus).toHaveBeenCalledWith(200);
      });

      it("should call res.send with correct parameters", () => {
        expect(mockResponseSend).toHaveBeenCalledWith({
          name: "TestAccountName",
        });
      });

      it("should not call next", () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("when update throws an error", () => {
      let req, res, next, mockValidateAccount, mockAccount, mockResponseEnd;

      beforeEach(async () => {
        req = { body: { name: "TestAccountName" }, params: { id: "123456" } };
        mockValidateAccount = jest.fn().mockReturnValueOnce({ error: null });
        // Mocking the successful finding of the account
        mockAccount = {
          findOne: jest.fn().mockResolvedValueOnce({
            id: "123456",
            name: "Old Account Name",
            save: jest.fn().mockRejectedValueOnce(new Error("Update error")), // Mocking the update error
          }),
        };
        const accountController = new AccountController(
          mockAccount,
          mockValidateAccount,
          null
        );
        mockResponseEnd = jest.fn();
        res = {
          status: jest.fn().mockReturnValueOnce({ end: mockResponseEnd }),
        };
        next = jest.fn();
        await accountController.update(req, res, next);
      });

      it("should call findOne with correct parameters", () => {
        expect(mockAccount.findOne).toHaveBeenCalledWith({
          where: { id: "123456" },
        });
      });

      it("should call validateAccount with correct parameters", () => {
        expect(mockValidateAccount).toHaveBeenCalledWith(req.body);
      });

      it("should call res.status with correct parameters (500)", () => {
        expect(res.status).toHaveBeenCalledWith(500);
      });

      it("should call res.end", () => {
        expect(mockResponseEnd).toHaveBeenCalled();
      });

      it("should call next with the error", () => {
        expect(next).toHaveBeenCalledWith(new Error("Update error"));
      });
    });
  });

  describe("delete", () => {
    describe("when account is found and deleted successfully", () => {
      let req, res, next, mockAccount, mockResponseEnd;

      beforeEach(async () => {
        req = { params: { id: "123456" } };
        // Mocking the successful finding of the account
        mockAccount = {
          findOne: jest.fn().mockResolvedValueOnce({
            // Mocking the successful finding of the account
            id: "123456",
            name: "Test Account",
            deletedAt: null,
            save: jest.fn().mockResolvedValueOnce(), // Mocking the successful soft deletion of the account
          }),
        };
        const accountController = new AccountController(
          mockAccount,
          null,
          null
        );
        mockResponseEnd = jest.fn();
        res = {
          status: jest.fn().mockReturnValueOnce({ end: mockResponseEnd }),
        };
        next = jest.fn();
        await accountController.delete(req, res, next);
      });

      it("should call findOne with correct parameters", () => {
        expect(mockAccount.findOne).toHaveBeenCalledWith({
          where: { id: "123456" },
        });
      });

      it("should call save on the found account", () => {
        expect(mockAccount.findOne().save).toHaveBeenCalled();
      });

      it("should call res.status with correct parameters (204)", () => {
        expect(res.status).toHaveBeenCalledWith(204);
      });

      it("should call res.end", () => {
        expect(mockResponseEnd).toHaveBeenCalled();
      });

      it("should not call next", () => {
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("when account is not found", () => {
      let req, res, next, mockAccount, mockResponseSend;

      beforeEach(async () => {
        req = { params: { id: "123456" } };
        // Mocking that account is not found
        mockAccount = {
          findOne: jest.fn().mockResolvedValueOnce(null),
        };
        const accountController = new AccountController(
          mockAccount,
          null,
          null
        );
        mockResponseSend = jest.fn();
        res = {
          status: jest.fn().mockReturnValueOnce({ send: mockResponseSend }),
        };
        next = jest.fn();
        await accountController.delete(req, res, next);
      });

      it("should call findOne with correct parameters", () => {
        expect(mockAccount.findOne).toHaveBeenCalledWith({
          where: { id: "123456" },
        });
      });

      it("should call res.status with correct parameters (404)", () => {
        expect(res.status).toHaveBeenCalledWith(404);
      });

      it("should call res.send with correct parameters", () => {
        expect(mockResponseSend).toHaveBeenCalledWith("Account not found.");
      });

      it("should not call next", () => {
        expect(next).not.toHaveBeenCalled();
      });
    });
  });
});
