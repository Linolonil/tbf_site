import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function InfoKdaIndividual({
  id,
  name,
  openModal,
  fecharModal,
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
          console.log(responseKda.data)

          if (responseKda.data) {
            const sortedPartidas = responseKda.data.partidas.sort((a, b) => {
              const weightedKdaA =
                (a.kda.kills + a.kda.assists) / Math.max(a.kda.deaths, 1);
              const weightedKdaB =
                (b.kda.kills + b.kda.assists) / Math.max(b.kda.deaths, 1);
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
        <div className="absolute  inset-0 flex items-center justify-center bg-black  z-50 rounded-[20px] ">
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
                <div className="w-full h-full  flex  bg-gray-400 justify-center items-center flex-col rounded-[20px] pb-10">
                  <h2 className="text-xl font-bold mb-4 text-black">{name}</h2>
                  <caption className="caption-top text-black">
                    Últimas 10 melhores partidas:
                  </caption>
                  <div className="relative overflow-auto p-2">
                    <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
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
                          <tr className="bg-gray-400 border-b dark:bg-gray-800 dark:border-gray-700"  key={index}>
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
              className="absolute top-0 right-0 mt-4 mr-4 text-white hover:text-red-700 hover:bg-white border p-2 rounded cursor-pointer"
            >
              Fechar
            </button>
        </div>
      )}
    </>
  );
}

InfoKdaIndividual.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  openModal: PropTypes.bool.isRequired,
  fecharModal: PropTypes.func.isRequired,
};
