const checkMillionDollarIdea = (req, res, next) => {
    const {numWeeks, weeklyRevenue} = req.body
    const ideaValue = Number(numWeeks) * Number(weeklyRevenue);
    if (!weeklyRevenue || !numWeeks || isNaN(ideaValue) || ideaValue < 1000000){
        res.status(400).send('Idea not worth a million dollars!');

    }
    else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
