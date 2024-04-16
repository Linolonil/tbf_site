import axios from 'axios';

const API_KEY = process.env.API_KEY;

const KDA = async (req, res, next) => {
    try {
        const { id, nickName, puuid, matchsId } = req.matchDetails[0];
        
        const userMatches = [];
        
        await Promise.all(matchsId.map(async (item) => {
          const apiUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/${item}?api_key=${API_KEY}`;
          
            
            const response = await axios.get(apiUrl);

            if (response.status === 200) {
                const participants = response.data.info.participants.map(participant => ({
                  puuid: participant.puuid,
                  kills: participant.kills,
                  deaths: participant.deaths,
                  assists: participant.assists
                }));
      
                const kda = participants.find(participant => participant.puuid === puuid);
      
                const partida = {
                  matchId:item,
                  gameStartTime: new Date(response.data.info.gameStartTimestamp),
                  kda: {
                    kills: kda.kills,
                    deaths: kda.deaths,
                    assists: kda.assists
                  }
                };
      
                userMatches.push(partida);
              } else {
                console.error(`Erro ao obter detalhes da partida ${matchId}: ${response.statusText}`);
              }
              }));

        const userMatch = {
            id,
            nickName,
            puuid,
            partidas: userMatches
        }

        req.userMatch = userMatch

                
    } catch (error) {
        console.log(error);
    }
    next();
};

export default KDA;
