const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const league_id = "271";
const season_id=17328;




// const TEAM_ID = "85";

//coach id=16845924
//coach name= jens
async function getCoachById(id) {
  const coach = await axios.get(`${api_domain}/players/${id}`,
    {
      params: {
        include: "team.league",
        api_token: process.env.api_token,
      },
    }
  );
  if (coach.data.data.team && coach.data.data.team.data.league) {
    if (coach.data.data.team.data.league.data.id === 271 && coach.data.data.team.data.current_season_id==18334) {
      return {
        coach_id: id,
        name: coach.data.data.fullname,
        team_name: coach.data.data.team.data.name,
        team_id: coach.data.data.team_id,
        image: coach.data.data.image_path,
        nationality: coach.data.data.nationality,
        birth_date: coach.data.data.birthdate,
        birthcountry: coach.data.data.birthcountry,
      };

    }
  }
  return coach;
}

async function SearchCoachByname(name) {
  const coaches = await axios.get(`${api_domain}/teams/season/18334`,
  {
    params: {
      include: "coach",
      api_token: process.env.api_token,
    },
  }
  );
  return extractRelevantCoachData(name,coaches);
}



async function extractRelevantCoachData(name,coaches) {
  const coachArr = [];
  coaches.data.data.forEach((element) => {
    var coach_name=element.coach.data.fullname;
      if(coach_name && coach_name.toString().toLowerCase().includes(name.toString().toLowerCase())){ 
        //#TODO LOWERCASE NAME SEARCHES
         var obj = {
           coach_id: element.coach.data.coach_id,
          name:element.coach.data.fullname,
          team_name: element.name,
          image: element.coach.data.image_path,
        }
        coachArr.push(obj)
      }  
        });
  
    return coachArr;
      }

async function filterCoachbyTeamName(coachList, TeamName) {
  return coachList.filter(coach => coach.team_name.includes(TeamName));
}

exports.filterCoachbyTeamName = filterCoachbyTeamName;
exports.getCoachById = getCoachById;
exports.SearchCoachByname=SearchCoachByname;
