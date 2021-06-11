const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";

async function getTeamDetailsbyID(TEAM_ID) {
  try {
    const team = await axios.get(
      `https://soccer.sportmonks.com/api/v2.0/teams/${TEAM_ID}`,
      {
        params: {
          include: "coach,trophies,league",
          api_token: process.env.api_token,
        },
      }
    );
    
    if (team.data.data.league) {
      if (team.data.data.league.data.id === 271) {
        return {
          team_id: TEAM_ID,
          team_name: team.data.data.name,
          logo_path: team.data.data.logo_path,
          coach_id: team.data.data.coach.data.coach_id,
          coach_name: team.data.data.coach.data.fullname,
          trophies: team.data.data.trophies.data,
        }

        // next game details should come from DB
      };
    }
  } catch (error) {
    return null;
  }
}

async function getTeamDetailsbyName(TEAM_Name) {
  const teams = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/teams/search/${TEAM_Name}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );
  const Team_Info = [];
  teams.data.data.forEach((element) => {
    var obj = {
      team_id: element.id,
      team_name: element.name,
      logo_path: element.logo_path,
    }
    Team_Info.push(obj)
  })

  return Team_Info;
}

async function getTeam(teams_ids_list) {
  let promises = [];
  teams_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/teams/${id}`, {
        params: {
          include: "coach, trophies,league",
          api_token: process.env.api_token,
        },
      })
    )
  );
  let team_info = await Promise.all(promises);
  return extractRelevantData(team_info, true);
}



function extractRelevantData(teams_info, isPromise) {
  const team_arr = [];
  teams_info.forEach((element) => {
    var obj = {
      team_name: element.data.data.name,
      team_id: element.data.data.id,
      logo_path: element.data.data.logo_path,
      coach_id: element.data.data.coach.data.coach_id,
      coach_name: element.data.data.coach.data.fullname,
      trophies: element.data.data.trophies.data,
    }
    team_arr.push(obj);
  })
  return team_arr;
}



exports.getTeamDetailsbyID = getTeamDetailsbyID;
exports.getTeamDetailsbyName = getTeamDetailsbyName;
exports.getTeamDetailsbyName = getTeamDetailsbyName;
exports.getTeam = getTeam;
