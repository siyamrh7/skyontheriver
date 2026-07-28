import { getPublicSettings, getCabins } from '../../../../lib/queries';
import PriceSettingsForm from '../../../../components/admin/PriceSettingsForm';

export const dynamic = 'force-dynamic';

export default async function InstellingenPage() {
  const [settings, cabins] = await Promise.all([getPublicSettings(), getCabins()]);
  return <PriceSettingsForm initialSettings={settings} initialCabins={cabins} />;
}
