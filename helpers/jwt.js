const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => { // Recibe como parámetros lo que sería el payload del JWT (UID y NAME del usuario)

    return new Promise( (resolve, reject) => {

        const payload = {
            uid,
            name
        }

        // Creación del token

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, token ) => {

            if( err ) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        });

    });

}

module.exports = {
    generarJWT
}