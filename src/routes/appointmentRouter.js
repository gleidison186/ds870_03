const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

appointmentRouter.get(
  "/searchAppointmentByPatientId/:patientId",
  appointmentController.searchAppointmentByPatientId
);

appointmentRouter.get(
  "/searchAppointmentByPhysicianId/:physicianId",
  appointmentController.searchAppointmentByPhysicianId
);

appointmentRouter.post("/newAppointment", appointmentController.newAppointment);
appointmentRouter.delete(
  "/deleteAppointment/:appointmentId",
  appointmentController.deleteAppointment
);

module.exports = appointmentRouter;
