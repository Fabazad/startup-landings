import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { NotFoundView, View500 } from "src/sections/error";
import { getWishQuery } from "../../queries/wish";
import { WishDetail } from "./WishDetail";
import { getAuthUser } from "src/auth/getAuthUser";

// ----------------------------------------------------------------------

export async function generateMetadata({ params }: { params: { wishId: number } }): Promise<Metadata> {
    const wishResult = await getWishQuery(params.wishId);

    if (!wishResult.success || !wishResult.wish) {
        return {
            title: 'Wish Not Found',
            description: 'The requested wish could not be found.',
        };
    }

    const wish = wishResult.wish;
    const headersList = await headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
    const protocol = headersList.get('x-forwarded-proto') || 'https';
    const baseUrl = `${protocol}://${host}`;
    const currentUrl = `${baseUrl}/envy/wish/${params.wishId}`;

    // Use first image or fallback
    const imageUrl = wish.imageUrls?.[0] || wish.imageUrl || `${baseUrl}/assets/images/placeholder.jpg`;

    const title = `${wish.name} - Wish Details`;
    const description = wish.description
        ? wish.description.substring(0, 160)
        : `View details for ${wish.name}${wish.price ? ` - €${wish.price}` : ''}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: currentUrl,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: wish.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
        alternates: {
            canonical: currentUrl,
        },
    };
}

export default async function WishPage({ params }: { params: { wishId: number } }) {

    const [wishResult, userResult] = await Promise.all([
        getWishQuery(params.wishId),
        getAuthUser()
    ]);

    if (!wishResult.success || !userResult.success) return <View500 />;
    const wish = wishResult.wish;
    const user = userResult.user;
    if (!wish) return <NotFoundView />;

    // Add Product schema structured data
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: wish.name,
        description: wish.description || wish.name,
        ...(wish.imageUrls?.[0] || wish.imageUrl ? {
            image: wish.imageUrls?.[0] || wish.imageUrl,
        } : {}),
        ...(wish.price ? {
            offers: {
                '@type': 'Offer',
                price: wish.price,
                priceCurrency: 'EUR',
                availability: wish.bookedByUser || wish.bookedByName
                    ? 'https://schema.org/OutOfStock'
                    : 'https://schema.org/InStock',
            },
        } : {}),
        ...(wish.productUrl ? {
            url: wish.productUrl,
        } : {}),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <WishDetail wish={wish} user={user || undefined} />
        </>
    );
}