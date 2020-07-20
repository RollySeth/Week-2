const { Router } = require("express");
const router = Router({mergeParams: true});

//router.use("calendars/:id/events","/");
const EventDAO = require('../daos/events');
const CalendarDAO = require('../daos/calendars');
const calendars = require("../models/calendars");

//create
// 5f14e0cd18ab725d9ccb218e 
router.post("/", async (req, res, next) => {
  const dataId= req.params.id;
  const {name,date} = req.body;
  if (!name) {
    res.status(400).send('body parameter "name"  is required"');
  } else if(!date){
    res.status(400).send('body parameter "date"  is required"');
 
  }
  else {
    try{
    const calendar = await CalendarDAO.getById(dataId);
    const event = await EventDAO.create(name,date, calendar);
    res.json(event);
    }
    catch(e)
    {
      res.status(500).send(e.message);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  const calendar = await CalendarDAO.getById(req.calendarId);
  const event = await EventDAO.getById(req.params.id,calendar);
  if (event) {
    res.json(event);
  } else {
    res.sendStatus(404);
  }
});

//Read Array of calendars
router.get("/", async (req, res, next) => {
  const calendar = await CalendarDAO.getById(req.calendarId);
  const event1 = await EventDAO.getAll(); 
  //('5f14a60db608633b6c628e24');
  if (event1) {
    res.json(event1);
  } else {
    res.sendStatus(404);
    //res.send('hello error');
  } 
});

// Update
router.put("/:id", async (req, res, next) => {
  const calendar = await CalendarDAO.getById(req.calendarId);
  const eventId = req.params.id;
  const event = req.body;
  if (!event || JSON.stringify(event) === '{}' ) {
    res.status(400).send('event is required');
  } else {
    //update widget here
    const updatedEvent =await EventDAO.updateById(eventId,event,calendar);
    res.json(updatedEvent);
  }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  const calendar = await CalendarDAO.getById(req.calendarId);
  const eventId = req.params.id;
  // delete widget here
  try{
    await EventDAO.deleteById(eventId,calendar);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;