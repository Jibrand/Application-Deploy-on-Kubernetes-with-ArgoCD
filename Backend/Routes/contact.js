import express from "express";
const router = express.Router();

import { addContact, getAllContacts, deleteContact, updateContact, getSingleContact } from "../Controller/contact.js";

router.post("/v1/contact", addContact);
router.get("/v1/contact", getAllContacts);
router.delete("/v1/contact/:id", deleteContact);
router.put("/v1/contact/:id", updateContact);
router.get("/v1/contact/:id", getSingleContact);

export default router;