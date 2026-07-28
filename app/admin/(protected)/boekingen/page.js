import { getAdminBookings, getCabins } from '../../../../lib/queries';
import BookingsTable from '../../../../components/admin/BookingsTable';

export const dynamic = 'force-dynamic';

export default async function BoekingenPage() {
  const [bookings, cabins] = await Promise.all([getAdminBookings(), getCabins()]);
  const prijsPerCabin = Object.fromEntries(cabins.map((c) => [c.nummer, c.prijs]));
  return <BookingsTable initialBookings={bookings} prijsPerCabin={prijsPerCabin} />;
}
