import { useState } from "react";
import viking from "../../assets/viking.png";
import MusicPlayer from "../musicaIntro";
import styles from './introTBF.module.css'

function IntroTBF() {
  const [play, setPlay] = useState(false);

  function startMusic() {
    setPlay(!play);
  }

  return (
    <header  className={`h-[100vh] w-full flex justify-center items-center flex-col lg:flex-row gap-11 bg-black/60 lg:bg-black/80  lg:bg-fixed top-0 bg-clip-padding bg-origin-content bg-center bg-cover bg-no-repeat bg-blend-multiply shadow-2xl ${window.innerWidth < 768 ? 'order-first' : ''} ${window.innerWidth < 640 ? 'order-first' : ''} ${styles.introTBF}`} >
      <MusicPlayer startMusic={play} />
      <img
        className="
        w-80
        sm:w-72
        lg:w-80
        drop-shadow-md-hover
        transition-[filter] 
        duration-[500ms]
        cursor-pointer
        hover:box-border 
        hover:drop-shadow-md 
        "
        src={viking}
        alt="viking"
        onClick={startMusic}
      />
      <h3 className="
      font-MyVikingFont 
      text-[7rem] 
      font-bold 
      bg-clip-text text-transparent bg-gradient-to-r from-gray-800/90 to-red-800
      p-[10px] 
      text-center
      " translate="no">
        <span className="text-red-600  drop-shadow-red"> ṭ</span>he
        <span className="text-red-600   drop-shadow-red"> B</span>ig
        <span className="text-red-600   drop-shadow-red"> F</span>riends
      </h3>
    </header>
  );
}

export default IntroTBF;
