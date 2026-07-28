import { getPublicSettings } from '../../../../lib/queries';
import ProgrammaEditor from '../../../../components/admin/ProgrammaEditor';

export const dynamic = 'force-dynamic';

export default async function ProgrammaAdminPage() {
  const settings = await getPublicSettings();
  return <ProgrammaEditor initialProgramma={settings.programma} />;
}
