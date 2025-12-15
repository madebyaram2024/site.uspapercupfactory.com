
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'admin@uspapercupfactory.com';
    // Hash for 'admin123'
    const hashedPassword = '$2b$10$6GmBqZLY.HjyvCY8SbywHeRhWRc8u7CckiJDNd/3vwcderUMi9iwW';

    console.log('Upserting admin user...');
    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: { role: 'ADMIN', password: hashedPassword },
            create: {
                email,
                name: 'Admin User',
                password: hashedPassword,
                role: 'ADMIN'
            }
        });
        console.log('Admin user ready:', user.email);
    } catch (e) {
        console.error('Error creating admin:', e);
        throw e;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
