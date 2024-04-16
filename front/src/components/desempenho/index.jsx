// DesempenhoLol.jsx

import { useState, useEffect } from 'react';
import style from './desempenhoLol.module.css';

export default function DesempenhoLol() {
  const [matchDetails, setMatchDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalKills, setTotalKills] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalAssists, setTotalAssists] = useState(0);
  const [totalPartidas, setTotalPartidas] = useState(0);
  const apiBuscaInfoKda = import.meta.env.VITE_API_INFO_KDA
  useEffect(() => {
    const fetchData = async () => {
      try {
        
          const response = await fetch(apiBuscaInfoKda);
          
          if (!response.ok) {
            throw new Error('Erro ao consultar a API');
          }
          const data = await response.json();
          setMatchDetails(data);
          setIsLoading(false);
          
        } catch (error) {
          console.error('Erro ao buscar informações:', error);
          setIsLoading(false);
        }
      };
    
      fetchData();
    }, []); 

    const mapearMatch = (matchDetails) => {
      let totalKills = 0;
      let totalDeaths = 0;
      let totalAssists = 0;
      let totalPartidas = 0;

      matchDetails.map((player) => {
         totalPartidas += player.partidas.length || 0;
        player.partidas.map((kda)=>{
          totalKills += kda.kda.kills || 0;
          totalDeaths += kda.kda.deaths || 0;
          totalAssists += kda.kda.assists || 0;
        })
      });

      
    setTotalKills(totalKills);
    setTotalDeaths(totalDeaths);
    setTotalAssists(totalAssists);
    setTotalPartidas(totalPartidas);

  };
  

    useEffect(()=>{
      mapearMatch(matchDetails)
    }, [matchDetails])

  return (
    <section id='desempenho' className={`text-center bg-black md:pt-10 sm:pt-10 lg:pt-1 h-[100vh] flex justify-center items-center flex-col `}>

<h2 className="w-full h=[20%] font-MyVikingFont font-semibold uppercase  first-letter:text-red-500 text-5xl lg:text-4xl md:text-6xl md:font-bold md:mt-10 md:text-center text-white ">desempenho</h2>

      <div className='h-[80%] flex justify-around items-center w-full lg:flex-row flex-col  md:flex-col sm:flex-col'>
      {isLoading ? (
        <div className={style.loading}>Carregando...</div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 w-24 h-24 flex items-center justify-center rounded-full mb-2">
            <p className="text-white text-2xl">{totalKills}</p>
          </div>
          <p className="text-white">Total de Kills</p>
        </div>
      )}
      {isLoading ? (
        <div className={style.loading}>Carregando...</div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-red-500 w-24 h-24 flex items-center justify-center rounded-full mb-2">
            <p className="text-white text-2xl">{totalDeaths}</p>
          </div>
          <p className="text-white">Total de Deaths</p>
        </div>
      )}
      {isLoading ? (
        <div className={style.loading}>Carregando...</div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-green-500 w-24 h-24 flex items-center justify-center rounded-full mb-2">
            <p className="text-white text-2xl">{totalAssists}</p>
          </div>
          <p className="text-white">Total de Assists</p>
        </div>
      )}
      {isLoading ? (
        <div className={style.loading}>Carregando...</div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-violet-500 w-24 h-24 flex items-center justify-center rounded-full mb-2">
            <p className="text-white text-2xl">{totalPartidas}</p>
          </div>
          <p className="text-white">Total de Partidas</p>
        </div>
      )}
      </div>

    </section>
  );
}
