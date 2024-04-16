import express from 'express';
import dotenv from 'dotenv';
import  helmet from 'helmet';
import  cors from "cors";

const  app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
dotenv.config();

import  rotaDeKdaGrupo  from "./router/routesGrupo.js" 
import  rotaDeKdaIndividual  from "./router/routesIndividual.js"
import  rotaDadosMongo from "./router/routesDadosMongo.js"

const PORT = process.env.PORT



app.use("/grupo", rotaDeKdaGrupo);
app.use("/dados", rotaDadosMongo);
app.use("/individual", rotaDeKdaIndividual);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


