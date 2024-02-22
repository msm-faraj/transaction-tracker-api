const Accounts = [
  { id: 1, name: "cash", type: "expense", userId: 1 },
  { id: 2, name: "cash", type: "income", userId: 1 },
  { id: 3, name: "tejarat", type: "income", userId: 1 },
  { id: 4, name: "tejarat", type: "expense", userId: 1 },
  { id: 5, name: "cash", type: "expense", userId: 2 },
  { id: 6, name: "cash", type: "income", userId: 2 },
  { id: 7, name: "tejarat", type: "income", userId: 2 },
  { id: 8, name: "tejarat", type: "expense", userId: 2 },
];
module.exports = Accounts;

// they must be unique for one person one type and one name!!!
