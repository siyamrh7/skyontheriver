import { getPublicSettings, getCabins } from '../../../lib/queries';
import HuttenContent from '../../../components/site/HuttenContent';

export const dynamic = 'force-dynamic';

export default async function HuttenPage() {
  const [settings, cabins] = await Promise.all([getPublicSettings(), getCabins()]);
  return <HuttenContent settings={settings} initialCabins={cabins} />;
}
