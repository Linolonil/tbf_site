import mongoModel from '../utils/mongoConnection.js'

const buscarInfoCriminosos = async(req, res) =>{
    try {
        const {collection} = await mongoModel.mongoResults();

        const itens = await(collection.find().toArray());

        const result = itens.map(item => ({
            id: item._id,
            nome: item.nome,
            funcao: item.funcao,
            gameName: item.gameName,
            tagLine: item.tagLine,
            champion: item.champion,
            image: item.imagem,
        }))

        res.json(result)
    } catch (error) {
        console.log(error)
    }

}
const buscarInfoKda = async (req, res) => {
    try {
        const { collection } = await mongoModel.mongoKdaResults();
        let result;

        if (req.params.id) {
            const item = await collection.findOne({ id: req.params.id });
            if (Array.isArray(item.partidas)) {
                result = {
                    id: item.id,
                    nickName: item.nickName,
                    gameName: item.gameName,
                    puuid: item.puuid,
                    partidas: item.partidas.map(partida => ({
                        matchId: partida.matchId,
                        gameStartTime: partida.gameStartTime,
                        kda: partida.kda
                    }))
                };
            } else {
                result = {
                    id: item.id,
                    nickName: item.nickName,
                    gameName: item.gameName,
                    puuid: item.puuid,
                    partidas: [] 
                };
            }
        } else {
            const itens = await collection.find().toArray();
            result = itens.map(item => ({
                id: item.id,
                nickName: item.nickName,
                gameName: item.gameName,
                puuid: item.puuid,
                partidas: Array.isArray(item.partidas) ? item.partidas.map(partida => ({
                    matchId: partida.matchId,
                    gameStartTime: partida.gameStartTime,
                    kda: partida.kda
                })) : [] 
            }));
        }

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar informações KDA.' });
    }
};



export default {
    buscarInfoCriminosos,
    buscarInfoKda
}