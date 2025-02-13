const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async ( req, res = response ) => {

    // console.log( req.body );
    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email }); // Busca y devuelve un documento de una colección en base a un dato (email) --> Retorna null si no encuentra coincidencias
        // console.log( usuario );

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        usuario = new Usuario( req.body ); // Mongoose sabe qué valores va a tener el usuario (definido por Schema) y va a ignorar todos los demás valores
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name ); // Esto genera el JWT con el ID y el nombre del usuario en el payload

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }

}

const loginUsuario = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email }); // Busca y devuelve un documento de una colección en base a un dato (email) --> Retorna null si no encuentra coincidencias
        // console.log( usuario );

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no válido'
            });
        }

        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidarToken = async ( req, res = response ) => {

    const { uid, name } = req;

    // Generar un nuevo JWT y retornarlo en esta petición

    const token = await generarJWT( uid, name );
    // console.log( token );

    res.json({
        ok: true,
        uid,
        name,
        token
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}