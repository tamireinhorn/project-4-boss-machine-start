const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('../db');
const meetingsRouter = require('express').Router();
module.exports = meetingsRouter;

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    let meeting = createMeeting(req.body);
    if (meeting){
        res.status(201).send(addToDatabase('meetings', meeting));
    }
});

