import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from './elo.module.css'
import axios from "axios";

// eslint-disable-next-line react/prop-types
const EloData = ({ elo, rank }) => {

  const eloImageMap = {
    'BRONZE': 'Rank=Bronze.png',
    'DIAMOND': 'Rank=Diamond.png',
    'GOLD': 'Rank=Gold.png',
    'IRON': 'Rank=Iron.png',
    'PLATINUM': 'Rank=Platinum.png',
    'CHALLENGER': 'Rank=Challenger.png',
    'EMERALD': 'Rank=Emerald.png',
    'GRANDMASTER': 'Rank=Grandmaster.png',
    'MASTER': 'Rank=Master.png',
    'SILVER': 'Rank=Silver.png'
  };

  const eloNameMap = {
    'BRONZE': 'BRONZE',
    'DIAMOND': 'DIAMANTE',
    'GOLD': 'OURO',
    'IRON': 'FERRO',
    'PLATINUM': 'PLATINA',
    'CHALLENGER': 'DESAFIANTE',
    'EMERALD': 'ESMERALDA',
    'GRANDMASTER': 'GRÃ-MESTRE',
    'MASTER': 'MESTRE',
    'SILVER': 'PRATA'
  };
  
  const eloImage = eloImageMap[elo];
  const eloName = eloNameMap[elo];


  if (eloImage) {
    return (
      <div className="flex justify-evenly items-center  w-full h-full bg-transparent ">
        <img className={`${style.elo_img} `} src={`/elo/${eloImage}`} alt={elo} />
        <h2 className="text-black text-2xl font-extralight font-semibold">{eloName} {rank}</h2>
      </div>
    );
    
  } else {
    return null; 
  }
};
export default function InfoKdaIndividual({
  id,
  name,
  elo,
  openModal,
  fecharModal,
  rank
}) {
  const [playerInfo, setPlayerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (openModal && !dataLoaded) {
      setLoading(true);

      const fetchData = async () => {
        try {
          const lastAccessDate = localStorage.getItem(`lastAccessDate_${id}`);
          const today = new Date().toLocaleDateString();

          if (lastAccessDate !== today) {
            const apiUrlUpdate = import.meta.env.VITE_API_URL_UPDATE_ENV;

            await axios.get(`${apiUrlUpdate}${id}`);
            localStorage.setItem(`lastAccessDate_${id}`, today);
          }

          const apiUrlKda = import.meta.env.VITE_API_URL_KDA_ENV;

          const responseKda = await axios.get(`${apiUrlKda}${id}`);

          if (responseKda.data) {
            const sortedPartidas = responseKda.data.partidas.sort((a, b) => {
              const weightedKdaA = (a.kda.kills + a.kda.assists) / Math.max(a.kda.deaths, 1);
              const weightedKdaB = (b.kda.kills + b.kda.assists) / Math.max(b.kda.deaths, 1);
              return weightedKdaB - weightedKdaA;
            });

            setPlayerInfo({
              ...responseKda.data,
              partidas: sortedPartidas.slice(0, 10),
            });

            setDataLoaded(true);
          } else {
            console.error("Dados do jogador não encontrados");
          }
        } catch (error) {
          console.error("Erro ao buscar informações do jogador:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id, openModal, dataLoaded]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      {openModal && (
        <div className="absolute  inset-0 flex items-center justify-center bg-white  z-50 rounded-[20px] ">
              {loading && (
                <div className="absolute inset-0 bg-black flex items-center justify-center rounded-[20px] z-10 ">
                  <div className="loader">
                    <div className="loader_square bg-white"></div>
                    <div className="loader_square bg-white"></div>
                    <div className="loader_square bg-white"></div>
                    <div className="loader_square bg-white"></div>
                    <div className="loader_square bg-white"></div>
                    <div className="loader_square bg-white"></div>
                    <div className="loader_square bg-white"></div>
                  </div>
                </div>
              )}
              {playerInfo && !loading && (
                <div className="w-full h-full  flex  justify-center items-center flex-col rounded-[20px] pb-10">
                  <h2 className="text-xl font-bold mb-4 pt-4 text-black first-letter:text-red-700 font-MyVikingFont-title">{name}</h2>
                  <EloData  elo={elo} rank={rank}/>
                  <caption className="caption-top text-black">
                    Últimas 10 melhores partidas:
                  </caption>
                  <div className="relative overflow-auto p-2">
                    <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th  scope="col"></th>
                          <th className="px-6 py-3 text-center text-black  font-bold" scope="col">Data</th>
                          <th className="px-6 py-3 text-center  text-black font-bold" scope="col">
                            K/D/A
                          </th>
                          <th className="px-6 py-3 text-center  text-black font-bold" scope="col">
                            Média
                          </th>
                          <th  scope="col"></th>

                        </tr>
                      </thead>
                      <tbody>
                        {playerInfo.partidas.map((partida, index) => (
                          <tr className=" border-b  dark:border-gray-700"  key={index}>
                            <td className="px-4 py-4" scope="col">
                            </td>
                            <td className="px-6 py-4 text-center text-black font-semibold" scope="col">
                              {formatDate(partida.gameStartTime)}
                            </td>
                            <td className="px-6 py-4 text-center text-black font-semibold">
                              {partida.kda.kills}/{partida.kda.deaths}/
                              {partida.kda.assists}
                            </td>
                            <td className="px-6 py-4 text-center text-black font-semibold">
                              {(
                                (partida.kda.kills + partida.kda.assists) /
                                (partida.kda.deaths == 0
                                  ? 1
                                  : partida.kda.deaths)
                              ).toFixed(2)}
                            </td>
                            <td className="px-4 py-4" scope="col">
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            
            <button
              onClick={fecharModal}
              className="absolute w-[40px] h-[40px] text-center top-0 right-0 mt-4 mr-4 bg-red-700 text-white  hover:text-red-700 hover:bg-white border  rounded cursor-pointer transition duration-300">
            X
            </button>
        </div>
      )}
    </>
  );
}

EloData.PropTypes = {
  elo:PropTypes.string.isRequired
}

InfoKdaIndividual.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  elo: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
  openModal: PropTypes.bool.isRequired,
  fecharModal: PropTypes.func.isRequired,
};
