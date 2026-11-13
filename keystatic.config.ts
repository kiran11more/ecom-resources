import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'kiran11more/ecom-resources',
      },
  collections: {
    resources: collection({
      label: 'Directory Resources',
      slugField: 'slug',
      path: 'src/content/resources/*',
      format: { data: 'json' },
      schema: {
        id: fields.text({ label: 'ID' }),
        slug: fields.slug({ name: { label: 'Slug (URL Identifier)' } }),
        name: fields.text({ label: 'Resource Name', validation: { length: { min: 1 } } }),
        category: fields.text({ label: 'Category Name', validation: { length: { min: 1 } } }),
        categorySlug: fields.text({ label: 'Category Slug', validation: { length: { min: 1 } } }),
        description: fields.text({ label: 'Card Short Description', multiline: true, validation: { length: { min: 1 } } }),
        fullDescription: fields.text({ label: 'Full Description / In-Depth Review', multiline: true }),
        features: fields.array(fields.text({ label: 'Feature Bullet Point' }), {
          label: 'Key Features & Capabilities',
          itemLabel: (props) => props.value || 'Feature',
        }),
        url: fields.url({ label: 'External Official URL', validation: { isRequired: true } }),
        internalUrl: fields.text({ label: 'Internal Tool Route (e.g. /tools/amazon-revenue-calculator)' }),
        hasDetailPage: fields.checkbox({
          label: 'Generate Dedicated Detail Page',
          description: 'Set to true for vetted platforms/SaaS; false for direct external shortcuts and social links.',
          defaultValue: false,
        }),
        badge: fields.text({ label: 'Badge Label (e.g. "Direct OEM", "Trade Assurance")' }),
        badgeColor: fields.text({ label: 'Badge Style Classes' }),
        isVerified: fields.checkbox({ label: 'Verified Cross-Border Partner', defaultValue: true }),
        pricing: fields.select({
          label: 'Pricing Model',
          options: [
            { label: 'Free', value: 'Free' },
            { label: 'Freemium', value: 'Freemium' },
            { label: 'Paid', value: 'Paid' },
            { label: 'Promo', value: 'Promo' },
          ],
          defaultValue: 'Free',
        }),
        discountText: fields.text({ label: 'Discount / Promo Text' }),
        rating: fields.number({ label: 'Star Rating', defaultValue: 4.8 }),
        iconName: fields.text({ label: 'Icon Identifier' }),
      },
    }),
  },
});
