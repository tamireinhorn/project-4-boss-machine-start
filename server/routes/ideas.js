const ideasRouter = require('express').Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('../db');

module.exports = ideasRouter;

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
})

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    let idea = getFromDatabaseById('ideas', ideaId);
    if (idea){
        req.idea = idea;
        next();
    }
    else {
        res.status(404).send('Idea not found');
    }
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.post('/', (req, res, next) => {
    let idea = addToDatabase('ideas', req.body);
    if (idea) {
        res.status(201).send(idea);
    }
    
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    let idea = updateInstanceInDatabase('ideas', req.body);
    res.send(idea);
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    let idea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (idea) {
        res.status(204).send('Idea deleted!');

    }
    else{
        res.status(404).send('Idea not found');
    }
})