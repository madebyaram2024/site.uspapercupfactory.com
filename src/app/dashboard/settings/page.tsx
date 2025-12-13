
import { auth } from "@/../auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function updateProfile(formData: FormData) {
    'use server';
    const session = await auth();
    if (!session?.user?.id) return;

    const name = formData.get('name') as string;

    await db.user.update({
        where: { id: session.user.id },
        data: { name }
    });

    revalidatePath('/dashboard/settings');
}

export default async function SettingsPage() {
    const session = await auth();
    const user = session?.user;

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Account Settings</h1>

            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
                <form action={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
                        <input disabled value={user?.email || ''} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #eee', background: '#f9f9f9', color: '#666' }} />
                        <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '4px' }}>Email cannot be changed.</div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name</label>
                        <input name="name" defaultValue={user?.name || ''} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
                </form>
            </div>
        </div>
    );
}
