export interface SubCategory {
  name: string;
  slug: string;
  url?: string;
}

export interface NavCategory {
  name: string;
  slug: string;
  children?: SubCategory[];
}

export interface SidebarSubItem {
  name: string;
  slug: string;
  url?: string;
  badge?: string;
}

export interface SidebarCategory {
  name: string;
  slug: string;
  icon?: string;
  color?: string;
  active?: boolean;
  count?: number;
  items?: SidebarSubItem[];
}

export interface MarketClock {
  name: string;
  shortName?: string;
  code: string;
  flagCode?: string;
  timezone: string;
  flag: string;
  tzAbbr?: string;
  label?: string;
}

export interface CountryMarketplace {
  name: string;
  shortName?: string;
  code: string;
  flagCode?: string;
  domain?: string;
  flag: string;
  url: string;
  bsrUrl: string;
  label?: string;
}

export interface QuickJumpPill {
  name: string;
  slug: string;
  badge?: string;
}

export interface ExchangeRate {
  pair: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
  toFlagCode?: string;
  rate: string;
  numericRate: number;
  change: string;
  isPositive: boolean;
  label: string;
  shortLabel?: string;
  desc?: string;
}

import { type DirectoryResource, DIRECTORY_RESOURCES } from './resources';
export type { DirectoryResource };
export { DIRECTORY_RESOURCES };

export interface BrowserExtension {
  id: string;
  name: string;
  category: 'Amazon Research' | 'Video & Social' | 'Seller Productivity' | 'Scraping & Images';
  description: string;
  chromeUrl: string;
  websiteUrl?: string;
  domain: string;
  rating: number;
  reviewsCount?: string;
  usersCount: string;
  badge?: string;
  badgeColor?: string;
  pricing: 'Free' | 'Freemium' | 'Free Trial' | 'Paid';
  featured?: boolean;
}

export interface DealPlatform {
  id: string;
  name: string;
  platform: string;
  platformType: string;
  targetRegion: 'United States' | 'Europe & UK' | 'Global';
  regionFlag: string;
  trafficMetric: string;
  description: string;
  url: string;
  domain: string;
  badge?: string;
  badgeColor?: string;
  verified?: boolean;
}

// Mapped from Sheet1 of ecomresources - sitemap.xlsx
export const TOP_NAV_CATEGORIES: NavCategory[] = [
  {
    name: 'Store Opening',
    slug: 'store-opening',
    children: [
      { name: 'Amazon Store', slug: 'amazon-store' },
      { name: 'eBay', slug: 'ebay' },
      { name: 'TikTok Shop', slug: 'tiktok' },
    ],
  },
  { name: 'Sourcing', slug: 'sourcing' },
  {
    name: 'Marketing & Advertising',
    slug: 'marketing-advertising',
    children: [
      { name: 'Amazon PPC', slug: 'amazon-ppc' },
      { name: 'Google PPC', slug: 'google-ppc' },
      { name: 'Meta / Facebook PPC', slug: 'meta-facebook-ppc' },
    ],
  },
  {
    name: 'Videos & Social',
    slug: 'videos-social',
    children: [
      { name: 'Influencers', slug: 'influencers' },
      { name: 'UGC Creators', slug: 'ugc-creators' },
      { name: 'Instagram', slug: 'instagram' },
      { name: 'TikTok', slug: 'tiktok-social' },
      { name: 'Twitter / X', slug: 'twitter-x' },
      { name: 'YouTube', slug: 'youtube' },
    ],
  },
  { name: 'Photography', slug: 'photography' },
  { name: 'Website', slug: 'website' },
  { name: 'Warehouse & Logistics', slug: 'warehouse-logistics' },
  { name: 'Accounting', slug: 'accounting' },
  { name: 'Training', slug: 'training' },
  {
    name: 'Legal Services',
    slug: 'legal-services',
    children: [
      { name: 'Trademark', slug: 'trademark-services' },
      { name: 'Legal Compliance', slug: 'legal' },
    ],
  },
  { name: 'Trademark', slug: 'trademark' },
  { name: 'Stock Clearance', slug: 'stock-clearance' },
  { name: 'Guides', slug: 'guides' },
  { name: 'Tools', slug: 'tools' },
];

export const SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    name: 'Product Research',
    slug: 'product-research',
    icon: 'search',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    active: true,
    count: 6,
    items: [
      { name: 'Amazon Best Seller List USA', slug: 'amazon-best-seller-usa', url: 'https://www.amazon.com/gp/bestsellers' },
      { name: 'Amazon Best Seller List UK', slug: 'amazon-best-seller-uk', url: 'https://www.amazon.co.uk/gp/bestsellers' },
      { name: 'Amazon Best Seller List DE', slug: 'amazon-best-seller-de', url: 'https://www.amazon.de/gp/bestsellers' },
      { name: 'Amazon Best Seller List Japan', slug: 'amazon-best-seller-japan', url: 'https://www.amazon.co.jp/gp/bestsellers' },
      { name: 'Amazon Best Seller List CA', slug: 'amazon-best-seller-ca', url: 'https://www.amazon.ca/gp/bestsellers' },
      { name: 'Google Trends', slug: 'google-trends', url: 'https://trends.google.com/trends/' },
    ],
  },
  {
    name: 'Everyday Tools',
    slug: 'everyday-tools',
    icon: 'wrench',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    count: 8,
    items: [
      { name: 'Amazon Revenue Calculator', slug: 'amazon-revenue-calculator', url: 'https://sellercentral.amazon.com/hz/fba/profitabilitycalculator' },
      { name: 'Currency Exchange Rates', slug: 'currency-exchange-rates', url: '#currency-exchange-rates' },
      { name: 'Length / Distance Converter', slug: 'length-distance-converter', url: 'https://www.amz123.com/tools-danwei' },
      { name: 'Temperature Converter', slug: 'temperature-converter', url: 'https://www.amz123.com/tools-wendu' },
      { name: 'Area Converter', slug: 'area-converter', url: 'https://www.amz123.com/tools-mianji' },
      { name: 'Global Time Conversion', slug: 'global-time-conversion', url: 'https://www.amz123.com/tools-timeconversion' },
      { name: 'IP Address Checker', slug: 'ip-address-checker', url: '#ip-address-checker' },
      { name: 'ChatGPT Prompts', slug: 'chatgpt-prompts', url: '#chatgpt-prompts' },
    ],
  },
  {
    name: 'Cross-Border Information',
    slug: 'cross-border-information',
    icon: 'globe',
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    count: 3,
    items: [
      { name: 'Country Codes', slug: 'country-codes', url: 'https://ecomresources.info/country-codes/' },
      { name: 'Global Timezone', slug: 'global-timezone', url: 'https://www.amz123.com/tools-worldtime' },
      { name: 'World Port Codes', slug: 'world-port-codes', url: 'https://ecomresources.info/world-port-codes/' },
    ],
  },
  {
    name: 'Email Marketing',
    slug: 'email-marketing',
    icon: 'mail',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    count: 7,
    items: [
      { name: 'Mailchimp', slug: 'mailchimp', url: 'https://mailchimp.com' },
      { name: 'Sendinblue (Brevo)', slug: 'sendinblue', url: 'https://www.brevo.com' },
      { name: 'Lemlist', slug: 'lemlist', url: 'https://www.lemlist.com' },
      { name: 'ActiveCampaign', slug: 'activecampaign', url: 'https://www.activecampaign.com' },
      { name: 'Drip', slug: 'drip', url: 'https://www.drip.com' },
      { name: 'Constant Contact', slug: 'constant-contact', url: 'https://www.constantcontact.com' },
      { name: 'AWeber', slug: 'aweber', url: 'https://www.aweber.com' },
    ],
  },
  {
    name: 'Advertising Platforms',
    slug: 'advertising-platforms',
    icon: 'megaphone',
    color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    count: 4,
    items: [
      { name: 'Google Ads', slug: 'google-ads', url: 'https://ads.google.com' },
      { name: 'Amazon Ads', slug: 'amazon-ads', url: 'https://advertising.amazon.com' },
      { name: 'Meta Ads', slug: 'meta-ads', url: 'https://www.facebook.com/business/ads' },
      { name: 'Microsoft Ads', slug: 'microsoft-ads', url: 'https://about.ads.microsoft.com' },
    ],
  },
  {
    name: 'Store Opening',
    slug: 'store-opening',
    icon: 'store',
    color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    count: 3,
    items: [
      { name: 'Amazon Store', slug: 'store-amazon', url: 'https://sell.amazon.com' },
      { name: 'eBay Seller Portal', slug: 'store-ebay', url: 'https://www.ebay.com/sl/sell' },
      { name: 'TikTok Shop', slug: 'store-tiktok', url: 'https://seller.tiktok.com' },
    ],
  },
  {
    name: 'Sourcing',
    slug: 'sourcing',
    icon: 'package',
    color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    count: 5,
    items: [
      { name: '1688 Wholesale Factory', slug: 'sourcing-1688', url: 'https://www.1688.com' },
      { name: 'Alibaba.com Global B2B', slug: 'sourcing-alibaba', url: 'https://www.alibaba.com' },
      { name: 'YiwuGo Commodities', slug: 'sourcing-yiwugo', url: 'https://www.yiwugo.com' },
      { name: 'Made-in-China.com', slug: 'sourcing-madeinchina', url: 'https://www.made-in-china.com' },
      { name: 'Global Sources B2B', slug: 'sourcing-globalsources', url: 'https://www.globalsources.com' },
    ],
  },
  {
    name: 'Warehouse & Logistics',
    slug: 'warehouse-logistics',
    icon: 'truck',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    count: 5,
    items: [
      { name: 'Amazon FBA Direct Freight', slug: 'logistics-fba', url: 'https://sellercentral.amazon.com/gp/help/201021820' },
      { name: 'Flexport Digital Freight', slug: 'logistics-flexport', url: 'https://www.flexport.com' },
      { name: 'Freightos Booking', slug: 'logistics-freightos', url: 'https://www.freightos.com' },
      { name: 'ShipBob 3PL Warehousing', slug: 'logistics-shipbob', url: 'https://www.shipbob.com' },
      { name: 'YunExpress Direct Line', slug: 'logistics-yunexpress', url: 'https://www.yunexpress.com' },
    ],
  },
  {
    name: 'Videos & Social',
    slug: 'videos-social',
    icon: 'video',
    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    count: 6,
    items: [
      { name: 'Influencer Discovery (Modash)', slug: 'social-modash', url: 'https://www.modash.io' },
      { name: 'UGC Creators (Billo)', slug: 'social-billo', url: 'https://billo.app' },
      { name: 'Instagram for Business', slug: 'social-instagram', url: 'https://business.instagram.com' },
      { name: 'TikTok Creative Center', slug: 'social-tiktok', url: 'https://ads.tiktok.com/business/creativecenter' },
      { name: 'Twitter / X Business', slug: 'social-twitter', url: 'https://business.x.com' },
      { name: 'YouTube Creator Studio', slug: 'social-youtube', url: 'https://studio.youtube.com' },
    ],
  },
  {
    name: 'Legal Services & Trademark',
    slug: 'legal-services',
    icon: 'scale',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    count: 4,
    items: [
      { name: 'USPTO Trademark Search', slug: 'legal-uspto', url: 'https://www.uspto.gov/trademarks/search' },
      { name: 'Amazon Brand Registry', slug: 'legal-brand-registry', url: 'https://brandservices.amazon.com' },
      { name: 'EUIPO European Trademark', slug: 'legal-euipo', url: 'https://euipo.europa.eu' },
      { name: 'LegalZoom Compliance', slug: 'legal-legalzoom', url: 'https://www.legalzoom.com' },
    ],
  },
  {
    name: 'Accounting',
    slug: 'accounting',
    icon: 'calculator',
    color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    count: 4,
    items: [
      { name: 'QuickBooks Online', slug: 'accounting-quickbooks', url: 'https://quickbooks.intuit.com' },
      { name: 'Xero Cloud Accounting', slug: 'accounting-xero', url: 'https://www.xero.com' },
      { name: 'TaxJar Sales Tax', slug: 'accounting-taxjar', url: 'https://www.taxjar.com' },
      { name: 'Avalara Global VAT', slug: 'accounting-avalara', url: 'https://www.avalara.com' },
    ],
  },
];

export const MARKET_CLOCKS: MarketClock[] = [
  {
    name: 'China',
    shortName: 'China',
    code: 'CN',
    flagCode: 'cn',
    timezone: 'Asia/Shanghai',
    flag: '🇨🇳',
    tzAbbr: 'CST',
    label: 'Beijing • UTC+8',
  },
  {
    name: 'United States',
    shortName: 'USA (EST)',
    code: 'US',
    flagCode: 'us',
    timezone: 'America/New_York',
    flag: '🇺🇸',
    tzAbbr: 'EST',
    label: 'New York • UTC-5',
  },
  {
    name: 'United Kingdom',
    shortName: 'UK (London)',
    code: 'UK',
    flagCode: 'gb',
    timezone: 'Europe/London',
    flag: '🇬🇧',
    tzAbbr: 'GMT',
    label: 'London • UTC+0',
  },
  {
    name: 'European Union',
    shortName: 'EU (CET)',
    code: 'EU',
    flagCode: 'eu',
    timezone: 'Europe/Berlin',
    flag: '🇪🇺',
    tzAbbr: 'CET',
    label: 'Frankfurt • UTC+1',
  },
  {
    name: 'Japan',
    shortName: 'Japan',
    code: 'JP',
    flagCode: 'jp',
    timezone: 'Asia/Tokyo',
    flag: '🇯🇵',
    tzAbbr: 'JST',
    label: 'Tokyo • UTC+9',
  },
  {
    name: 'Australia',
    shortName: 'Australia',
    code: 'AU',
    flagCode: 'au',
    timezone: 'Australia/Sydney',
    flag: '🇦🇺',
    tzAbbr: 'AEST',
    label: 'Sydney • UTC+11',
  },
];

export const COUNTRY_MARKETPLACES: CountryMarketplace[] = [
  { name: 'United States', shortName: 'Amazon US', code: 'US', flagCode: 'us', domain: 'amazon.com', flag: '🇺🇸', url: 'https://www.amazon.com', bsrUrl: 'https://www.amazon.com/gp/bestsellers', label: 'Amazon US' },
  { name: 'United Kingdom', shortName: 'Amazon UK', code: 'UK', flagCode: 'gb', domain: 'amazon.co.uk', flag: '🇬🇧', url: 'https://www.amazon.co.uk', bsrUrl: 'https://www.amazon.co.uk/gp/bestsellers', label: 'Amazon UK' },
  { name: 'Germany', shortName: 'Amazon DE', code: 'DE', flagCode: 'de', domain: 'amazon.de', flag: '🇩🇪', url: 'https://www.amazon.de', bsrUrl: 'https://www.amazon.de/gp/bestsellers', label: 'Amazon DE' },
  { name: 'France', shortName: 'Amazon FR', code: 'FR', flagCode: 'fr', domain: 'amazon.fr', flag: '🇫🇷', url: 'https://www.amazon.fr', bsrUrl: 'https://www.amazon.fr/gp/bestsellers', label: 'Amazon FR' },
  { name: 'Italy', shortName: 'Amazon IT', code: 'IT', flagCode: 'it', domain: 'amazon.it', flag: '🇮🇹', url: 'https://www.amazon.it', bsrUrl: 'https://www.amazon.it/gp/bestsellers', label: 'Amazon IT' },
  { name: 'Spain', shortName: 'Amazon ES', code: 'ES', flagCode: 'es', domain: 'amazon.es', flag: '🇪🇸', url: 'https://www.amazon.es', bsrUrl: 'https://www.amazon.es/gp/bestsellers', label: 'Amazon ES' },
  { name: 'Japan', shortName: 'Amazon JP', code: 'JP', flagCode: 'jp', domain: 'amazon.co.jp', flag: '🇯🇵', url: 'https://www.amazon.co.jp', bsrUrl: 'https://www.amazon.co.jp/gp/bestsellers', label: 'Amazon JP' },
  { name: 'Canada', shortName: 'Amazon CA', code: 'CA', flagCode: 'ca', domain: 'amazon.ca', flag: '🇨🇦', url: 'https://www.amazon.ca', bsrUrl: 'https://www.amazon.ca/gp/bestsellers', label: 'Amazon CA' },
  { name: 'Australia', shortName: 'Amazon AU', code: 'AU', flagCode: 'au', domain: 'amazon.com.au', flag: '🇦🇺', url: 'https://www.amazon.com.au', bsrUrl: 'https://www.amazon.com.au/gp/bestsellers', label: 'Amazon AU' },
];

export const EXCHANGE_RATES: ExchangeRate[] = [
  { pair: 'USD / CNY', from: 'USD', to: 'CNY', fromFlag: '🇺🇸', toFlag: '🇨🇳', toFlagCode: 'cn', rate: '6.6851', numericRate: 6.6851, change: '+0.14%', isPositive: true, label: 'Factory Sourcing', shortLabel: '1688 Factory', desc: '1688 & Yiwu Wholesale' },
  { pair: 'EUR / USD', from: 'EUR', to: 'USD', fromFlag: '🇪🇺', toFlag: '🇺🇸', toFlagCode: 'eu', rate: '1.1068', numericRate: 1.1068, change: '-0.08%', isPositive: false, label: 'EU VAT & Pan-EU', shortLabel: 'Pan-EU VAT', desc: 'Amazon DE/FR/IT/ES' },
  { pair: 'GBP / USD', from: 'GBP', to: 'USD', fromFlag: '🇬🇧', toFlag: '🇺🇸', toFlagCode: 'gb', rate: '1.3242', numericRate: 1.3242, change: '+0.21%', isPositive: true, label: 'UK FBA Revenue', shortLabel: 'UK FBA', desc: 'Amazon UK & HMRC' },
  { pair: 'USD / JPY', from: 'USD', to: 'JPY', fromFlag: '🇺🇸', toFlag: '🇯🇵', toFlagCode: 'jp', rate: '159.80', numericRate: 159.80, change: '+0.35%', isPositive: true, label: 'Amazon Japan', shortLabel: 'Amazon JP', desc: 'JP Marketplace Payout' },
  { pair: 'USD / CAD', from: 'USD', to: 'CAD', fromFlag: '🇺🇸', toFlag: '🇨🇦', toFlagCode: 'ca', rate: '1.3850', numericRate: 1.3850, change: '-0.05%', isPositive: false, label: 'Amazon Canada', shortLabel: 'Amazon CA', desc: 'CA Marketplace' },
  { pair: 'USD / AUD', from: 'USD', to: 'AUD', fromFlag: '🇺🇸', toFlag: '🇦🇺', toFlagCode: 'au', rate: '1.5280', numericRate: 1.5280, change: '+0.12%', isPositive: true, label: 'Australia FBA', shortLabel: 'Amazon AU', desc: 'AU Marketplace' },
  { pair: 'USD / INR', from: 'USD', to: 'INR', fromFlag: '🇺🇸', toFlag: '🇮🇳', toFlagCode: 'in', rate: '84.42', numericRate: 84.42, change: '+0.06%', isPositive: true, label: 'India Sourcing', shortLabel: 'India Hub', desc: 'Textiles & Handicrafts' },
  { pair: 'USD / SGD', from: 'USD', to: 'SGD', fromFlag: '🇺🇸', toFlag: '🇸🇬', toFlagCode: 'sg', rate: '1.3480', numericRate: 1.3480, change: '-0.03%', isPositive: false, label: 'SE Asia Hub', shortLabel: 'Singapore', desc: 'Shopee & Lazada' },
  { pair: 'USD / AED', from: 'USD', to: 'AED', fromFlag: '🇺🇸', toFlag: '🇦🇪', toFlagCode: 'ae', rate: '3.6725', numericRate: 3.6725, change: '0.00%', isPositive: true, label: 'Middle East Hub', shortLabel: 'Dubai FBA', desc: 'Amazon AE & Noon' },
];

export const QUICK_JUMP_PILLS: QuickJumpPill[] = [
  { name: 'All Resources', slug: 'all', badge: '500+' },
  { name: 'Chrome Extensions', slug: 'browser-extensions', badge: 'Hot' },
  { name: 'Deals & Coupons', slug: 'browser-extensions', badge: 'Deals' },
  { name: 'Amazon Best Sellers', slug: 'product-research', badge: 'Hot' },
  { name: 'Revenue Calculator', slug: 'amazon-revenue-calculator' },
  { name: 'Currency Rates', slug: 'currency-exchange-rates' },
  { name: 'Google Trends', slug: 'google-trends' },
  { name: 'World Port Codes', slug: 'world-port-codes' },
  { name: 'Unit Converters', slug: 'measurement-conversion' },
  { name: 'Email Marketing', slug: 'email-marketing' },
  { name: 'Advertising PPC', slug: 'advertising-platforms' },
  { name: 'Country Codes', slug: 'country-codes' },
  { name: 'AI Prompts', slug: 'chatgpt-prompts', badge: 'AI' },
  { name: 'Sourcing Factories', slug: 'sourcing' },
];

// Complete Directory of Resources is defined and maintained in ./resources.ts (re-exported above)

// Recommended Chrome & Browser Extensions (from Sitemap Page 2)
export const RECOMMENDED_EXTENSIONS: BrowserExtension[] = [
  {
    id: 'ext-helium10',
    name: 'Helium 10 Chrome Extension',
    category: 'Amazon Research',
    description: 'The #1 Amazon product research extension: instant Xray sales estimations, ASIN grabber, profit calculator, review insights.',
    chromeUrl: 'https://chromewebstore.google.com/detail/helium-10/njikmgilngallbgfalibfdhehdmgbdnd',
    websiteUrl: 'https://www.helium10.com',
    domain: 'helium10.com',
    rating: 4.8,
    reviewsCount: '12.4k',
    usersCount: '800k+ Users',
    badge: 'Top Pick 🔥',
    badgeColor: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    pricing: 'Freemium',
    featured: true,
  },
  {
    id: 'ext-keepa',
    name: 'Keepa - Amazon Price Tracker',
    category: 'Amazon Research',
    description: 'Detailed price history charts, sales rank drops, Buy Box pricing history, and instant price drop alerts directly on Amazon product pages.',
    chromeUrl: 'https://chromewebstore.google.com/detail/keepa-amazon-price-tracke/neebplgakaahbhdphmkckjjcegoiijjo',
    websiteUrl: 'https://keepa.com',
    domain: 'keepa.com',
    rating: 4.7,
    reviewsCount: '48.9k',
    usersCount: '4M+ Users',
    badge: 'Essential ⭐',
    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    pricing: 'Freemium',
    featured: true,
  },
  {
    id: 'ext-junglescout',
    name: 'Jungle Scout Extension',
    category: 'Amazon Research',
    description: 'Evaluate product opportunities, estimate monthly sales volume, view historical rank, and validate keywords directly inside your browser.',
    chromeUrl: 'https://chromewebstore.google.com/detail/jungle-scout/bgeggkheingbhjlgflngdddmocbcflfd',
    websiteUrl: 'https://www.junglescout.com',
    domain: 'junglescout.com',
    rating: 4.7,
    reviewsCount: '9.2k',
    usersCount: '600k+ Users',
    badge: 'Pro Suite',
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    pricing: 'Paid',
    featured: true,
  },
  {
    id: 'ext-sellersprite',
    name: 'SellerSprite (卖家精灵)',
    category: 'Amazon Research',
    description: 'Leading Amazon seller research tool: reverse ASIN keyword mining, marketplace capacity analysis, keyword trends, and traffic monitor.',
    chromeUrl: 'https://chromewebstore.google.com/detail/sellersprite-amazon-produ/noaahjfedgedfdjfkphbpkcbkfpfnimio',
    websiteUrl: 'https://www.sellersprite.com',
    domain: 'sellersprite.com',
    rating: 4.9,
    reviewsCount: '8.1k',
    usersCount: '500k+ Users',
    badge: 'Hot 🚀',
    badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    pricing: 'Freemium',
    featured: true,
  },
  {
    id: 'ext-amzscout',
    name: 'AMZScout PRO Extension',
    category: 'Amazon Research',
    description: 'Calculate product profitability, view historical trends, analyze competitor inventory levels, and check niche opportunity scores.',
    chromeUrl: 'https://chromewebstore.google.com/detail/amzscout-pro-for-amazon/hcmgjikjhjgejdfdhfbpkcbkfpfnimio',
    websiteUrl: 'https://amzscout.net',
    domain: 'amzscout.net',
    rating: 4.6,
    reviewsCount: '5.5k',
    usersCount: '300k+ Users',
    badge: 'Popular',
    badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    pricing: 'Freemium',
  },
  {
    id: 'ext-sellerise',
    name: 'Sellerise - Amazon Automation',
    category: 'Amazon Research',
    description: 'Automated review requester, keyword tracker, Buy Box monitoring, and FBA reimbursement auditor for scaling Amazon brands.',
    chromeUrl: 'https://chromewebstore.google.com/detail/sellerise/hlnffpjkfkeblflcgnmopkdfgkmhphoo',
    websiteUrl: 'https://sellerise.com',
    domain: 'sellerise.com',
    rating: 4.8,
    reviewsCount: '1.2k',
    usersCount: '70k+ Users',
    badge: 'Automation',
    badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    pricing: 'Free Trial',
  },
  {
    id: 'ext-reviewmeta',
    name: 'ReviewMeta - Review Checker',
    category: 'Amazon Research',
    description: 'Identifies fake, paid, and incentivized Amazon reviews by analyzing reviewer history, word count patterns, and suspicious velocity.',
    chromeUrl: 'https://chromewebstore.google.com/detail/reviewmeta-amazon-review/fkmbalmgacglmfomggalhliffnacjdnj',
    websiteUrl: 'https://reviewmeta.com',
    domain: 'reviewmeta.com',
    rating: 4.5,
    reviewsCount: '3.8k',
    usersCount: '200k+ Users',
    badge: 'Review Audit',
    badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    pricing: 'Free',
  },
  {
    id: 'ext-dsquickview',
    name: 'DS Amazon Quick View',
    category: 'Amazon Research',
    description: 'Adds Amazon BSR ranking, Sold by Amazon indicators, and seller count directly on search results without opening each product listing.',
    chromeUrl: 'https://chromewebstore.google.com/detail/ds-amazon-quick-view/jipdnfibhldikgcjhfnomkfpcebammhp',
    websiteUrl: 'https://dsquickview.com',
    domain: 'dsquickview.com',
    rating: 4.6,
    reviewsCount: '4.2k',
    usersCount: '400k+ Users',
    badge: 'Fast BSR',
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    pricing: 'Freemium',
  },
  {
    id: 'ext-fbacalc',
    name: 'Amazon FBA Revenue Calculator',
    category: 'Amazon Research',
    description: 'Instant profit margin calculations, Amazon referral and fulfillment fees per unit based on product weight and dimensional tiers.',
    chromeUrl: 'https://sellercentral.amazon.com/hz/fba/profitabilitycalculator/index',
    websiteUrl: 'https://sellercentral.amazon.com',
    domain: 'amazon.com',
    rating: 4.8,
    reviewsCount: '25.0k',
    usersCount: '1M+ Users',
    badge: 'Official Amazon',
    badgeColor: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    pricing: 'Free',
  },
  {
    id: 'ext-fakespot',
    name: 'Fakespot - Fake Review Detector',
    category: 'Amazon Research',
    description: 'AI-powered review grade analysis for Amazon, eBay, Best Buy, and Shopify stores to protect against counterfeit listings.',
    chromeUrl: 'https://chromewebstore.google.com/detail/fakespot-fake-reviews-and/nakplnnackehceedgkgkokbgbmfghain',
    websiteUrl: 'https://www.fakespot.com',
    domain: 'fakespot.com',
    rating: 4.4,
    reviewsCount: '6.7k',
    usersCount: '700k+ Users',
    badge: 'AI Guard',
    badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    pricing: 'Free',
  },
  {
    id: 'ext-instantdatascraper',
    name: 'Instant Data Scraper',
    category: 'Scraping & Images',
    description: 'Automated tabular data scraping from Amazon search results, 1688 catalogs, and supplier pages with 1-click CSV and Excel export.',
    chromeUrl: 'https://chromewebstore.google.com/detail/instant-data-scraper/ofaokhiedipichpaobibbnahnkdoiiah',
    websiteUrl: 'https://screenscraper.io',
    domain: 'screenscraper.io',
    rating: 4.8,
    reviewsCount: '4.6k',
    usersCount: '700k+ Users',
    badge: 'AI Scraper',
    badgeColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
    pricing: 'Free',
    featured: true,
  },
  {
    id: 'ext-aliprice',
    name: 'AliPrice 1688 Image Search',
    category: 'Scraping & Images',
    description: 'Right-click any Amazon or eBay product image to instantly find identical factory suppliers, wholesale prices, and MOQ on 1688.com.',
    chromeUrl: 'https://chromewebstore.google.com/detail/aliprice-price-tracker-fo/haighhhcljplpeccocofhkmlbdblfcda',
    websiteUrl: 'https://www.aliprice.com',
    domain: 'aliprice.com',
    rating: 4.6,
    reviewsCount: '3.1k',
    usersCount: '400k+ Users',
    badge: '1688 Finder',
    badgeColor: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    pricing: 'Free',
  },
  {
    id: 'ext-fatkun',
    name: 'Fatkun Batch Image Downloader',
    category: 'Scraping & Images',
    description: 'Batch download high-resolution main images, infographics, and customer review buyer pictures from 1688, Taobao, and Amazon.',
    chromeUrl: 'https://chromewebstore.google.com/detail/fatkun-batch-download-ima/nnjjahlikiabaddflfacpmclhhapnncm',
    websiteUrl: 'https://fatkun.com',
    domain: 'fatkun.com',
    rating: 4.7,
    reviewsCount: '15.3k',
    usersCount: '800k+ Users',
    badge: 'Batch Download',
    badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    pricing: 'Free',
  },
  {
    id: 'ext-onetab',
    name: 'OneTab Workspace Manager',
    category: 'Seller Productivity',
    description: 'Convert 100+ open Amazon research and competitor tabs into a structured list, saving 95% memory and organizing sourcing folders.',
    chromeUrl: 'https://chromewebstore.google.com/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall',
    websiteUrl: 'https://www.one-tab.com',
    domain: 'one-tab.com',
    rating: 4.6,
    reviewsCount: '21.0k',
    usersCount: '2M+ Users',
    badge: 'Productivity',
    badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    pricing: 'Free',
  },
  {
    id: 'ext-bitly',
    name: 'Bitly - Short Links & QR',
    category: 'Seller Productivity',
    description: 'Create branded short tracking links and QR codes for Amazon super URLs, influencer referral links, and packaging inserts.',
    chromeUrl: 'https://chromewebstore.google.com/detail/bitly-powerful-short-link/iilflkcnfgcdalngoppgoclnmkmfcpcg',
    websiteUrl: 'https://bitly.com',
    domain: 'bitly.com',
    rating: 4.3,
    reviewsCount: '2.5k',
    usersCount: '500k+ Users',
    badge: 'Link Tracking',
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    pricing: 'Freemium',
  },
  {
    id: 'ext-grammarly',
    name: 'Grammarly - AI Listing Writing',
    category: 'Seller Productivity',
    description: 'Polish Amazon listing bullet points, customer service email responses, and ad copywriting with automated grammar checking.',
    chromeUrl: 'https://chromewebstore.google.com/detail/grammarly-ai-writing-and/kbfnbcaeplbcioakkpcpgfkobkghlhen',
    websiteUrl: 'https://www.grammarly.com',
    domain: 'grammarly.com',
    rating: 4.7,
    reviewsCount: '44.0k',
    usersCount: '10M+ Users',
    badge: 'Writing AI',
    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    pricing: 'Freemium',
  },
  {
    id: 'ext-tubebuddy',
    name: 'TubeBuddy for YouTube SEO',
    category: 'Video & Social',
    description: 'Comprehensive YouTube SEO optimization, video tag explorer, competitor channel audit, and bulk video metadata updates.',
    chromeUrl: 'https://chromewebstore.google.com/detail/tubebuddy/mhkhmbddkadjggaglhhmmnfflngihoci',
    websiteUrl: 'https://www.tubebuddy.com',
    domain: 'tubebuddy.com',
    rating: 4.6,
    reviewsCount: '7.8k',
    usersCount: '1M+ Users',
    badge: 'YouTube SEO',
    badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    pricing: 'Freemium',
  },
  {
    id: 'ext-vidiq',
    name: 'vidIQ Vision for Video Rank',
    category: 'Video & Social',
    description: 'Discover trending video topics, inspect competitor engagement rates, uncover viral influencer keywords, and rank higher on YouTube.',
    chromeUrl: 'https://chromewebstore.google.com/detail/vidiq-vision-for-youtube/pkedcjkdefgpdelpbcmbmeomcjbeemfm',
    websiteUrl: 'https://vidiq.com',
    domain: 'vidiq.com',
    rating: 4.6,
    reviewsCount: '10.5k',
    usersCount: '2M+ Users',
    badge: 'Viral Trends',
    badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    pricing: 'Freemium',
    featured: true,
  },
  {
    id: 'ext-socialblade',
    name: 'Social Blade Stats Overlay',
    category: 'Video & Social',
    description: 'Direct overlay on YouTube, Twitch, Twitter/X, and Instagram showing channel subscriber growth, estimated earnings, and grade.',
    chromeUrl: 'https://chromewebstore.google.com/detail/social-blade/flhkekipgkfhcoegfcflamikbkebcmno',
    websiteUrl: 'https://socialblade.com',
    domain: 'socialblade.com',
    rating: 4.4,
    reviewsCount: '3.3k',
    usersCount: '300k+ Users',
    badge: 'Influencer Data',
    badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    pricing: 'Free',
  },
  {
    id: 'ext-wordtracker',
    name: 'Wordtracker Scout',
    category: 'Video & Social',
    description: 'Instant keyword discovery from competitor web pages and e-commerce product pages with relevance and search volume metrics.',
    chromeUrl: 'https://chromewebstore.google.com/detail/wordtracker-scout/fbcgkmmbghnkfdkjiknbpcddhhfkadld',
    websiteUrl: 'https://www.wordtracker.com',
    domain: 'wordtracker.com',
    rating: 4.3,
    reviewsCount: '1.1k',
    usersCount: '80k+ Users',
    badge: 'Keywords',
    badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    pricing: 'Free',
  },
  {
    id: 'ext-crowdtangle',
    name: 'CrowdTangle Link Checker',
    category: 'Video & Social',
    description: 'Track how URLs, products, and articles are shared across Facebook, Instagram, and Reddit to measure social virality.',
    chromeUrl: 'https://chromewebstore.google.com/detail/crowdtangle-link-checker/ingebnljmblhedihjllafifahdihaapb',
    websiteUrl: 'https://www.crowdtangle.com',
    domain: 'crowdtangle.com',
    rating: 4.5,
    reviewsCount: '950',
    usersCount: '100k+ Users',
    badge: 'Social Virality',
    badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    pricing: 'Free',
  },
  {
    id: 'ext-sellerapp',
    name: 'SellerApp Chrome Extension',
    category: 'Amazon Research',
    description: 'Analyze Amazon listing quality score, estimated revenue, keyword distribution, and PPC bid estimates directly from product pages.',
    chromeUrl: 'https://chromewebstore.google.com/detail/sellerapp-amazon-seller-t/pnipbcoebmnddnhkigbgdfcfjphkjolh',
    websiteUrl: 'https://www.sellerapp.com',
    domain: 'sellerapp.com',
    rating: 4.5,
    reviewsCount: '1.4k',
    usersCount: '60k+ Users',
    badge: 'PPC & Listing',
    badgeColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
    pricing: 'Freemium',
  },
];

// Off-Site Deals & Clearance Promotion Platforms (from Sitemap Page 2 "Deals平台")
export const OFFSITE_DEAL_PLATFORMS: DealPlatform[] = [
  // 1. United States Deals Platforms
  {
    id: 'deal-slickdeals',
    name: 'Slickdeals Community Launchpad',
    platform: 'Slickdeals',
    platformType: 'Community Deal Forum',
    targetRegion: 'United States',
    regionFlag: '🇺🇸',
    trafficMetric: '65M+ Monthly Visits',
    description: 'The #1 community-driven shopping deal portal in the US. Essential for Amazon product launch velocity, frontpage deals, and clearance liquidation.',
    url: 'https://slickdeals.net',
    domain: 'slickdeals.net',
    badge: 'US #1 Deals 🔥',
    badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    verified: true,
  },
  {
    id: 'deal-dealnews',
    name: 'DealNews Editorial Syndication',
    platform: 'DealNews',
    platformType: 'Editorial Syndication',
    targetRegion: 'United States',
    regionFlag: '🇺🇸',
    trafficMetric: '15M+ Shoppers',
    description: 'High-traffic consumer shopping news network reaching 15M+ monthly shoppers for consumer electronics, apparel, and home kitchen deals.',
    url: 'https://www.dealnews.com',
    domain: 'dealnews.com',
    badge: 'Editorial Reach',
    badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    verified: true,
  },
  {
    id: 'deal-vipon',
    name: 'Vipon Amazon Promo & Coupon Club',
    platform: 'Vipon',
    platformType: 'Amazon Buyer Club',
    targetRegion: 'Global',
    regionFlag: '🌐',
    trafficMetric: '3M+ Amazon Shoppers',
    description: 'Dedicated Amazon buyer discount portal allowing sellers to distribute 50%+ off promo codes to boost organic listing search velocity and sales.',
    url: 'https://www.vipon.com',
    domain: 'vipon.com',
    badge: 'Seller Friendly',
    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    verified: true,
  },
  {
    id: 'deal-rebatekey',
    name: 'RebateKey Direct Buyer Cashback',
    platform: 'RebateKey',
    platformType: 'Cashback Rebates',
    targetRegion: 'United States',
    regionFlag: '🇺🇸',
    trafficMetric: 'Verified US Buyers',
    description: 'Connect with verified shoppers who purchase your full-price products on Amazon, Walmart, or Etsy and receive direct escrow rebates.',
    url: 'https://rebatekey.com',
    domain: 'rebatekey.com',
    badge: 'Direct Rebates',
    badgeColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
    verified: true,
  },
  {
    id: 'deal-bradsdeals',
    name: "Brad's Deals Curated Promotions",
    platform: "Brad's Deals",
    platformType: 'Curated Newsletters',
    targetRegion: 'United States',
    regionFlag: '🇺🇸',
    trafficMetric: '5M+ Newsletter Subs',
    description: 'Hand-picked discounts tested by consumer shopping editors with massive daily email newsletter syndication across North America.',
    url: 'https://www.bradsdeals.com',
    domain: 'bradsdeals.com',
    badge: 'Editorial Pick',
    badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    verified: true,
  },
  {
    id: 'deal-dealam',
    name: 'DealAM Bilingual Deal Portal',
    platform: 'DealAM',
    platformType: 'Bilingual Deal Network',
    targetRegion: 'United States',
    regionFlag: '🇺🇸',
    trafficMetric: 'Chinese-American Reach',
    description: "North America's top Chinese-language shopping guide and bargain aggregator for cross-border e-commerce brands, cookware, and electronics.",
    url: 'https://www.dealam.com',
    domain: 'dealam.com',
    badge: 'Cross-Border',
    badgeColor: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    verified: true,
  },
  {
    id: 'deal-techbargains',
    name: 'TechBargains Consumer Electronics',
    platform: 'TechBargains',
    platformType: 'Tech & Gadget Deals',
    targetRegion: 'United States',
    regionFlag: '🇺🇸',
    trafficMetric: '4M+ Tech Buyers',
    description: 'Premier deal aggregator for consumer electronics, computer accessories, smart home gear, and office equipment promotions.',
    url: 'https://www.techbargains.com',
    domain: 'techbargains.com',
    badge: 'Tech Focus',
    badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    verified: true,
  },
  {
    id: 'deal-bensbargains',
    name: "Ben's Bargains Price Tracker",
    platform: "Ben's Bargains",
    platformType: 'Price Drop Aggregator',
    targetRegion: 'United States',
    regionFlag: '🇺🇸',
    trafficMetric: 'Deal Hunters',
    description: 'Editor-curated shopping deal site tracking historical price drops on electronics, tools, apparel, and outdoor goods across major retailers.',
    url: 'https://bensbargains.com',
    domain: 'bensbargains.com',
    badge: 'Price Drops',
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    verified: true,
  },
  {
    id: 'deal-woot',
    name: 'Woot! Daily Deals (Amazon Subsidiary)',
    platform: 'Woot!',
    platformType: 'Flash Sales & Clearance',
    targetRegion: 'United States',
    regionFlag: '🇺🇸',
    trafficMetric: 'Amazon Subsidiary',
    description: 'Amazon-owned original daily deals site offering limited-time blowout sales, clearance liquidation, and vendor clearance promotions.',
    url: 'https://www.woot.com',
    domain: 'woot.com',
    badge: 'Official Amazon',
    badgeColor: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    verified: true,
  },

  // 2. Europe & UK Deal Platforms
  {
    id: 'deal-hotukdeals',
    name: 'HotUKDeals Community UK',
    platform: 'HotUKDeals',
    platformType: 'Community Deal Forum',
    targetRegion: 'Europe & UK',
    regionFlag: '🇬🇧',
    trafficMetric: 'UK #1 Deals (20M+ Visits)',
    description: "The United Kingdom's largest consumer deal sharing community for Amazon.co.uk, eBay UK, and European seller product launches.",
    url: 'https://www.hotukdeals.com',
    domain: 'hotukdeals.com',
    badge: 'UK Market 🇬🇧',
    badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    verified: true,
  },
  {
    id: 'deal-mydealz',
    name: 'MyDealz Germany & EU Launchpad',
    platform: 'MyDealz',
    platformType: 'Community Deal Forum',
    targetRegion: 'Europe & UK',
    regionFlag: '🇩🇪',
    trafficMetric: 'Germany #1 (30M+ Visits)',
    description: "Europe's largest social shopping community for Amazon.de and Central Europe, driving enormous purchase volume for EU launches.",
    url: 'https://www.mydealz.de',
    domain: 'mydealz.de',
    badge: 'Germany #1 🇩🇪',
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    verified: true,
  },
  {
    id: 'deal-dealabs',
    name: 'Dealabs France Deal Network',
    platform: 'Dealabs',
    platformType: 'Community Deal Forum',
    targetRegion: 'Europe & UK',
    regionFlag: '🇫🇷',
    trafficMetric: 'France #1 (18M+ Visits)',
    description: "France's primary consumer bargain network for Amazon.fr product promotions, flash vouchers, and high-velocity consumer launches.",
    url: 'https://www.dealabs.com',
    domain: 'dealabs.com',
    badge: 'France #1 🇫🇷',
    badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    verified: true,
  },
];

// Alias for backwards compatibility
export const SELLER_DEALS = OFFSITE_DEAL_PLATFORMS;
