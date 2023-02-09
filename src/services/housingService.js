const Housing = require('../models/Housing.js');

exports.create = (housingData) => Housing.create(housingData);

exports.getTopHouses = () => Housing.find().sort({createdAt: -1}).limit(3).lean();

exports.getAll = () => Housing.find().lean();

exports.getOne = (housingId) => Housing.findById(housingId).populate('tenants');

exports.addTenant = async (housingId, tenantId) => {
    return Housing.findOneAndUpdate(
        {_id: housingId}, 
        { 
            $push: { tenants: tenantId },
            $inc: { availablePieces: -1 }
        })
}