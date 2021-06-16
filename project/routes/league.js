var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");

router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    if (!league_details){
      throw { status: 400, message: "There is no current league taking place" };
    }
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

router.get("/Referees", async (req, res, next) => {
  try {
    const ref_details = await league_utils.getReferees();
    res.send(ref_details);
  } catch (error) {
    next(error);
  }
});

router.get("/Stadiums", async (req, res, next) => {
  try {
    const Stadiums_details = await league_utils.getStadiums();
    res.send(Stadiums_details);
  } catch (error) {
    next(error);
  }
});

router.get("/Teams", async (req, res, next) => {
  try {
    const teams_details = await league_utils.getTeams();
    res.send(teams_details);
  } catch (error) {
    next(error);
  }
});

router.get("/Stages", async (req, res, next) => {
  try {
    const ref_details = await league_utils.getStages();
    res.send(ref_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
