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
            console.log(apiUrlUpdate);
            await axios.get(`${apiUrlUpdate}${id}`);
            localStorage.setItem(`lastAccessDate_${id}`, today);
          }

          const apiUrlKda = import.meta.env.VITE_API_URL_KDA_ENV;

          console.log(apiUrlKda);
          const responseKda = await axios.get(`${apiUrlKda}${id}`);

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
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 rounded-[20px]">
          <div className="bg-black w-full h-full rounded-[20px]">
            <div className="overflow-y-auto h-full">
              {loading && (
                <div className="absolute inset-0 bg-black flex items-center justify-center rounded-[20px] z-10">
                  <div className="loader">
                    <div className="loader_square"></div>
                    <div className="loader_square"></div>
                    <div className="loader_square"></div>
                    <div className="loader_square"></div>
                    <div className="loader_square"></div>
                    <div className="loader_square"></div>
                    <div className="loader_square"></div>
                  </div>
                </div>
              )}
              {playerInfo && !loading && (
                <div className="w-full h-full flex  justify-center items-center flex-col border rounded-[20px] pb-10">
                  <h2 className="text-xl font-bold mb-4">{name}</h2>
                  <h3 className="mt-4 mb-2 text-lg font-semibold">
                    Últimas 10 melhores partidas:
                  </h3>
                  <div className="overflow-auto p-10">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2 text-center">Data</th>
                          <th className="border px-4 py-2 text-center">
                            K/D/A
                          </th>
                          <th className="border px-4 py-2 text-center">
                            Média
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {playerInfo.partidas.map((partida, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2 text-center">
                              {formatDate(partida.gameStartTime)}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {partida.kda.kills}/{partida.kda.deaths}/
                              {partida.kda.assists}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {(
                                (partida.kda.kills + partida.kda.assists) /
                                (partida.kda.deaths == 0
                                  ? 1
                                  : partida.kda.deaths)
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={fecharModal}
              className="absolute top-0 right-0 mt-4 mr-4 text-white hover:text-red-700 hover:bg-white border p-2 rounded cursor-pointer"
            >
              Fechar
            </button>
          </div>
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
