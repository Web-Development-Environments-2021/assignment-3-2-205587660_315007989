const { request } = require("express");
var express = require("express");
var router = express.Router();
const coach_utils = require("./utils/coaches_utils");



router.get("/coachDetailById/:coachId", async (req, res, next) => {
  try {
    const coach = await coach_utils.getCoachById(req.params.coachId);
    res.send(coach);
  } catch (error) {
    next(error);
  }
});

router.get("/SearchCoachByName/:coachName", async (req, res, next) => {
  try {
    const coach = await coach_utils.SearchCoachByname(req.params.coachName);
    req.session.search={[req.params.coachName]:coach};
    res.send(coach);
  } catch (error) {
    next(error);
  }
});


router.get("/SearchCoachByName/:coach_name/filterbyTeam/:teamName", async (req, res, next) => {
  try {
    let tmp;
    let tmp1;
    const coachess = await coach_utils.SearchCoachByname(req.params.coach_name);
    const coach_details = await coach_utils.filterCoachbyTeamName(coachess, req.params.teamName);
    req.session.search={[req.params.coach_name]:[coach_details,[req.params.teamName]]};

    res.send(coach_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
