const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async ( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user', 'name'); // Rellenar los datos del 'user' (referenciamos al usuario en concreto gracias a que coincide el ID de 'user' con el del 'Usuario')

    res.status(200).json({
        ok: true,
        msg: eventos
    });

}

const crearEvento = async ( req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado // Aquí lo convierte en JSON entonces actúa la serialización especificada en el Model
        })

    } catch (error) {
        
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

    // Verificar que tenga el evento
    // console.log( req.body );

    // res.status(200).json({
    //     ok: true,
    //     msg: 'crearEvento'
    // });

}

const actualizarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        // 1 - Buscamos y obtenemos el evento
        // 2 - Realizamos las validaciones oportunas
        // 3 - Actualizamos el evento

        const evento = await Evento.findById( eventoId );
        
        if ( !evento ) { // Verificamos que el evento exista con el ID enviado como parámetro
            
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            });

        }

        if ( evento.user.toString() !== uid ) { // Verificamos que la persona quiera editar un evento propio. Es decir, que el 'user' del evento (ID) es igual al ID del usuario autenticado por el JWT

            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });

        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); // Por defecto retorna el documento sin actualizar. Con { new: true } retorna el documento actualizado

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const eliminarEvento = async ( req, res = response ) => {

    // Borrar el documento de la BBDD

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {

            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            });

        }

        if ( evento.user.toString() !== uid ) {

            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });

        }

        const eventoEliminado = await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true,
            evento: eventoEliminado
        });

    } catch (error) {
        
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

    res.status(200).json({
        ok: true,
        msg: 'eliminarEvento'
    });

}

module.exports = {
    actualizarEvento,
    crearEvento,
    eliminarEvento,
    getEventos
}