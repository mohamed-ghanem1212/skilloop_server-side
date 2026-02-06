import { Router } from "express";
import {
  createOfferRegister,
  getAllOfferRegisters,
} from "../services/offerRegistration.service";
import {
  createRegistration,
  getRegisterById,
  getUserProposals,
  updateRegister,
} from "../controllers/offerRegistration.controller";
import { auth } from "../middleware/token";

const router = Router();
/**
 * @swagger
 * /api/v1/offerRegisters/offerRegister/{offerId}:
 *   post:
 *     summary: Create a new registration (proposal) for an offer
 *     description: Allows an authenticated user to submit a proposal for a specific offer. The request must include a description of the proposal.
 *     tags:
 *       - Offer Registrations
 *     security:
 *       - bearerAuth: []   # assuming JWT auth
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the offer to register for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *                 description: Details of the user's proposal
 *                 example: "I am interested and can deliver this project within 2 weeks."
 *     responses:
 *       201:
 *         description: Proposal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "Your proposal has been sent please be in touch"
 *                 register:
 *                   type: object
 *                   description: The created registration object
 *       400:
 *         description: Missing required fields (offerId, providerId, or description)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "please fill the requirements"
 *       401:
 *         description: Unauthorized, user not authenticated
 */

router.post("/offerRegister/:offerId", auth, createRegistration);
/**
 * @swagger
 * /api/v1/offerRegisters/getOfferById/{registerId}:
 *   get:
 *     summary: Get an offer registration by ID
 *     tags: [Offer Registrations]
 *     parameters:
 *       - in: path
 *         name: registerId
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: string
 *           example: 65bf456abc789def123
 *     responses:
 *       200:
 *         description: Registration found
 *       400:
 *         description: Registration ID missing
 *       404:
 *         description: Registration not found
 */

router.get("/getOfferById/:registerId", auth, getRegisterById);
/**
 * @swagger
 * /api/v1/offerRegisters/getAllOfferRegisters:
 *   get:
 *     summary: Get all offer registrations
 *     tags: [Offer Registrations]
 *     responses:
 *       200:
 *         description: Registrations fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/getAllUserOfferRegistes", auth, getUserProposals);
/**
 * @swagger
 * /api/v1/offerRegisters/getAllUserOfferRegistes:
 *   get:
 *     summary: Get all proposals for the current user's offers
 *     description: Retrieve all proposals submitted by providers to the offers owned by the authenticated user (requester).
 *     tags:
 *       - Offer Registrations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all proposals sent to the user's offers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All proposals from different providers
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 getAllUsersProposals:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 63a12bcd4f5678
 *                       offerId:
 *                         type: object
 *                         description: Populated offer object
 *                       providerId:
 *                         type: object
 *                         description: Populated provider object
 *                       description:
 *                         type: string
 *                         example: I can complete this task in 3 days
 *                       status:
 *                         type: string
 *                         enum: [Pending, Accepted, Rejected]
 *                         example: Pending
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-01-29T10:00:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-01-29T10:00:00.000Z
 *       400:
 *         description: User not authenticated or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please Sign In
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.get("/getAllOfferRegisters", auth, getAllOfferRegisters);
/**
 * @swagger
 * /api/v1/offerRegisters/updateRegister/{registerId}:
 *   put:
 *     summary: Update offer registration status
 *     tags: [Offer Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: registerId
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: string
 *           example: 65bf456abc789def123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, ACCEPTED, REJECTED]
 *                 example: ACCEPTED
 *     responses:
 *       200:
 *         description: Registration updated successfully
 *       400:
 *         description: Missing data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Registration not found
 */

router.put("/updateRegister/:registerId", auth, updateRegister);
export default router;
