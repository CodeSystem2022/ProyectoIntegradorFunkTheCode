const Modal = ({children, estado, cambiarEstado}) => {
    return ( 
        <>
            {estado && 
                <div className=" w-screen h-screen fixed bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white">
                        <div className="flex items-center justify-between py-2 border-b border-black px-3">
                            <h3 className="text-xl font-bold">
                                Carrito
                            </h3>
                            <p 
                                className="text-xl font-bold pr-2 text-red-600 hover:text-red-300 cursor-pointer duration-300"
                                onClick={() => cambiarEstado(false)}
                            >X</p>
                        </div>
                        {children}
                    </div>
                </div>
            }
        </>
     );
}
 
export default Modal;