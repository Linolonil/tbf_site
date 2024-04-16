import Contatos from '../../components/contatos';
import DesempenhoLol from '../../components/desempenho';
import Footer from '../../components/footer';
import Integrantes from '../../components/integrantes';
import Navbar from '../../components/navbar';
import Sobre from '../../components/sobre';
import IntroTBF from './../../components/introTBF/index';

export default function Home(){
  return(
  <>
      <Navbar/>
       <IntroTBF/>
       <Sobre/>
       <Integrantes/>
       <DesempenhoLol/>
       <Contatos/>
       <Footer/>

  </>
  )
}
