const BRAND_GRADIENTS = [
  'from-orange-500 to-amber-500',
  'from-blue-600 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-purple-600 to-pink-600',
  'from-rose-500 to-red-600',
  'from-cyan-500 to-blue-600',
  'from-amber-500 to-orange-600',
  'from-indigo-500 to-violet-600',
  'from-teal-500 to-emerald-600',
  'from-violet-600 to-purple-600',
];

const STOP_WORDS = new Set(['for', 'the', 'and', 'of', 'in', 'by', 'to', 'a', 'an', 'on', 'with']);

export function getMonogram(name: string): string {
  if (!name) return 'EC';

  // Clean special characters and suffixes like " - ", " – ", " (", etc.
  const clean = name.replace(/[–—(\[].*$/, '').trim();
  const words = clean.split(/[\s_-]+/).filter(w => /^[a-zA-Z0-9]/.test(w));

  // If first word is a 2-letter uppercase acronym (e.g., "DS" from "DS Amazon Quick View")
  if (words.length >= 1 && words[0].length === 2 && words[0] === words[0].toUpperCase() && /^[A-Z]{2}$/.test(words[0])) {
    return words[0];
  }

  // Filter for words starting with a letter and not stop words
  const filtered = words.filter(w => /^[a-zA-Z]/.test(w) && !STOP_WORDS.has(w.toLowerCase()));
  const candidateWords = filtered.length >= 2 ? filtered : words.filter(w => /^[a-zA-Z]/.test(w));

  if (candidateWords.length >= 2) {
    return (candidateWords[0][0] + candidateWords[1][0]).toUpperCase();
  }
  if (candidateWords.length === 1) {
    const word = candidateWords[0];
    // Check for CamelCase (e.g., ReviewMeta -> RM, OneTab -> OT)
    const uppers = word.replace(/[^A-Z]/g, '');
    if (uppers.length >= 2) {
      return uppers.slice(0, 2);
    }
    return word.slice(0, 2).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function getMonogramGradient(name: string): string {
  if (!name) return BRAND_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % BRAND_GRADIENTS.length;
  return BRAND_GRADIENTS[index];
}
