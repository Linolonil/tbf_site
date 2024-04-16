const mongoose = require('mongoose');

const partidaSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true
  },
  gameStartTime: {
    type: Date,
    required: true
  },
  kda: {
    kills: {
      type: Number,
      required: true
    },
    deaths: {
      type: Number,
      required: true
    },
    assists: {
      type: Number,
      required: true
    }
  }
});

const jogadorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  nickName: {
    type: String,
    required: true
  },
  puuid: {
    type: String,
    required: true
  },
  partidas: [partidaSchema] 
});

const Jogador = mongoose.model('Jogador', jogadorSchema);

module.exports = Jogador;
