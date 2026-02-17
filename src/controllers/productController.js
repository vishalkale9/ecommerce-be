const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            images,
            createdBy: req.user?._id // Assumes authMiddleware attaches user to req
        });

        res.status(201).json({
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ message: "Products fetched successfully", data: products })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock, images } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, stock, images }, { new: true, runValidators: true })

        if (!updatedProduct) {
            return res.status(404).json({ status: "fail", message: "Product not found" })
        }
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ status: "fail", message: "Product not found" })
        }
        res.status(200).json({ message: "Product deleted successfully", data: deletedProduct })
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
}
