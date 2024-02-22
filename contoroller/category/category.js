class CategoryController {
  constructor(Category, validator) {
    this.Category = Category;
    this.validator = validator;
  }

  async createCategory(req, res) {}

  async updateCategory(req, res) {}

  async deleteCategory(req, res) {}

  async getCategory(req, res) {} //???

  async getCategories(req, res) {}
}

module.exports = CategoryController;
