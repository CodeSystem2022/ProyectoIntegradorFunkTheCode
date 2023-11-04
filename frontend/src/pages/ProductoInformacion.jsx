import { useParams } from 'react-router-dom';
import { useEffect , useState } from 'react';
import clienteAxios from '../config/axios';
import React from 'react';

const ProductoInformacion  = () => {
    const params = useParams()
    const {modelo} = params
    
    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(true);
    const [carrito, setCarrito] = useState([])

    useEffect(() => {
      const obtenerProducto = async () => {
        try {
          const url = `/cliente/mas-informacion/${modelo}`;
          const {data} = await clienteAxios(url)
          setInfo(data)
          setLoading(false);
          const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
          if (carritoGuardado) {
            setCarrito(carritoGuardado);
          }
        } catch (error) {
          console.log(error);
        }
      }
      obtenerProducto();
    }, [])

    const mostrarDescripcion = () => {
      if (loading) {
        return <p>Cargando...</p>;
      } else if (info.descripcion && info.descripcion.length > 0) {
        return (
          <ul className='mb-5 md:mb-0 xl:text-lg lg:py-5'>
            {info.descripcion.map((element) => (
              <li key={element} className=''>{element}</li>
            ))}
          </ul>
        );
      }
      return <p>No hay descripción disponible.</p>;
    };

    const mostrarImagen = () => {
      const main_img = document.querySelector('.main_img')
      const thumbnail = document.querySelectorAll('.thumbnail')

      thumbnail.forEach(thumb => {
        thumb.addEventListener('click', function (){
          const act = document.querySelector('.act')
          act.classList.remove('act')
          this.classList.add('act')
          main_img.src = this.src
        })
      })
    };

    const agregarProductoAlCarrito = (producto) => {
      // Verifica si el producto ya existe en el carrito
      const productoExistente = carrito.find((item) => item.modelo === producto.modelo);
    
      if (productoExistente) {
        // Si el producto existe, aumenta la cantidad
        const nuevoCarrito = carrito.map((item) => {
          if (item.modelo === productoExistente.modelo) {
            return {
              ...item,
              cantidad: item.cantidad + 1,
            };
          }
          return item;
        });
        setCarrito(nuevoCarrito);
        // Almacena el carrito en el Local Storage después de la actualización
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      } else {
        // Si el producto no existe, agrégalo al carrito con cantidad 1
        const nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
        setCarrito(nuevoCarrito);
        // Almacena el carrito en el Local Storage después de la actualización
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      }
    };    
    
    const onAgregarAlCarritoClick = () => {
      console.log(localStorage.getItem('carrito'));
      agregarProductoAlCarrito(info);
      window.location.reload();
    };

  return (
    <>
      <div className='pt-20 pb-9 bg-slate-100'>
        <div className="bg-white container mx-auto md:grid md:grid-cols-2 py-5 xl:py-14">

          <div className='flex flex-col justify-between'>{mostrarImagen()}
            <div className="img_container w-80 mx-auto">
              <img src={info.imagen1} alt="img1Portada" className='main_img rounded object-cover'/>
            </div>
            <div className="h-20 flex mx-auto">
              <img src={info.imagen1} className='thumbnail act h-20 rounded cursor-pointer object-covertransition duration-300 hover:opacity-70 border-gray-400 border-2' alt="img1" />
              <img src={info.imagen2} className='thumbnail h-20 rounded cursor-pointer object-cover transition duration-300 hover:opacity-70 border-gray-400 border-2' alt="img2" />
              <img src={info.imagen3} className='thumbnail h-20 rounded cursor-pointer object-cover transition duration-300 hover:opacity-70 border-gray-400 border-2' alt="img3" />
              <img src={info.imagen4} className='thumbnail h-20 rounded cursor-pointer object-cover transition duration-300 hover:opacity-70 border-gray-400 border-2' alt="img4" />
            </div>
          </div>

          <div className='px-10 flex flex-col justify-between'>
            <p className='text-3xl sm:text-4xl xl:text-5xl font-bold mb-2 text-center md:text-left lg:pb-5'> {info.modelo} </p>
            <p className='text-xl sm:text-2xl xl:text-3xl text-gray-500 font-bold mb-5 text-center md:text-left'> ${info.precio} </p>
            {mostrarDescripcion()}
            <button 
              type="submit"
              id='btnAgregar'
              className="border-2 border-gray-500 py-2 w-full rounded-xl text-gray-600 font-bold hover:shadow-md hover:text-blue-600 hover:border-blue-600 cursor-pointer duration-300"
              onClick={() => onAgregarAlCarritoClick()}
            >Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductoInformacion