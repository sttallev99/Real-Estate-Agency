const Housing = require('../models/Housing');

exports.create = async (housingData) => await Housing.create(housingData);
exports.getTopHouses = async() => Housing.find().sort({createdAt: -1}).limit(3).lean();
exports.getAll = async() => Housing.find().lean();
exports.getOne = async(id) => Housing.findById(id).populate('tenants');
exports.addTenant = async(housingId, tenantId) => {
    return Housing.findOneAndUpdate(
        {_id: housingId}, 
        { 
            $push: {tenants: tenantId },
            $inc: { availablePieces: -1}
        },
        { runValidators: true });
}
exports.delete = async(id) => Housing.findByIdAndDelete(id);
exports.updateHousing = async(id, data) => Housing.findByIdAndUpdate(id, data);
exports.search = async(text) => Housing.find({ type: { $regex: text, $options: 'i' }}).lean();