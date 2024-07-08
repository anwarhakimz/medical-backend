import express from "express";
import gmailController from "../controller/gmail-controller.js";

const gmailRouter = new express.Router();

gmailRouter.post("/send", gmailController.sendGmail);

export { gmailRouter };
