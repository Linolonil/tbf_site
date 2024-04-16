import { useState, useEffect } from 'react';
import eventData from './eventoJson.json';

export default function EventosModal({ onClose }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { dia, hora, evento, detalhes } = eventData[0];
  
  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date(`${dia}T${hora}`); 
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, [dia, hora]);

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  function converterParaDataBrasileira(data) {
    const partesData = data.split('-'); // Dividir a data em partes separadas por hífen
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2];
  
    return `${dia}/${mes}/${ano}`; // Formatar a data no formato dd/mm/aaaa
  }
  const dataFormatada = converterParaDataBrasileira(dia);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 md:bg-black md:bg-opacity-60" onClick={onClose}></div>
      <div className="relative w-full lg:max-w-2xl md:max-w-3xl  bg-gray-300 p-6 rounded-lg">
        <h2 className="lg:text-xl md:text-5xl font-bold mb-4">{evento}</h2>
        <p className=" lg:text-base md:text-4xl font-semibold font-sans lg:mt-0 md:mt-14 text-left mb-5">Data: {dataFormatada} às {hora}</p>
        <p className="mb-2 lg:text-lg md:text-4xl font-light lg:font-sans md:font-sans md:text-justify md:mb-14 lg:mb-4 md:leading-relaxed">{detalhes}</p>

        <div className="flex justify-between mb-2">
          <div className="text-center">
            <div className="text-base font-semibold text-gray-500">Dias</div>
            <div className="text-5xl font-bold">{formatNumber(countdown.days)}</div>
          </div>
          <div className="text-center">
            <div className="text-base font-semibold text-gray-500">Horas</div>
            <div className="text-5xl font-bold">{formatNumber(countdown.hours)}</div>
          </div>
          <div className="text-center">
            <div className="text-base font-semibold text-gray-500">Minutos</div>
            <div className="text-5xl font-bold">{formatNumber(countdown.minutes)}</div>
          </div>
          <div className="text-center">
            <div className="text-base font-semibold text-gray-500">Segundos</div>
            <div className="text-5xl font-bold">{formatNumber(countdown.seconds)}</div>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 bg-red-600 text-white px-4 py-2 rounded-md lg:text-base md:text-3xl">Fechar</button>
      </div>
    </div>
  );
}
