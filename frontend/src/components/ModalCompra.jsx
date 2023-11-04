import React, { useEffect, useState } from 'react';

const ModalCompra = ({ estadoModalCompra, cambiarEstadoModalCompra }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let countdownInterval;

    if (estadoModalCompra && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Actualiza el contador cada segundo
    }

    if (countdown === 0) {
      // Realiza una acción cuando el contador llega a 0, como cerrar el modal o redireccionar.
      cambiarEstadoModalCompra(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [estadoModalCompra, countdown, cambiarEstadoModalCompra]);

  return (
    <>
      {estadoModalCompra && (
        <div className="w-screen h-screen fixed bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-center py-5 w-full mx-5 sm:mx-20 md:mx-32 lg:mx-64 xl:mx-80 2xl:mx-96 3xl:mx-2">
            <h1 className="text-xl font-bold mx-2 lg:text-2xl xl:text-3xl 2xl:text-4xl lg:py-5">Compra realizada con éxito</h1>
            <p className="text-lg font-medium pt-3 mx-2 lg:text-xl xl:text-2xl 2xl:text-3xl lg:py-5">Revise su correo electrónico.</p>
            <p className="text-base font-medium pt-3 mx-2 lg:text-lg xl:text-xl 2xl:text-2xl lg:py-5">
              Redireccionando a la página principal en {countdown} segundos.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCompra;
