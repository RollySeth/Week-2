  
const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');
const EventDAO = require('../daos/events');

describe("/calendars/:calendarId/events", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);
  afterEach(testUtils.clearDB)



  describe("GET /:id", () => {

    describe("GET (no matching result if incorrect id is given) /:id", () => {
        let calendarEvent1;
        // beforeEach(async () => {
        //     calendarEvent1 = (await request(server).post("/calendars").send({name: 'calendar1'})).body;
        
        // });
        // afterEach(async () =>{
        //     const res= await request(server).delete("/calendars/" + calendarEvent1._id);
        //     expect(res.statusCode).toEqual(200);
        // });

      it("should return 404 if no matching id", async () => {
        const res = await request(server).get("${calendarBase}/events/id1");
        expect(res.statusCode).toEqual(404);
       });
    });

  describe('POST /', () => {
    it('should return a 400 without a provided name', async () => {
      const res = await request(server).post("/calendars/:id/events/").send({});
      expect(res.statusCode).toEqual(400);    
    });
  });
}); 
  describe('GET /:id after multiple POST /', () => {
    let event1, event2;

    beforeEach(async () => {
      event1 = (await request(server).post("/calendars/:id/events/").send({ date: '20121222' })).body;
    event2 = (await request(server).post("/calendars/:id/events/").send({ date: '20132245' })).body;
    });

    it('should return calendar1 using its id', async () => {
      const res = await request(server).get("/calendars/:id/events/" + event1._id);
      expect(res.statusCode).toEqual(200);    
      const storedEvent = res.body;
      expect(storedEvent).toMatchObject({ 
        name: 'event1', 
        _id: event1._id 
      });
    });

    it('should return calendar2 using its id', async () => {
      const res = await request(server).get("/calendars/:id/events/" + event2._id);
      expect(res.statusCode).toEqual(200);    
      const storedEvent = res.body;
      expect(storedEvent).toMatchObject({ 
        name: 'event2', 
        _id: event2._id 
      });
    });
  });

  describe('GET / after multiple POST /', () => {
    let event1, event2;

    beforeEach(async () => {
      event1 = (await request(server).post("/calendars/:id/events/").send({ date: '2023332' })).body;
      event2 = (await request(server).post("/calendars/:id/events/").send({ date: '2300299' })).body;
    });

    it('should return all calendars', async () => {
      const res = await request(server).get("/calendars/:id/events/");
      expect(res.statusCode).toEqual(200);    
      const storedEvents = res.body;
      expect(storedEvents).toMatchObject([event1, event2]);
    });
  });

  describe('PUT /:id after POST /', () => {
    let event1;

    beforeEach(async () => {
      event1 = (await request(server).post("/calendars/:id/events/").send({ date: '20122990' })).body;
    });

    it('should store and return calendar1 with new name', async () => {
      const res = await request(server)
        .put(" name: 'new name, date:'new date' " + event1._id)
        .send({ name: 'new date', date: 'new date' });
      expect(res.statusCode).toEqual(200);    

      const storedEvent = (await request(server).get("/calendars/:id/events/" + event1._id)).body;
      expect(storedEvent).toMatchObject({ 
        name: 'new name', 
        date: 'new date', 
        _id: event1._id 
      });
    });
  });

  describe('DELETE /:id after POST /', () => {
    let event1;

    beforeEach(async () => {
      event1 = (await request(server).post("/calendars/:id/events/").send({ date: '2012882' })).body;
    });

    it('should delete and not return event1 on next GET', async () => {
      const res = await request(server).delete("/calendars/:id/events/" + event1._id);
      expect(res.statusCode).toEqual(200);    
      const storedEventResponse = (await request(server).get("/calendars/:id/events/" + event1._id));
      expect(storedEventResponse.status).toEqual(404);
    });
  });
});