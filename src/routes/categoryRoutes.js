const express = require("express");
const router = express.Router();

const categoryCtrl = require("../controllers/categoryController")
const { protect, restrictTo } = require("../middleware/authMiddleware")

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: Brief description of the category
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management API
 */

/**
 * @swagger
 * /api/v1/category/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 *       403:
 *         description: Forbidden - Admin only
 */
router.post("/createCategory", protect, restrictTo("admin"), categoryCtrl.createCategory)

/**
 * @swagger
 * /api/v1/category/getAllCategories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 */
router.get("/getAllCategories", categoryCtrl.getAllCategories)

/**
 * @swagger
 * /api/v1/category/updateCategory/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put("/updateCategory/:id", protect, restrictTo("admin"), categoryCtrl.updateCategory)

/**
 * @swagger
 * /api/v1/category/deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category id
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete("/deleteCategory/:id", protect, restrictTo("admin"), categoryCtrl.deleteCategory)

module.exports = router


