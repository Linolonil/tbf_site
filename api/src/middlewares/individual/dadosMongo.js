import mongoModels from '../../utils/mongoConnection.js';
import { ObjectId } from 'mongodb';

const buscarItensMongoDB = async (req, res, next) => {
    try {
        const { collection } = await mongoModels.mongoResults();
        
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: 'ID não fornecido na requisição' });
        }

        const jogador = await collection.findOne({_id: new ObjectId(id)});
        
        if (!jogador) {
            return res.status(404).json({ error: 'Jogador não encontrado' });
        }

        const result = {
            id,
            gameName: jogador.gameName,
            tagLine: jogador.tagLine
        };

        req.jogador = result;
    } catch (error) {
        console.error('Erro ao buscar contas Riot:', error);
        return res.status(500).json({ error: 'Erro ao buscar contas Riot' });
    }
    next();
};

export default buscarItensMongoDB;
