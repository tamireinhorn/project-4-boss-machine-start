

// - `/api/minions`

// - PUT /api/minions/:minionId to update a single minion by id.
// - DELETE /api/minions/:minionId to delete a single minion by id.
const minionsRouter = require('express').Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('../db');
module.exports = minionsRouter;


minionsRouter.param('minionId', (req, res, next, minionId) => {
    // The idea here is to simplify this by doing one consultation to the db:
    const minion = getFromDatabaseById('minions', minionId);
    if (minion) {
        req.minion = minion;
        next();
    }
    else {
        res.status(404).send('Minion not found!');
    }
    
})

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
})

minionsRouter.post('/', (req, res, next) => {
    let newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
})

minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    let deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send('Minion deleted!');
    }
    else{
        res.status(404).send('Not found!');
    }
    
})