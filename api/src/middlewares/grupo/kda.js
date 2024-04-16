import axios from 'axios';

const API_KEY = process.env.API_KEY;

const KDA = async (req, res) => {
  try {
    console.log("Buscando KDA de cada jogador...");
    const matchDetails = req.matchDetails;

    const userMatches = [];

    for (const match of matchDetails) {
      const { id, nickName, puuid, firstMatchId } = match;

      const matchDetailsResponse = [];

      for (const matchId of firstMatchId) {
        const apiUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;

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
            matchId,
            gameStartTime: new Date(response.data.info.gameStartTimestamp),
            kda: {
              kills: kda.kills,
              deaths: kda.deaths,
              assists: kda.assists
            }
          };

          matchDetailsResponse.push(partida);
        } else {
          console.error(`Erro ao obter detalhes da partida ${matchId}: ${response.statusText}`);
        }
      }

      const userMatch = {
        id,
        nickName,
        puuid,
        partidas: matchDetailsResponse
      };

      userMatches.push(userMatch);
    }

    console.log("KDA de cada jogador encontrado!");
    res.json(userMatches);
  } catch (error) {
    console.error('Erro ao obter detalhes das partidas:', error);
    res.status(500).json({ error: 'Erro ao obter detalhes das partidas' });
  }
}

export default KDA;
