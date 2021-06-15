const express = require("express");
const physicianRouter = express.Router();
const physicianController = require("../controllers/physicianController");

physicianRouter.post("/newPhysician", physicianController.newPhysician);

physicianRouter.get("/listAllPhysician", physicianController.listAllPhysician);

physicianRouter.put("/updatePhysician", physicianController.updatePhysician);

physicianRouter.delete("/deletePhysician/:id", physicianController.deletePhysician);

module.exports = physicianRouter;
