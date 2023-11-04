import React, { useEffect } from 'react';

const Alerta = ({alerta}) => {

  useEffect(() => {
    // Scroll hacia arriba cuando se muestra la alerta
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [alerta]);
  
  return (
    <div className={`${alerta.error ? ' bg-red-500 border-red-600' : 'bg-indigo-500 border-indigo-600'} rounded-md border-2 p-2 font-bold text-white text-sm opacity-90`} >
        {alerta.msg}
    </div>
  )
}

export default Alerta