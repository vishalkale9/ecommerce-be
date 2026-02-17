const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        unique: true // No two categories can have the same name
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true // Makes searching by slug very fast!
    },
    description: {
        type: String,
    }
}, { timestamps: true })


categorySchema.pre("save", function () {
    if (this.isModified("name") && this.name) {
        this.slug = this.name
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }
});

module.exports = mongoose.model("Category", categorySchema);