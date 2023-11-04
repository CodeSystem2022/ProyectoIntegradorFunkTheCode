import { useContext } from 'react';
import Producto from '../components/Producto';
import {DataContext} from '../context/DataProvider'

const Home = () => {

  const value = useContext(DataContext);
  const [productos] = value.productos;

  return (
    <>
      <section className='bg-black text-center flex flex-col justify-between min-h-screen pt-40 md:pt-20 lg:pt-10'>
          <p className='text-white text-3xl pt-3'>iPhone 15</p>
          <p className='text-gray-400 text-2xl lg:pt-10'>Consulta la disponibilidad más adelante</p>
        <div className="bg-black flex justify-center">
          <img src="https://argentinacomponentes.com/wp-content/uploads/2023/10/1200_8002.webp" alt="iPhone 15" className=''/>
        </div>
      </section>

      {/* md:grid grid-cols-3 */}

      <section className='bg-slate-100 px-5'>
        <p className='text-4xl py-7 font-bold text-center'>Encuentra el iPhone perfecto para ti.</p>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 sm:mx-10 md:mx-0'>
          {
            productos.map(producto =>(
              <Producto
                key={producto._id}
                modelo={producto.modelo}
                precio={producto.precio}
                portada={producto.imagen1}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Home