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

//pre save hooks we are using before store to db okay

// The Modern Way (No 'next' needed!)
categorySchema.pre("save", function () {
    // 1. Safety Check: Only run if name is actually there and changed
    if (this.isModified("name") && this.name) {
        this.slug = this.name
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }
    // Professor Tip: In Mongoose 9, if you don't use 'next', 
    // you don't need to return anything! It just works.
});

module.exports = mongoose.model("Category", categorySchema);