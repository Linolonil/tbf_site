import axios from 'axios';

const API_KEY = process.env.API_KEY;

const encontrarPuuidMiddleware = async (req, res, next) => {
 try {
    const { id, gameName, tagLine } = req.jogador; 

    const apiUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`
    
    const riotIdResponse = await axios.get(apiUrl);

    const puuid =riotIdResponse.data.puuid;
    const responseGameName = riotIdResponse.data.gameName;
    const riotId = [{id, nickName: responseGameName, puuid}]

    req.riotId = riotId


 } catch (error) {
    console.log(error);
 }
 
 next();
};

export default encontrarPuuidMiddleware;
