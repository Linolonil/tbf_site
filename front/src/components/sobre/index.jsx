import { useState } from 'react';
import tbfHistory from '../../assets/tbf-historia.jpg';
import CardsTexts from '../cardsTexts/index';

export default function Sobre() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section className="w-full h-screen lg:py-0 md:py-20 py-20 flex lg:justify-center md:justify-evenly items-center flex-col  md:h-auto bg-gradient-to-b from-black to-gray-900  text-center " id="sobre">
          <h2 className="w-full h=[20%] font-MyVikingFont text-white font-semibold uppercase lg:pt-20 first-letter:text-red-500 text-5xl lg:text-4xl md:text-6xl md:font-bold  md:text-center ">
            História
          </h2>

      <div className="flex w-full lg:h-[70vh] max-w-[25rem] md:max-w-[40rem] lg:max-w-[70rem] lg:max-h-[70rem] flex-col lg:my-20  my-20 lg:flex-row md:flex-col rounded-xl bg-black/40 bg-clip-border text-gray-700 shadow-md justify-center items-center lg:p-0 md:p-10 lg:pt-5 ">
        <div className="lg:w-[50%] lg:h-full md:h-auto shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700 md:w-full">
          <img src={tbfHistory} alt="image" className="h-full w-full object-fill" />
        </div>
        <div className="p-6 flex justify-center items-center flex-col">
          <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-gray-100 antialiased lg:text-xl md:text-4xl md:font-bold md:text-center">
            O início de um futuro glorioso!
          </h4>
          <p className="mb-8 mt-8 block font-sans text-base leading-relaxed text-white antialiased lg:text-base md:text-4xl md:text-justify md:leading-relaxed">
            Adentre os segredos de um reino esquecido, onde a TBF se ergue como uma lenda ancestral. Unidos pela lealdade e fortalecidos pela amizade, seu legado resplandece através das eras, desafiando o tempo.
          </p>
          <button
            onClick={toggleModal}
            className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-red-700 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:text-base md:text-4xl border border-red-700   md:hover:bg-red-900 md:hover:text-white duration-500 md:p-10 lg:p-5"
            type="button"
          >
            História completa
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
            </svg>
          </button>
        </div>
      </div>
      <CardsTexts modalOpen={isModalOpen} toggleModal={toggleModal} />
    </section>
  );
}
