import express from 'express';
const router = express.Router();

import buscarItens from '../middlewares/individual/dadosMongo.js'
import puuidIndividual from '../middlewares/individual/puuidIndividual.js'
import buscarPartida from '../middlewares/individual/matchIndividual.js'
import kdaindividual from '../middlewares/individual/kdaindividual.js'
import individualController from '../controllers/individualController.js'

router.get("/detalhes-partidas/buscar/:id", buscarItens, puuidIndividual, buscarPartida, kdaindividual, individualController.getPartidas)

router.get("/detalhes-partidas/individual/:id", individualController.getInfoIndividual);


router.post("/detalhes-partidas/criar", individualController.postPartidas)

export default router;