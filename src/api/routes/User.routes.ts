import { Router } from "express";
import {
  createNewUser,
  getUserByToken,
  getUserProfile,
  logoutUser,
  signInUser,
  updateUser,
  userDeleter,
  usersGetter,
} from "../controllers/User.controller";
import { upload } from "../middleware/multer";
import { auth } from "../middleware/token";

const router = Router();
router.post("/newUser", upload.single("profilePicture"), createNewUser);
/**
 * @swagger
 * /api/v1/users/newUser:
 *   post:
 *     summary: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - title
 *               - password
 *               - bio
 *               - profilePicture
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               title:
 *                 type: string
 *                 example: Front-End
 *               password:
 *                 type: string
 *                 example: Pass1234
 *               bio:
 *                 type: string
 *                 example: I am a full-stack developer.
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Upload the profile picture file
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Validation error (e.g., missing required fields, password mismatch)
 *       500:
 *         description: Server error
 */

router.post("/signIn", signInUser);
/**
 * @swagger
 * /api/v1/users/signIn:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Pass1234
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/getUserByToken", auth, getUserByToken);
/**
 * @swagger
 * /api/v1/users/getUserByToken:
 *   get:
 *     summary: Get authenticated user by token
 *     tags: [Users]
 *     description: >
 *       Returns the currently authenticated user's data based on the JWT token
 *       sent automatically via HttpOnly cookies. No user ID is required.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64f9a1c9e9b1a2c3d4e5f6a7
 *                 name:
 *                   type: string
 *                   example: Mohamed
 *                 email:
 *                   type: string
 *                   example: mohamed@example.com
 *                 role:
 *                   type: string
 *                   example: user
 *       401:
 *         description: Unauthorized – token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.get("/getUser/:id", getUserProfile);
/**
 * @swagger
 * /api/v1/users/getUser/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *           example: 64b1234abcdef56789
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: User ID is required
 *       404:
 *         description: User not found
 */

router.get("/getUsers", usersGetter);
/**
 * @swagger
 * /api/v1/users/getUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.delete("/deleteUser/:id", userDeleter);
/**
 * @swagger
 * /api/v1/users/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *           example: 64b1234abcdef56789
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 removeUser:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: User ID is required
 *       404:
 *         description: User not found
 */

router.put("/updateUser/:id", upload.single("profilePicture"), updateUser);
/**
 * @swagger
 * /api/v1/users/updateUser/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *           example: 64b1234abcdef56789
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               skills:
 *                 type: string
 *                 example: '[{"sName":"JavaScript","level":"Advanced"}]'
 *               bio:
 *                 type: string
 *                 example: Frontend developer
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedUser:
 *                   type: object
 *       400:
 *         description: User ID is required
 *       404:
 *         description: User not found
 */
router.post("/logOut", auth, logoutUser);
/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logs out the current user by clearing the authentication token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 */
export default router;
