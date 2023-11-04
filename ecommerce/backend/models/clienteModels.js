import mongoose from "mongoose";

const clienteSchema = mongoose.Schema({
    dni: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    metodoDePago: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    carrito: {
        type: Array,
        required: true,
        unique: true,
        trim: true
    }
});

const clienteModels = mongoose.model("clienteModels", clienteSchema);
export default clienteModels;