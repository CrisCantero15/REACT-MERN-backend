const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

        // x-token (headers)

        const token = req.header('x-token');
        // console.log( token );

        if ( !token ) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            });
        }

        try {
            
            const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED ); // Toma el UID y el NAME del Token generado por el usuario

            req.uid = uid;
            req.name = name; // Cuando el JWT se valida, se añade a la request de la petición el UID y NAME del usuario al que pertenece ese JWT

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }

        next();

}

module.exports = {
    validarJWT
}