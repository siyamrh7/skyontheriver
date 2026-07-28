import mongoose from 'mongoose';

const dekSchema = new mongoose.Schema({ naam: String, van: Number, tot: Number, prijs: Number }, { _id: false });
const programmaItemSchema = new mongoose.Schema({ tijd: String, wat: String }, { _id: false });
const programmaDagSchema = new mongoose.Schema(
  { nr: String, naam: String, datum: String, items: [programmaItemSchema] },
  { _id: false }
);

const settingsSchema = new mongoose.Schema({
  dekken: { type: [dekSchema], default: [] },
  suites: { type: [Number], default: [] },
  suitePrijs: { type: Number, default: 0 },
  junior: { type: [Number], default: [] },
  juniorPrijs: { type: Number, default: 0 },
  programma: { type: [programmaDagSchema], default: [] },
  fotos: { type: Object, default: {} },
});

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
