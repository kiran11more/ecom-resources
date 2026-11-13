export interface DirectoryResource {
  id: string;
  slug?: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  url: string;
  internalUrl?: string;
  hasDetailPage: boolean;
  badge?: string;
  badgeColor?: string;
  isVerified?: boolean;
  pricing?: 'Free' | 'Freemium' | 'Paid' | 'Promo';
  discountText?: string;
  rating?: number;
  iconName?: string;
  iconDomain?: string;
  tags?: string[];
  targetAudience?: string;
}

// Load resources dynamically from Keystatic content store (src/content/resources/*.json)
// Any edits made in /keystatic immediately reflect across the entire directory
const resourceFiles = import.meta.glob<Record<string, any>>(
  '../content/resources/*.json',
  { eager: true }
);

export const DIRECTORY_RESOURCES: DirectoryResource[] = Object.entries(resourceFiles).map(
  ([filepath, mod]) => {
    const data = (mod as any).default ?? mod;
    const fileSlug = filepath.split('/').pop()?.replace('.json', '') || '';
    const slug = data.slug || fileSlug;
    return {
      id: data.id || slug,
      slug,
      name: data.name,
      category: data.category,
      categorySlug: data.categorySlug,
      description: data.description,
      fullDescription: data.fullDescription || undefined,
      features: Array.isArray(data.features) ? data.features : [],
      url: data.url,
      internalUrl: data.internalUrl || undefined,
      hasDetailPage: Boolean(data.hasDetailPage),
      badge: data.badge || undefined,
      badgeColor: data.badgeColor || undefined,
      isVerified: data.isVerified !== undefined ? Boolean(data.isVerified) : true,
      pricing: data.pricing || 'Free',
      discountText: data.discountText || undefined,
      rating: typeof data.rating === 'number' ? data.rating : 4.8,
      iconName: data.iconName || undefined,
      iconDomain: data.iconDomain || undefined,
      tags: Array.isArray(data.tags) ? data.tags : [],
      targetAudience: data.targetAudience || undefined,
    };
  }
);
