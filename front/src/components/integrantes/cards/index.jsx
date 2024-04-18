import { useState, useEffect } from "react";
import axios from "axios";
import CardIntegrantes from "./cardIntegrantes";

export default function Cards() {
  const [integrantesData, setIntegrantesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiBuscaInfo = import.meta.env.VITE_API_INFO;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get(apiBuscaInfo);
          setIntegrantesData(response.data);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Erro ao buscar informações:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div
      className={` w-full h-auto p-2.5 flex justify-center items-center flex-wrap gap-7 box-border bg-transparent`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center lg:h-96 md:h-96 h-96 text-lg">

          <div className="loader">
            <div className="loader_square"></div>
            <div className="loader_square"></div>
            <div className="loader_square"></div>
            <div className="loader_square "></div>
            <div className="loader_square"></div>
            <div className="loader_square"></div>
            <div className="loader_square "></div>
          </div>
        </div>
      ) : (
        integrantesData
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((integrante) => (
            <div key={integrante.id}>
              <CardIntegrantes
                id={integrante.id}
                name={integrante.nome}
                funcao={integrante.funcao}
                imagem={integrante.image}
                champion={integrante.champion}
              />
            </div>
          ))
      )}
    </div>
  );
}
