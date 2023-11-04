import {Outlet, Link} from 'react-router-dom'
import {  useState, useEffect  } from 'react';
import Modal from '../components/Modal'


const AuthLayout = () => {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Recupera el carrito desde el Local Storage
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
      setCarrito(carritoGuardado);
    }
  }, []);

  const calcularTotalCarrito = () => {
    let total = 0;
    carrito.forEach((producto) => {
      total += (producto.precio * producto.cantidad);
    });
    return total;
  };

  // Calcula el total
  const totalCarrito = calcularTotalCarrito();

  // Guarda el total en el Local Storage
  localStorage.setItem('totalCarrito', totalCarrito);

  const eliminarProductoDelCarrito = (modelo) => {
    const nuevoCarrito = carrito.filter((producto) => producto.modelo !== modelo);
    setCarrito(nuevoCarrito);
  
    // Actualiza el Local Storage para reflejar los cambios
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.location.reload();
  };

  const aumentarCantidad = (modelo) => {
    const nuevoCarrito = carrito.map((producto) => {
      if (producto.modelo === modelo) {
        // Incrementa la cantidad del producto
        const nuevaCantidad = parseInt(producto.cantidad) + 1;
        return {
          ...producto,
          cantidad: nuevaCantidad,
        };
      }
      return producto;
    });
    setCarrito(nuevoCarrito);
  
    // Actualiza el Local Storage
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };
 
  const disminuirCantidad = (modelo) => {
    const nuevoCarrito = carrito.map((producto) => {
      if (producto.modelo === modelo) {
        const nuevaCantidad = (producto.cantidad) - 1;
        return {
          ...producto,
          cantidad: nuevaCantidad < 1 ? 1 : nuevaCantidad,
        };
      }
      return producto;
    });
    setCarrito(nuevoCarrito);
  
    // Actualiza el Local Storage
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };
  


  return (
    <>
      <div className=''>
        <header className='fixed w-full h-14 grid grid-cols-3 bg-black/80 z-50'>
          <div>
            <Link to="/">  
              <p className='text-2xl pl-5 text-white hover:text-slate-200 cursor-pointer duration-300 pt-2'>ItuiPhone</p>
            </Link>
          </div>
          <div className='flex items-center mx-auto'>
            <Link to="/">
              <img 
                src="https://argentinacomponentes.com/wp-content/uploads/2023/10/logo3.webp" 
                alt="Logo" 
                className='h-8 hover:opacity-80 cursor-pointer duration-300'
              />
            </Link>
          </div>
          <div className='flex items-center justify-end'>
            <button onClick={() => cambiarEstadoModal(!estadoModal)}>
              <img 
                src="/public/assets/icons/cart.svg" 
                alt="Cart" 
                className='h-7 mr-10 hover:opacity-80 cursor-pointer duration-300'
              />
            </button>
          </div>
        </header>
      
        
        <Modal
          estado={estadoModal}
          cambiarEstado={cambiarEstadoModal}
          carrito={carrito}
        >
          {carrito.length > 0 ? (
            <div className="">
              <div className={carrito.length >= 4 ? 'h-96 overflow-auto' : ''}>
                {carrito.map((producto) => (
                  <div key={producto.modelo} className="flex items-center justify-between py-1 px-5 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                    <p
                      className="text-red-600 hover:text-red-300 cursor-pointer duration-300" 
                      onClick={() => eliminarProductoDelCarrito(producto.modelo)}
                    >
                      X
                    </p>
                    <img src={producto.imagen1} alt="Imagen Producto" className="h-24 md:h-28 xl:h-32" />
                    <div className='flex flex-row'>
                      <button className='xl:pl-10 cursor-pointer duration-300 hover:text-slate-300' onClick={() => disminuirCantidad(producto.modelo)}>&lt;</button>
                      <p className='px-2'>{producto.cantidad}</p>
                      <button className='xl:pr-10 cursor-pointer duration-300 hover:text-slate-300' onClick={() => aumentarCantidad(producto.modelo)}>&gt;</button>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                      <h1 className="pb-3 font-bold">{producto.modelo}</h1>
                      <p className="text-gray-500">${producto.precio * producto.cantidad}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Total carrito */}
              <div className="flex justify-between border-t border-black py-2 px-3">
                <p className='font-bold text-lg xl:text-2xl'>Total:</p>
                <p className='text-lg xl:text-2xl text-gray-500 font-bold'>${calcularTotalCarrito()}</p>
              </div>
              <div className="flex justify-between border-t border-black py-2 px-1 lg:px-5 xl:px-10 2xl:px-15">
                <Link to="/">  
                  <button 
                    type="submit"
                    id='SeguirComprando'
                    className="border-2 border-gray-500 py-1 md:py-2 w-full rounded-xl text-gray-600 font-semibold cursor-pointer hover:shadow-md hover:text-blue-600 hover:border-blue-600 px-1 duration-300"
                    onClick={() => {
                      cambiarEstadoModal(false);
                    }}
                  >Seguir Comprando
                  </button>
                </Link>
                <Link to="/checkout">  
                  <button 
                    type="submit"
                    id='FinalizarCompra'
                    className="border-2 border-gray-500 py-1 md:py-2 w-full rounded-xl text-gray-600 font-semibold cursor-pointer hover:shadow-md hover:text-blue-600 hover:border-blue-600 px-1 duration-300"
                    onClick={() => {cambiarEstadoModal(false);}}
                  >Finalizar Compra
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <p className="px-5 py-5 text-center font-semibold text-lg lg:text-xl 2xl:text-2xl lg:px-10 2xl:px-20 lg:py-10 2xl:py-20">No hay productos en el carrito.</p>
          )}
        </Modal>  


        <Outlet />
        

        <footer className='h-11 bg-black/90 text-center grid grid-cols-3 content-center text-gray-300'>
          <p className='col-span-2'>ItuiPhone | 2023 | Todos los derechos reservados</p>
          <a href='https://github.com/CodeSystem2022/FunkTheCode-Cuarto-Semestre' className='text-gray-300 hover:text-blue-600 cursor-pointer duration-300'>funkTheCode</a>
        </footer>
      </div>
    </>
  )
}

export default AuthLayout