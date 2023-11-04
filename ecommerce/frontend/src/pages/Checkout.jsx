import React from 'react'
import Alerta from '../components/Alerta';
import ModalCompra from '../components/ModalCompra';
import { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

const Checkout = () => {
    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ dni, setDni ] = useState('');    
    const [ alerta, setAlerta ] = useState({});
    const [carrito, setCarrito] = useState([]);
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [vencimientoTarjeta, setVencimientoTarjeta] = useState('');
    const [titularTarjeta, setTitularTarjeta] = useState('');
    const [cvvTarjeta, setCvvTarjeta] = useState('');
    const [metodoDePago, setMetodoDePago] = useState('transferencia');
    const [estadoModalCompra, cambiarEstadoModalCompra] = useState(false);

    const handleNombre = (e) => {
        const value = e.target.value;
    
        // Quita cualquier caracter que no sea un número
        const alphabeticValue = value.replace(/[^A-Za-z ]/g, '');
    
        if (alphabeticValue.length <= 25) {
            setNombre(alphabeticValue);
        }
    };

    const handleDNI = (e) => {
        const value = e.target.value;
    
        // Quita cualquier caracter que no sea un número
        const numericValue2 = value.replace(/\D/g, '');
    
        if (numericValue2.length <= 16) {
            setDni(numericValue2);
        }
    };


    const handleNumTarjeta = (e) => {
        const value = e.target.value;
    
        // Quita cualquier caracter que no sea un número
        const numericValue2 = value.replace(/\D/g, '');
    
        // Deja ingresar hasta los 16 numeros de la tarjeta
        if (numericValue2.length <= 16) {
            setNumeroTarjeta(numericValue2);
        }
    };

    const handleVencimientoChange = (e) => {
        const value = e.target.value;
        
        // Quita cualquier caracter que no sea un número
        const numericValue = value.replace(/\D/g, '');
        
        // Formatea el valor como una fecha "xx/xx" si es válido
        if (numericValue.length <= 4) {
            const month = numericValue.slice(0, 2);
            const year = numericValue.slice(2, 4);
            setVencimientoTarjeta(`${month}/${year}`);
        } 
    };

    const handleCVV = (e) => {
        const value = e.target.value;
    
        // Quita cualquier caracter que no sea un número
        const numericValue3 = value.replace(/\D/g, '');
    
        // Formatea el valor como una fecha "xx/xx"
        if (numericValue3.length <= 3) {
            setCvvTarjeta(numericValue3);
        }
    };

    const handleTitularTarjeta = (e) => {
        const value = e.target.value;
    
        // Quita cualquier caracter que no sea un número
        const alphabeticValue = value.replace(/[^A-Za-z ]/g, '');
    
        if (alphabeticValue.length <= 25) {
            setTitularTarjeta(alphabeticValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if ([nombre, email, dni].includes('')) {
            setAlerta({ msg: 'Hay campos vacíos', error: true });
            return;
        }
    
        setAlerta({});
    
        try {
            if (metodoDePago === 'tarjeta') {
                if ([numeroTarjeta, vencimientoTarjeta, titularTarjeta, cvvTarjeta].includes('')) {
                    setAlerta({ msg: 'Hay campos de tarjeta vacíos', error: true });
                    return;
                }
                if (numeroTarjeta.length !== 16) {
                    setAlerta({ msg: 'Su tarjeta no contienen 16 números', error: true });
                    return;
                }
                if (vencimientoTarjeta.length == 2 || vencimientoTarjeta.length == 3 || vencimientoTarjeta.length == 4) {
                    setAlerta({ msg: 'Revise los datos del vencimiento de la tarjeta', error: true });
                    return;
                }
                if (/[0-9]/.test(titularTarjeta)) {
                    setAlerta({ msg: 'El nombre del titular debe contener unicamente letras', error: true });
                    return;
                }
                if (cvvTarjeta.length !== 3) {
                    setAlerta({ msg: 'El código valor de validación de su tarjeta no contiene 3 números', error: true });
                    return;
                }
                await clienteAxios.post("/cliente/checkout", {
                    nombre,
                    email,
                    dni,
                    metodoDePago,
                    carrito
                });
            } else {
                await clienteAxios.post("/cliente/checkout", { nombre, email, dni, metodoDePago, carrito });
            }
    
            setNombre('');
            setEmail('');
            setDni('');
            setNumeroTarjeta('');
            setVencimientoTarjeta('');
            setTitularTarjeta('');
            setCvvTarjeta('');

            // Borra los datos del carrito del Local Storage
            localStorage.removeItem('carrito');
            
            cambiarEstadoModalCompra(true);
            
            // Recarga la página después de 5 segundos
            setTimeout(() => {
                window.location.replace("/");
            }, 5000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };
    
 
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


    const seleccionarMetodoDePago = (metodo) => {
        setMetodoDePago(metodo);
    };


    const {msg} = alerta;
    return (
        <>
            <ModalCompra
                estadoModalCompra={estadoModalCompra}
                cambiarEstadoModalCompra={cambiarEstadoModalCompra}
            />
            <form 
                className="grid grid-cols-1 lg:grid-cols-2 px-3 sm:px-20 md:px-32 lg:px-0 justify-center items-center text-center pt-20" 
                onSubmit={handleSubmit}
            >
                <div className='lg:mx-5 xl:mx-10 2xl:mx-20'>
                    <h1 className="font-bold text-3xl xl:text-4xl">Detalle de facturacion</h1>
                    <p className="m-2 xl:text-lg">Llene el formulario para finalizar su compra.</p>
                    <div>
                        { msg && <Alerta 
                        alerta={alerta}
                        />}
                    </div>

                    <div className="m-3 text-base font-semibold">
                        <div className="relative m-3">
                            <input 
                                type="text"
                                className="border-2 rounded-lg border-gray-600 py-3 pl-20 focus:outline-none focus:border-blue-600 peer w-full" 
                                value={nombre}
                                onChange={handleNombre}
                            />
                            <label 
                                className=" absolute left-4 top-3 text-gray-600 cursor-text peer-focus:text-blue-600"
                            >Nombre</label>
                        </div>

                        <div className="relative m-3">
                            <input 
                                type="email" 
                                className="border-2 rounded-lg border-gray-600 py-3 pl-16 focus:outline-none focus:border-blue-600 peer w-full" 
                                value={email}
                                onChange={ e => setEmail(e.target.value) }
                            />
                            <label 
                                className="absolute left-4 top-3 text-gray-600 cursor-text peer-focus:text-blue-600"
                            >Email</label>
                        </div>

                        <div className="relative m-3">
                            <input 
                                type="dni" 
                                className="border-2 rounded-lg border-gray-600 py-3 pl-16 focus:outline-none focus:border-blue-600 peer w-full" 
                                value={dni}
                                onChange={handleDNI}
                            />
                            <label 
                                className="absolute left-4 top-3 text-gray-600 cursor-text peer-focus:text-blue-600"
                            >Dni</label>
                        </div>
                    </div>
                </div>


                <div className='border-2 text-gray-900 mb-10 mt-10 lg:mt-0 lg:mx-5 xl:mx-10 2xl:mx-20'>
                    {carrito.length > 0 ? (
                        <div className="text-lg font-semibold px-3 pt-3">
                            <div className='flex justify-between pb-3 xl:text-xl xl:font-bold'>
                                <p>Producto</p>
                                <p>Subtotal</p>
                            </div>
                            {carrito.map((producto) => (
                                <div key={producto.modelo} className="flex items-center justify-between lg:py-10 2xl:py-16 border-t border-black py-5 xl:text-xl 2xl:text-2xl">
                                    <img src={producto.imagen1} alt="Imagen Producto" className="h-24 xl:h-28 2xl:h-32" />
                                    <h1 className="px-2">{producto.modelo}</h1>
                                    <p className=' text-gray-500 px-2'>x{producto.cantidad}</p>
                                    <div className="flex flex-col items-center justify-between xl:pr-10 ">
                                    <p className="pl-2">${producto.precio * producto.cantidad}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Total carrito */}
                            <div className="flex justify-between border-t border-black w-full py-2 px-3 xl:text-xl xl:font-bold">
                                <p>Total:</p>
                                <p className='text-gray-500'>${calcularTotalCarrito()}</p>
                            </div>
                            {/* Seleccionar metodo de pago */}
                            <div className="border-t border-black w-full py-2 px-3">
                                <div>
                                    <input 
                                        type="radio" 
                                        name='metodo' 
                                        id='transferencia'
                                        className='mt-5 mb-3 mr-1'
                                        checked={metodoDePago === 'transferencia'}
                                        onChange={() => seleccionarMetodoDePago('transferencia')}/>
                                    <label htmlFor="transferencia">Transferencia bancaria</label>
                                    {metodoDePago === 'transferencia' && (
                                        // Contenido del menú de Transferencia bancaria
                                        <div className="text-gray-500 font-normal mb-4 text-base">
                                        <h2 className=' font-semibold text-xl pb-1 text-black'>Nuestros detalles bancarios</h2>
                                        <p>Banco: <span className='text-black font-medium'>Banco Santander</span></p>
                                        <p>Número de cuenta: <span className='text-black font-medium'>0720281288000000939618</span></p>
                                        <p>Alias: <span className='text-black font-medium'>ItuiPhone</span></p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                <input 
                                    type="radio" 
                                    name='metodo' 
                                    id='tarjeta'
                                    className='mb-3 mr-1'
                                    checked={metodoDePago === 'tarjeta'}
                                    onChange={() => seleccionarMetodoDePago('tarjeta')}/>
                                <label htmlFor="tarjeta">Tarjeta de debito o credito</label>
                                {metodoDePago === 'tarjeta' && (
                                    // Contenido del menú de Tarjeta de débito o crédito
                                    <div className="m-3 text-base font-semibold">
                                        <div className="relative">
                                            <input 
                                                className="border-2 rounded-md border-gray-600 pl-28 focus:outline-none focus:border-blue-600 peer w-full py-1" 
                                                value={numeroTarjeta}
                                                onChange={handleNumTarjeta}
                                            />
                                            <label 
                                                className="absolute left-4 text-gray-600 cursor-text peer-focus:text-blue-600 pt-1"
                                            >Nº Tarjeta:</label>
                                        </div>
                                        <div className="relative mt-2">
                                            <input 
                                                className="border-2 rounded-md border-gray-600 pl-32 focus:outline-none focus:border-blue-600 peer w-full py-1" 
                                                value={vencimientoTarjeta}
                                                onChange={handleVencimientoChange}
                                            />
                                            <label 
                                                className="absolute left-4 text-gray-600 cursor-text peer-focus:text-blue-600 pt-1"
                                            >Vencimiento:</label>
                                        </div>
                                        <div className="relative mt-2">
                                            <input 
                                                className="border-2 rounded-md border-gray-600 pl-20 focus:outline-none focus:border-blue-600 peer w-full py-1" 
                                                value={titularTarjeta}
                                                onChange={handleTitularTarjeta}
                                            />
                                            <label 
                                                className="absolute left-4 text-gray-600 cursor-text peer-focus:text-blue-600 pt-1"
                                            >Titular:</label>
                                        </div>
                                        <div className="relative mt-2">
                                            <input 
                                                className="border-2 rounded-md border-gray-600 pl-16 focus:outline-none focus:border-blue-600 peer w-full py-1" 
                                                value={cvvTarjeta}
                                                onChange={handleCVV}
                                            />
                                            <label 
                                                className="absolute left-4 text-gray-600 cursor-text peer-focus:text-blue-600 pt-1"
                                            >CVV:</label>
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                            <div className="text-center">
                                <input 
                                    type="submit"
                                    value="Finalizar Compra"
                                    className="text-white bg-zinc-900 py-2 w-full font-bold hover:cursor-pointer mb-2 hover:bg-zinc-800"
                                />
                            </div>
                        </div>
                    ) : (
                        <p className="text-center font-bold text-lg py-5">No hay productos en el carrito.</p>
                    )}
                </div>
            </form>
        </>
    )
}

export default Checkout