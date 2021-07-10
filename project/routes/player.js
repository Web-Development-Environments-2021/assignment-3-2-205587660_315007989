var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");



router.get("/playerFullDetails/:playerid", async (req, res, next) => {
    try {
      if (!isNormalInteger(req.params.playerid)){
        throw { status: 406, message: "Not valid id" };

      }
      const player_details = await players_utils.getPlayerDetail(req.params.playerid);
      console.log(player_details)
      if (!player_details){
        throw { status: 406, message: "There is no player with this id" };
      }
      res.send(player_details);
      next();
    } catch (error) {
      next(error);  
    }
  });
  

router.get("/SearchPlayerByName/:playername", async (req, res, next) => {
    try {
      const player_details = await players_utils.SearchPlayerByName(req.params.playername);
      req.session.search={[req.params.playername]:player_details};

      res.send(player_details);
    } catch (error) {
      next(error);  
    }
  });
 

router.get("/SearchPlayerByName/:playername/filterbyTeam/:teamName", async (req, res, next) => {
  try {
    const player_details = await players_utils.SearchPlayerByName(req.params.playername);
    const filterd_player_details = await players_utils.filterPlayerbyTeamName(player_details, req.params.teamName);
    req.session.search={[req.params.playername]:[filterd_player_details,[req.params.teamName]]};

    res.send(filterd_player_details);
  } catch (error) {
    next(error);
  }
});

router.get("/SearchPlayerByName/:playername/filterbyPosition/:position", async (req, res, next) => {
  try {
    const pos = parseInt(req.params.position);
    const player_details = await players_utils.SearchPlayerByName(req.params.playername);
    const filterd_player_details = await players_utils.filterPlayerbyPosition(player_details, pos);
    req.session.search={[req.params.playername]:[filterd_player_details,[req.params.position]]};

    res.send(filterd_player_details);
  } catch (error) {
    next(error);
  }
});



module.exports = router;

function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}