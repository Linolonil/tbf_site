import axios from 'axios';
const API_KEY = process.env.API_KEY;

const encontrarMatchIdMiddleware = async (req, res, next) => {
  try {
    const {id, puuid, nickName} = req.riotId[0];
    const matchDetails = [];

    const apiUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=10&api_key=${API_KEY}`;
    
    const response = await axios.get(apiUrl);
    const matchsId = response.data;

    matchDetails.push({id, nickName, puuid, matchsId})
    req.matchDetails = matchDetails

  } catch (error) {
    console.log(error)
  }

  next()
};

export default encontrarMatchIdMiddleware;