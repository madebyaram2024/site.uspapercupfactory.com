import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/dashboard/', '/portal/'],
        },
        sitemap: 'https://uspapercupfactory.com/sitemap.xml',
    }
}
