const minionsRouter = require('express').Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
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
    if (newMinion) {
        res.status(201).send(newMinion);
    }
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
    
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const minionId = req.params.minionId;
    const minionWorks = getAllFromDatabase('work').filter((work) => (work.minionId == minionId));

    res.send(minionWorks);

});

const workBelongsToMinion = (req, res, next) => {
    if (req.body.minionId && req.body.minionId !== req.params.minionId){
        res.status(400).send('This work does not belong to this minion');
    }
    else{
        next();
    }
}

minionsRouter.put('/:minionId/work/:workId', workBelongsToMinion, (req, res, next) => {
    let updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
});


minionsRouter.post('/:minionId/work', (req, res, next) => {

    res.status(201).send(addToDatabase('work', req.body));
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted){
        res.status(204).send();
    }
})