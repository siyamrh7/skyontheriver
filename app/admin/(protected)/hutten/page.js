import { getCabins, getAdminBookings, getPublicSettings } from '../../../../lib/queries';
import CabinManager from '../../../../components/admin/CabinManager';

export const dynamic = 'force-dynamic';

export default async function HuttenBeheerPage() {
  const [cabins, bookings, settings] = await Promise.all([getCabins(), getAdminBookings(), getPublicSettings()]);
  return <CabinManager initialCabins={cabins} initialBookings={bookings} dekken={settings.dekken} />;
}
