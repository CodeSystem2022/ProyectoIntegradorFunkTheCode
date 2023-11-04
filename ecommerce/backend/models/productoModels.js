import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
    modelo: {
        type: String,
    },
    precio: {
        type: Number,
    },
    almacenamiento: {
        type: Array,
    },
    ram: {
        type: Number,
    },
    color: {
        type: Array,
    },
    descripcion: {
        type: Array,
    },
    portada: {
        type: String,
    },
    imagenes: {
        type: Array,
    },
});

const productoModels = mongoose.model("productoModels", productoSchema);
export default productoModels;