import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  cabinNummer: { type: Number, required: true, index: true },
  naam: { type: String, required: true },
  email: { type: String, default: '' },
  tel: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'bevestigd', 'geannuleerd'], default: 'pending' },
  betaald: { type: Boolean, default: false },
  factuur: {
    type: new mongoose.Schema({ naam: String, url: String }, { _id: false }),
    default: null,
  },
  aangemaaktOp: { type: Date, default: Date.now },
  vervaltOp: { type: Date, default: null },
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
