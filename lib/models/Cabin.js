import mongoose from 'mongoose';

const cabinSchema = new mongoose.Schema({
  nummer: { type: Number, required: true, unique: true, index: true },
  status: { type: String, enum: ['vrij', 'optie', 'geboekt', 'geblokkeerd'], default: 'vrij' },
  prijsOverride: { type: Number, default: null },
  blokNotitie: { type: String, default: '' },
  optieTot: { type: Date, default: null },
});

export default mongoose.models.Cabin || mongoose.model('Cabin', cabinSchema);
