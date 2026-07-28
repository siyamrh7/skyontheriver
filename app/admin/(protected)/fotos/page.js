import { getAdminPhotoSlots } from '../../../../lib/queries';
import PhotoSlotEditor from '../../../../components/admin/PhotoSlotEditor';

export const dynamic = 'force-dynamic';

export default async function FotosPage() {
  const { slots, library } = await getAdminPhotoSlots();
  return <PhotoSlotEditor initialSlots={slots} library={library} />;
}
