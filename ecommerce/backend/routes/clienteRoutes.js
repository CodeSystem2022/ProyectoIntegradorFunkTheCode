import express from 'express';
import {
    mostrarProductos,
    informacionProducto,
    checkout,
} from "../controllers/clienteController.js";

const router = express.Router();

router.get('/', mostrarProductos);
router.get('/mas-informacion/:modelo', informacionProducto);
router.post('/checkout', checkout);

export default router;