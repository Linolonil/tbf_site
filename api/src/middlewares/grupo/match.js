import axios from 'axios';
const API_KEY = process.env.API_KEY;

const encontrarMatchIdMiddleware = async (req, res, next) => {
  try {
    console.log("encontrando id das partidas...")
    const { riotIds } = req;
    const matchDetails = [];

    for (const {id, puuid, nickName } of riotIds) {
      const apiUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=3&api_key=${API_KEY}`; 

      const response = await axios.get(apiUrl);
      const firstMatchId= response.data;

      matchDetails.push({ id, nickName, puuid, firstMatchId});
    }
    console.log("id das partidas encontradas!");

    req.matchDetails = matchDetails;

    next();
  } catch (error) {
    console.error('Erro ao obter detalhes da partida:');
    res.status(500).json({ error: 'Erro ao obter detalhes da partida' });
  }
};

export default encontrarMatchIdMiddleware;