import { useState } from 'react';
import styles from './Card.module.css';
import PropTypes from 'prop-types';
import InfoKdaIndividual from './../fetchPlayerInfo/index';
import { ToastContainer } from 'react-toastify';

export default function CardIntegrantes({id, name, funcao ,imagem ,champion }) {
  const [modalAberto, setModalAberto] = useState(false);



  // Função para abrir o modal
  const abrirModal = () => {
    setModalAberto(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <div className={styles.card_front} style={{ backgroundImage: `url(${imagem})` }}>
          <h1 className={styles.title}>{`${name}`}</h1>
        </div>

        <div className={styles.card_back} style={{ backgroundImage: `url(${champion})`}}>
          <div className={styles.back_title}>{name}</div>
          <div className={styles.movie_description}>
            {funcao}
          </div>
          <div className={styles.genre}></div>
          <a  className={styles.btn} onClick={abrirModal}>desempenho individual</a>
          <InfoKdaIndividual id={id} name={name} openModal={modalAberto} fecharModal={fecharModal} />
        </div>            
      </div>
      <ToastContainer/>
    </div>
  );
}

CardIntegrantes.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  funcao: PropTypes.string.isRequired,
  imagem: PropTypes.string.isRequired,
  champion: PropTypes.string.isRequired,
};
