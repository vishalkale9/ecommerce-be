const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "A product must belong to a category"]
    },
    stock: {
        type: Number, default: 0
    },
    images: [String], // Array of image URLs
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true })

productSchema.pre("save", function () {
    if (this.isModified("name") && this.name) {
        this.slug = this.name
            .toLowerCase()
            .split(" ")
            .join("-")
            .replace(/[^\w-]+/g, "");
    }
});

module.exports = mongoose.model("Product", productSchema)