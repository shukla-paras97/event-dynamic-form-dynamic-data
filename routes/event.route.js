const express = require("express");
const router = express.Router();
const eventController= require("../controller/event.controller");

router.post("/addevent",eventController.createEvent)
router.post("/addeventdata",eventController.addEventData);
router.get("/geteventdata",eventController.getEventData);
router.get("/getevent",eventController.getEvent);

module.exports=router;