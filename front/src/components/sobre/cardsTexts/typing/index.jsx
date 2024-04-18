import { useEffect, useState } from 'react';
import style from './typing.module.css';

// eslint-disable-next-line react/prop-types
function TypeWriter({ value, active}) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (active) { 
      typeWriter(value);
    } else {
      setText(''); 
    }
 }, [active, value])

  const typeWriter = (text, i = 0) => {
    // eslint-disable-next-line react/prop-types
    if (i < value.length) {
      setText(text.slice(0, i + 1));
      setTimeout(() => {
        typeWriter(text, i + 1);
      }, 70);
    }
  };


  return (
<div className={active ? `${style.card_type_text} ${style.active}` : style.card_type_text}>
      {text}
      </div>
  )
}

  export default TypeWriter;
