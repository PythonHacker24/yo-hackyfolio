import { MetadataRoute } from 'next'
import { posts } from './data/posts'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.justaditya.com'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        // Every post is picked up automatically from app/data/posts.ts
        ...posts.map((post) => ({
            url: `${baseUrl}/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ]
}
