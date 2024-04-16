import express from 'express';
const router = express.Router();

import buscarItens from '../middlewares/grupo/itens.js';
import buscarPuuid from '../middlewares/grupo/puuid.js';
import buscarMatchId from '../middlewares/grupo/match.js';
import buscarKDA from '../middlewares/grupo/kda.js';

import grupoController from '../controllers/grupoController.js';

router.get("/detalhes-partidas/buscar",buscarItens, buscarPuuid, buscarMatchId, buscarKDA , grupoController.getPartidas);

router.post("/detalhes-partidas/criar", grupoController.postPartidas);

export default router;