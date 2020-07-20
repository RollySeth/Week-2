const Calendars = require('../models/calendars');

module.exports = {};
  
module.exports.create = async (name) => {
  return await Calendars.create({ name });
};

module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.getAll = async () => {
  try {
    const calendarAll = await Calendars.find();
    return calendarAll;
  } catch (e) {
    return null;
  }
};


//delete method 
module.exports.deleteById = async (id) => {
  await Calendars.remove({ _id: id });
 
};


//update method 
module.exports.updateById = async (id,data) => {
  try {

   return await Calendars.update({ _id: id },data,{upsert:true});
  } catch (e) {
    return null; 
  }


};