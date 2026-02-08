import { Router } from "express";
import { auth } from "../middleware/token";
import {
  createNewSkill,
  deleteSkill,
  filterSkillsBySection,
  getAllSkills,
  getSkill,
  updateSkillData,
} from "../controllers/skillData.controller";
import { upload } from "../middleware/multer";

const router = Router();
/**
 * @swagger
 * /api/v1/skills/createSkill:
 *   post:
 *     summary: Create a new skill with optional image
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - skill
 *               - description
 *               - section
 *               - level
 *             properties:
 *               skill:
 *                 type: string
 *                 example: React
 *               description:
 *                 type: string
 *                 example: Building modern frontend applications
 *               section:
 *                 type: string
 *                 enum:
 *                   - Development
 *                   - Art & Design
 *                   - Business
 *                   - Marketing
 *                   - Other
 *                 example: Development
 *               level:
 *                 type: string
 *                 enum:
 *                   - Beginner
 *                   - Intermediate
 *                   - Advanced
 *                 example: Intermediate
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Skill image (optional)
 *     responses:
 *       201:
 *         description: Skill created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.post("/createSkill", auth, upload.single("image"), createNewSkill);
/**
 * @swagger
 * /api/v1/skills/getSkill/{skillId}:
 *   get:
 *     summary: Get a skill by ID
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65af123abc456def789
 *     responses:
 *       200:
 *         description: Skill found
 *       400:
 *         description: Skill ID is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Skill not found
 */

router.get("/getSkill/:skillId", auth, getSkill);
/**
 * @swagger
 * /api/v1/skills/getAllSkills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All skills returned
 *       401:
 *         description: Unauthorized
 */

router.get("/getAllSkills", getAllSkills);
/**
 * @swagger
 * /api/v1/skills/updateSkills/{skillId}:
 *   patch:
 *     summary: Update a skill (with optional image)
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         description: The ID of the skill to update
 *         schema:
 *           type: string
 *           example: 65af123abc456def789
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               skill:
 *                 type: string
 *                 example: Next.js
 *               description:
 *                 type: string
 *                 example: Advanced React framework
 *               section:
 *                 type: string
 *                 enum:
 *                   - Development
 *                   - Art & Design
 *                   - Business
 *                   - Marketing
 *                   - Other
 *                 example: DEVELOPMENT
 *               level:
 *                 type: string
 *                 enum:
 *                   - Beginner
 *                   - Intermediate
 *                   - Advanced
 *                 example: Advanced
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Updated skill image (optional)
 *     responses:
 *       200:
 *         description: Skill updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Skill not found
 *       500:
 *         description: Server error
 */
router.patch("/updateSkills/:skillId", auth, updateSkillData);
/**
 * @swagger
 * /api/v1/skills/removeSkill/{skillId}:
 *   delete:
 *     summary: Remove a skill by ID
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65af123abc456def789
 *     responses:
 *       200:
 *         description: Skill found
 *       400:
 *         description: Skill ID is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Skill not found
 */
router.delete("/removeSkill/:skillId", auth, deleteSkill);
/**
 * @swagger
 * /api/v1/skills/getSkillsBySection:
 *   get:
 *     summary: Get skills filtered by section
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: section
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Development, ArtDesign, Business, Marketing, Other]
 *         description: The section to filter skills by
 *         example: Development
 *     responses:
 *       200:
 *         description: Skills retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Skills retrieved successfully"
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       skill:
 *                         type: string
 *                       description:
 *                         type: string
 *                       image:
 *                         type: string
 *                       section:
 *                         type: string
 *                       userId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           username:
 *                             type: string
 *       400:
 *         description: Invalid section parameter
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No skills found for this section
 *       500:
 *         description: Server error
 */
router.get("/getSkillsBySection", auth, filterSkillsBySection);
export default router;
