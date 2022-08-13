const mongoose = require('mongoose');

let housingSchema = new mongoose.Schema({
    name: {
        type: String,
        minLenght: 6,
        required: true
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true
    },
    year: {
        type: Number,
        min: 1960,
        max: 2022,
        required: true
    },
    city: {
        type: String,
        minLenght: 6,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true
    },
    availablePieces: {
        type: Number,
        required: true
    },
    tenants: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }


}, { timestamps: true });

housingSchema.method('getTenants', function() {
    return this.tenants.map(x => x.name).join(', ');
});

let Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;