import productoModels from "../models/productoModels.js";
import clienteModels from "../models/clienteModels.js"
import emailCheckout from "../helpers/emailCheckout.js";

const mostrarProductos = async (req, res) => {
    const producto = await productoModels.find();
    res.json(producto)
};

const informacionProducto = async (req, res) => {
    const {modelo} = req.params;
    try {
        const infoModelo = await productoModels.findOne({modelo});
        res.json(infoModelo)
    } catch (error) {
        console.log(error);
    }
};

const checkout = async (req, res) => {
    const {email, nombre, dni, metodoDePago, carrito} = req.body;

    try {
        //Guardar un nuevo cliente
        const cliente = new clienteModels(req.body);
        const clienteGuardado = await cliente.save();

        //Enviar email
        emailCheckout({
            email,
            nombre,
            dni, 
            metodoDePago,
            carrito
        });

        res.json(clienteGuardado);
    } catch (error) {
        console.log(error);
    }
};

export {
    mostrarProductos,
    informacionProducto,
    checkout,
}
