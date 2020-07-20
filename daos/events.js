const Events = require('../models/events');

module.exports = {};
  
// module.exports.create = async (id,data) => {
//   //return await Events.create({ date });
//   //return await Events.findAndModify({query:{id: id },update:{$set:{date:data}},upsert:true})

// };

module.exports.create = async (name,date,calendar)=> {
  return await Events.create({name,date});
};

module.exports.getById = async (id,calendar) => {
  try {
    const event = await Events.findOne({ _id: id }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.getAll = async (calendar) => {
  try {
    let event1 = await Events.find();
    return event1;
  } catch (e) {
    return null;
  }
};


//delete method 
module.exports.deleteById = async (id,calendar) => {
  await Events.remove({ _id: id });
 
};


//update method 
module.exports.updateById = async (id,event,calendar) => {
 return await Events.update({ _id: id},event);

};