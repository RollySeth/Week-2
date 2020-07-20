const { Router } = require("express");
const router = Router();

const CalendarDAO = require('../daos/calendars');

//create
router.post("/", async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send('body parameter "name" is required"');
  } else {
    const calendar = await CalendarDAO.create(name);
    res.json(calendar);
  }
});

router.get("/:id", async (req, res, next) => {
  const calendar = await CalendarDAO.getById(req.params.id);
  if (calendar) {
    res.json(calendar);
  } else {
    res.sendStatus(404);
  }
});

//Read Array of calendars
router.get("/", async (req, res) => {
  const calendar1 = await CalendarDAO.getAll();
  if (calendar1) {
    res.json(calendar1);
  } else {
   res.sendStatus(404);
  } 
});

// Update
router.put("/:id", async (req, res, next) => {
  const calendarId = req.params.id;
  const calendarNew = req.body;
  if (!calendarNew || JSON.stringify(calendarNew) === '{}' ) {
    res.status(400).send('calendar is required"');
  } else {
    //update calendar here
    const updatedCalendar =await CalendarDAO.updateById(calendarId, calendarNew);
     res.json(updatedCalendar);
  }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  const calendarId = req.params.id;
  // delete calendar here
  try{
    await CalendarDAO.deleteById(calendarId);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;