import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
    // Security gate: only allowing this specific check
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    if (key !== 'verify_me_123') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await db.user.findUnique({
            where: { email: 'admin@uspapercupfactory.com' }
        });

        if (!user) {
            return NextResponse.json({ status: 'FAIL', reason: 'User not found in DB' }, { status: 404 });
        }

        const isValid = await bcrypt.compare('admin123', user.password || ''); // Handle null password

        if (isValid) {
            return NextResponse.json({ status: 'SUCCESS', message: 'Password is correct (admin123)' });
        } else {
            return NextResponse.json({
                status: 'FAIL',
                reason: 'Hash mismatch',
                storedHashPrefix: user.password?.substring(0, 10)
            }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
