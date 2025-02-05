const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req, res = response, next ) => { // next es una función de callback que se llama si todo se ejecuta correctamente

    // Manejo de errores

    const errors = validationResult( req );
    // console.log( errors );

    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();

}

module.exports = {
    validarCampos
}