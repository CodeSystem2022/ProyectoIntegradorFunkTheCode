import {Link} from 'react-router-dom';

const Producto = ({
  modelo,
  precio,  
  portada,
}) => {

  const url = `/mas-informacion/${modelo}`;

  return (
    <Link to={url}>
      <div className='m-3 bg-white text-center hover:shadow-xl lg:mx-10 cursor-pointer duration-300'>
        <p className='text-2xl font-bold p-3'>{modelo}</p>
        <p className='text-xl inline-block'>Más información</p>
        <div className='flex justify-center pt-3'>
          <img src={portada} alt={modelo} className='h-52'/>
        </div>
        <p className='text-2xl text-gray-800 font-bold pt-2 pb-3'>${precio}</p>
      </div>
    </Link>
  )
}

export default Producto