import { Router } from "express";
import {
  createSkillOffer,
  filterSkillOffersBySection,
  getAllSkillOffers,
  removeSkillOffer,
  skillIdGetter,
  updateSkillOffer,
} from "../controllers/skillOffer.controller";
import { getSkillById } from "../services/Skill.service";
import { auth } from "../middleware/token";

const router = Router();
/**
 * @swagger
 * /api/v1/skillOffers/createSkillOffer:
 *   post:
 *     summary: Create a new skill offer
 *     tags: [Skill Offers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wantSkill
 *               - description
 *               - status
 *               - level
 *               - section
 *             properties:
 *               wantSkill:
 *                 type: string
 *                 example: "React"
 *               description:
 *                 type: string
 *                 example: "Looking to learn React from an experienced mentor"
 *               status:
 *                 type: string
 *                 enum: [OPEN, CLOSED]
 *                 example: OPEN
 *               level:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 example: Beginner
 *               section:
 *                 type: string
 *                 enum: [DEVELOPMENT, ART_DESIGN, BUSINESS, MARKETING, OTHER]
 *                 example: DEVELOPMENT
 *     responses:
 *       201:
 *         description: Skill offer created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.post("/createSkillOffer", auth, createSkillOffer);
/**
 * @swagger
 * /api/v1/skillOffers/updateSkillOffer/{skillOfferId}:
 *   put:
 *     summary: Update an existing skill offer
 *     tags: [Skill Offers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillOfferId
 *         required: true
 *         description: Skill offer ID
 *         schema:
 *           type: string
 *           example: 65af123abc456def789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wantSkill:
 *                 type: string
 *                 example: "Next.js"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               status:
 *                 type: string
 *                 enum: [OPEN, CLOSED]
 *                 example: CLOSED
 *     responses:
 *       200:
 *         description: Skill offer updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Skill offer not found
 */

router.put("/updateSkillOffer/:skillOfferId", auth, updateSkillOffer);
/**
 * @swagger
 * /api/v1/skillOffers/getSkillOffer/{skillOfferId}:
 *   get:
 *     summary: Get a skill offer by ID
 *     tags: [Skill Offers]
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         description: Skill offer ID
 *         schema:
 *           type: string
 *           example: 65af123abc456def789
 *     responses:
 *       200:
 *         description: Skill offer fetched successfully
 *       400:
 *         description: Skill ID missing
 *       404:
 *         description: Skill offer not found
 */

router.get("/getSkillOffer/:skillOfferId", skillIdGetter);
/**
 * @swagger
 * /api/v1/skillOffers/getAllSkillOffers:
 *   get:
 *     summary: Get all skill offers
 *     tags: [Skill Offers]
 *     responses:
 *       200:
 *         description: Skill offers fetched successfully
 *       500:
 *         description: Server error
 */

router.get("/getAllSkillOffers", getAllSkillOffers);
/**
 * @swagger
 * /api/v1/skillOffers/removeSkillOffer/{skillOfferId}:
 *   delete:
 *     summary: Remove a skill offer
 *     tags: [Skill Offers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillOfferId
 *         required: true
 *         description: Skill offer ID
 *         schema:
 *           type: string
 *           example: 65af123abc456def789
 *     responses:
 *       200:
 *         description: Skill offer removed successfully
 *       400:
 *         description: Skill offer ID missing
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Skill offer not found
 */

router.delete("/removeSkillOffer/:skillOfferId", removeSkillOffer);
/**
 * @swagger
 * /api/v1/skillOffers/getSkillOffersBySection:
 *   get:
 *     summary: Get skill offers filtered by section
 *     tags: [Skill Offers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: section
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Development, Art & Design, Business, Marketing, Other]
 *         description: The section to filter skill offers by
 *         example: Development
 *     responses:
 *       200:
 *         description: Skill offers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Skill offers retrieved successfully"
 *                 skillOffers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       wantSkill:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       level:
 *                         type: string
 *                       section:
 *                         type: string
 *                       userId:
 *                         type: object
 *       400:
 *         description: Invalid section parameter
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No skill offers found for this section
 *       500:
 *         description: Server error
 */
router.get("/getSkillOffersBySection", filterSkillOffersBySection);
export default router;
