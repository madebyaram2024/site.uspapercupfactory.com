import { getAllRefCodes } from '@/actions/design-ref';
import { requireAdmin } from '@/lib/admin';
import DesignRefManager from '@/components/admin/DesignRefManager';

export default async function DesignRefsPage() {
    await requireAdmin();
    const refs = await getAllRefCodes();

    return <DesignRefManager initialRefs={refs} />;
}
