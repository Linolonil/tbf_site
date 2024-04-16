import { useState } from 'react';
import TypeWriter from '../typing';

// eslint-disable-next-line react/prop-types
export default function CardsTexts({ modalOpen, toggleModal }) {
  const [active, setActive] = useState(false);

  function mudaActive(){
    setActive(true)
    console.log(active)
  }

  return (
    <div  className={`fixed inset-0 w-screen h-screen   flex items-center justify-center flex-col bg-black/90 z-50  ${modalOpen ? 'block' : 'hidden'}`}>

      <div className="w-[90%] h-full md:w-full md:h-full bg-black/80 px-5 lg:min-w-10 lg:max-w-[70%] text-center overflow-auto  rounded-md">
        <div className='w-full flex justify-end'>

      <button onClick={toggleModal} className="flex select-none items-center rounded-lg font-sans  text-2xl  font-bold uppercase text-red-700 transition-all text-center hover:bg-pink-500/10 active:bg-pink-500/30  lg:p-2 lg:text-xl  hover:bg-red-700 hover:text-white duration-500 p-5 lg:px-5 lg:mt-4 ">
        x
        </button>
        </div>

        <div className="mb-4">
          <p className="my-8 font-sans text-base leading-relaxed text-gray-400 lg:text-xl md:text-2xl text-justify">
            O clã TBF teve sua gênese em 2008, no calor das batalhas do servidor KillerC4 de{' '}
            <span className="text-red-500">Lineage2</span>, na vibrante cidade de Manaus, Amazonas. Criado por um grupo de amigos, a TBF rapidamente se tornou mais do que uma simples aliança em um jogo online - tornou-se uma verdadeira família virtual.
          </p>
        </div>

        <div className="mb-4">
          <p className="my-8 font-sans text-base leading-relaxed text-gray-400 lg:text-xl md:text-2xl text-justify">
            O que começou como uma pequena comunidade local logo se expandiu para abraçar membros de todo o Brasil. A essência da TBF sempre foi a união e a amizade que transcendem as fronteiras físicas e se manifestam no mundo digital.
          </p>
        </div>

        <div className="mb-4">
          <p className="my-8 font-sans text-base leading-relaxed text-gray-400 lg:text-xl md:text-2xl text-justify">
            Com o tempo, a TBF estendeu seus laços além do universo de <span className="text-red-500">Lineage2</span>, adentrando outros jogos como <span className="text-red-500">League of Legends</span>, <span className="text-red-500">Valorant</span> e até mesmo atividades off-game, como partidas de <span className="text-red-500">Dungeons & Dragons</span>. O princípio fundamental era evidente: onde quer que um membro da TBF estivesse, o restante do clã estaria ao seu lado, oferecendo apoio e compartilhando aquele momento.
          </p>
        </div>

        <div className="mb-4">
          <p className="my-8 font-sans text-base leading-relaxed text-gray-400 lg:text-xl md:text-2xl text-justify">
            Mas a TBF é mais do que apenas um grupo de jogadores. É uma comunidade unida por laços forjados na confiança, na lealdade e, acima de tudo, na amizade. Eventos especiais, como assistir às finais do <span className="text-red-500">CBLOL</span> ou de <span className="text-red-500">Valorant</span> juntos, são apenas um exemplo do apoio mútuo e do espírito de equipe que permeiam o clã.
          </p>
        </div>

        <div className="mb-4">
          <p className="my-8 font-sans text-base leading-relaxed text-gray-400 lg:text-xl md:text-2xl text-justify">
            Na TBF, não importa se você é um mestre, platina ou bronze nas batalhas virtuais ou se prefere desbravar mundos de fantasia em jogos de tabuleiro. O que importa é a conexão que compartilhamos, o apoio mútuo e a alegria de estarmos juntos, seja nos campos de batalha digitais ou nas confraternizações presenciais.
          </p>
        </div>

        <div className="mb-4 flex justify-center items-center flex-col w-full">
          <TypeWriter active={active} value="- Entre todas as comunidades, não há nenhuma mais nobre e estável do que aquela em que os indivíduos estão unidos pela amizade -" />
        <br />
        
        <span onClick={mudaActive} className="flex  items-center  justify-center gap-2 rounded-lg text-center font-sans  text-2xl  font-bold uppercase text-red-700 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 lg:p-2 lg:text-xl lg:max-w-[50%] hover:bg-red-700 hover:text-white duration-500 border p-5 border-red-700 hover:border-red-700 mb-20 ">- Aristóteles</span>
          
        </div>

        
      </div>
    </div>
  );
}
