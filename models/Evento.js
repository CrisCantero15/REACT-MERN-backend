const { model, Schema } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, // Almacenará un identificador único de MongoDB para documentos en una colección. Específicamente se utiliza para referencia otros documentos en la BBDD
        ref: 'Usuario', // Este campo es una referencia a la colección 'Usuario'. El valor de 'user' será el '_id' de un documento en la colección 'Usuario'
        required: true
    }
});

EventoSchema.method('toJSON', function(){ // Esto solo ocurre al llamar al método toJSON
    const { __v, _id, ...object } = this.toObject();
    object.id = _id; // Renombramos la propiedad _id por id y le damos su mismo valor
    return object;
});

module.exports = model('Evento', EventoSchema);