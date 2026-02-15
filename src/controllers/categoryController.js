const Category = require("../models/categoryModel")

exports.createCategory = async (req, res) => {
    try {

        const { name, description } = req.body;
        const newCategory = await Category.create({ name, description })
        res.status(201).json({ message: "Category created successfully", data: newCategory })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
}


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({ message: "Categories fetched successfully", data: categories })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true, runValidators: true })

        if (!updatedCategory) {
            return res.status(404).json({ status: "fail", message: "Category not found" })
        }
        res.status(200).json({ message: "Category updated successfully", data: updatedCategory })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id)
        if (!deletedCategory) {
            return res.status(404).json({ status: "fail", message: "Category not found" })
        }
        res.status(200).json({ message: "Category deleted successfully", data: deletedCategory })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
}
