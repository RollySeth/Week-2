const { Router } = require("express");
const router = Router({mergeParams:true});
//const router1 = Router({mergeParams:true});

router.use("/calendars", require('./calendars'));
 router.use("/calendars/:calendarId", require('./events'));
//router.use("/calendars/:id/events",require("./calendars/events"));
module.exports = router;