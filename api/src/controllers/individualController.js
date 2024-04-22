import { ObjectId } from 'mongodb';
import  mongoModels  from '../utils/mongoConnection.js';
import axios from 'axios';

const postPartidas = async (req, res) =>{
    try {
        const {id, partidas} = req.body;
        const { collection } = await mongoModels.mongoKdaResults();
    
        const bulkUpdateOperations = [];
    
        const existingJogador = await collection.findOne({ id });
    
        for (const partida of partidas) {
            const partidaExists = existingJogador.partidas.some(existingPartida => existingPartida.matchId === partida.matchId);
    
            if (!partidaExists) {
              existingJogador.partidas.push(partida);
            }
          }
          bulkUpdateOperations.push({
            updateOne: {
              filter: { id },
              update: { $set: { partidas: existingJogador.partidas } }
            }
          });
    
          if (bulkUpdateOperations.length > 0) {
            await collection.bulkWrite(bulkUpdateOperations);
            console.log('Dados inseridos com sucesso');
          }
          res.status(200).json({ success: true });
    } catch (error) {
        console.log("ERRO", error)
        res.status(500).json({Error: "Erro ao inserir dados", error})
    }

}

const getPartidas = async (req, res) => {
    try {
        const matchDetails = req.userMatch;

        res.status(200).json(matchDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar detalhes da partida' });
    }
};

const postElo = async (req, res) => {
    try {
      const { id } = req.params;
      const  {tier, rank}  = req.body;
      const { collection } = await mongoModels.mongoResults(); 

      await collection.updateOne(
        { _id: new ObjectId(id) }, 
        { $set: { elo: tier, rank: rank} } 
      );

      res.status(200).json({ message: "Elo atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
};

const getInfoIndividual = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await axios.get(`https://tbf-backend-api.onrender.com/individual/detalhes-partidas/buscar/${id}`);
    const data = response.data;
    const dataPuuid = data.puuid;

    const idSummonerResponse = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${dataPuuid}?api_key=RGAPI-dd50a939-9d75-423f-8bfc-e1b1028200d9`);
    
      if (idSummonerResponse && idSummonerResponse.data) {
        const idSummonerData = idSummonerResponse.data.id;

        const eloSummonerResponse = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${idSummonerData}?api_key=RGAPI-dd50a939-9d75-423f-8bfc-e1b1028200d9`);
        if (eloSummonerResponse && eloSummonerResponse.data && eloSummonerResponse.data.length > 0) {
          const eloSummonerData = eloSummonerResponse.data[0];

          await axios.put(`http://localhost:5505/individual/detalhes-partidas/atualizaElo/${id}`, eloSummonerData);
          
        } else {
          console.log("A resposta da chamada de API de elo do summoner está vazia ou não definida.");
        }
      } else {
        console.log("A resposta da chamada de API de summoner está vazia ou não definida.");
      }


    const segundaResponse = await axios.post('https://tbf-backend-api.onrender.com/individual/detalhes-partidas/criar', data);
    const segundaData = segundaResponse.data

    res.json( segundaData );
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar a solicitação para criar informações.', error: error.message });
  }
};


export default {
  getInfoIndividual,
    getPartidas,
    postPartidas,
    postElo
};
