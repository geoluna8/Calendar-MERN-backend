/*
    Rutas de eventos / Events
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

// Todas tienen que pasar por la validacion del JWT
// Colocar aqui el middleware hace que aplique a todas las rutas
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos);

// Crear evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos,
    ],
    crearEvento );

// Actualizar evento
router.put('/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos,
    ],
    actualizarEvento );

// Borrar evento
router.delete('/:id', eliminarEvento );

module.exports = router;