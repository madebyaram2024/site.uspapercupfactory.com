import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
    // Basic security gate
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    if (key !== 'secret_reset_123') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const user = await db.user.upsert({
            where: { email: 'admin@uspapercupfactory.com' },
            update: {
                password: hashedPassword,
                role: 'ADMIN'
            },
            create: {
                email: 'admin@uspapercupfactory.com',
                name: 'Admin User',
                password: hashedPassword,
                role: 'ADMIN'
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Admin reset successfully',
            email: user.email,
            hash: hashedPassword.substring(0, 10) + '...'
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
