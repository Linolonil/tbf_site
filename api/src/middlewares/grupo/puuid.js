import axios from 'axios';

const API_KEY = process.env.API_KEY;

const encontrarPuuidMiddleware = async (req, res, next) => {
  try {

    console.log("buscando puuid dos jogadores...")
    const { jogadores } = req;

    const riotIds = [];

    for (const jogador of jogadores) {
      try {
        const {id, gameName, tagLine } = jogador;
        const apiUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`;
        
        const riotIdResponse = await axios.get(apiUrl, {
          timeout: 5000
        });

        const puuid = riotIdResponse.data.puuid;
        const responseGameName = riotIdResponse.data.gameName;

        riotIds.push({ id, nickName: responseGameName, puuid });

      } catch (error) {
        console.error(`Erro ao obter o Riot ID para ${jogador.gameName} / ${jogador.tagLine}:`, error);
      }
    }

    console.log("puuid encontrado!")
    req.riotIds = riotIds;

    next();
  } catch (error) {
    console.error('Erro ao buscar conta Riot:', error);
    res.status(500).json({ error: 'Erro ao buscar conta Riot' });
  }
};

export default encontrarPuuidMiddleware