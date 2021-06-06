const axios = require("axios");
const LEAGUE_ID = 271;
const STAGE_ID = 18334;
const DButils = require("./DButils");

async function getLeagueDetails() {
  try{
  const league = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/leagues/${LEAGUE_ID}`,
    {
      params: {
        include: "season",
        api_token: process.env.api_token,
      },
    }
  );
  const stage = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/stages/season/${STAGE_ID}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );
  return {
    league_name: league.data.data.name,
    current_season_name: league.data.data.season.data.name,
    current_stage_name: stage.data.data[3].name,
    // next game details should come from DB
  };
}
catch (error) {
  return null
}
}


async function getReferees() {

  const referes = await DButils.execQuery(
    ` SELECT * FROM [dbo].[Referees] ;`);
  const referesArr=[];
  referes.forEach(element => {
    referesArr.push(element.refName)
  });
  return referesArr;
}

async function getStadiums() {

  const stadiums = await DButils.execQuery(
    ` SELECT * FROM [dbo].[Venue] ;`);
  const stadiumsArr = [];
  stadiums.forEach(element => {
    stadiumsArr.push(element.name)
  });
  return stadiumsArr;
}


async function getStages() {

  const stadiums = await DButils.execQuery(
    ` SELECT * FROM [dbo].[Stages];`);
  const stadiumsArr = [];
  stadiums.forEach(element => {
    stadiumsArr.push(element.stageName)
  });
  return stadiumsArr;
}


exports.getReferees = getReferees;
exports.getStages = getStages;
exports.getStadiums = getStadiums;
exports.getLeagueDetails = getLeagueDetails;
