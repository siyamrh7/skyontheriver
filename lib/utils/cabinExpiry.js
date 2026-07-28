import Cabin from '../models/Cabin.js';
import Booking from '../models/Booking.js';

// Cabins held in 'optie' for >24h revert to 'vrij', and their linked pending
// booking is auto-cancelled. Called at the top of any query/mutation that
// touches cabin availability, so there is no need for a background cron job.
export async function releaseExpiredOptions() {
  const now = new Date();
  const expired = await Cabin.find({ status: 'optie', optieTot: { $lt: now } }).select('nummer');
  if (!expired.length) return;
  const nummers = expired.map((c) => c.nummer);
  await Cabin.updateMany({ nummer: { $in: nummers } }, { status: 'vrij', optieTot: null });
  await Booking.updateMany({ cabinNummer: { $in: nummers }, status: 'pending' }, { status: 'geannuleerd' });
}
