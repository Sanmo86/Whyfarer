// tools/meta.js
// Locale-independent metadata for each article: slug, category, flag, hero image.
// Order here defines the canonical order used to zip together content.en.js / content.es.js.
'use strict';

const META = [
  { slug: 'japan-nose-blowing',        category: 'asia',     flag: '🇯🇵', hero: 'assets/img/japon.jpg' },
  { slug: 'india-sacred-cow',          category: 'asia',     flag: '🇮🇳', hero: 'assets/img/india.jpg' },
  { slug: 'finland-sauna-queue',       category: 'europe',   flag: '🇫🇮', hero: 'assets/img/finlandia.jpg' },
  { slug: 'south-korea-age-system',    category: 'asia',     flag: '🇰🇷', hero: 'assets/img/corea.jpg' },
  { slug: 'france-restaurant-bill',    category: 'europe',   flag: '🇫🇷', hero: 'assets/img/francia.jpg' },
  { slug: 'mexico-day-of-the-dead',    category: 'americas', flag: '🇲🇽', hero: 'assets/img/mexico.jpg' },
  { slug: 'netherlands-no-curtains',   category: 'europe',   flag: '🇳🇱', hero: 'assets/img/holanda.jpg' },
  { slug: 'thailand-sacred-head',      category: 'asia',     flag: '🇹🇭', hero: 'assets/img/tailandia.jpg' },
  { slug: 'germany-splitting-bills',   category: 'europe',   flag: '🇩🇪', hero: 'assets/img/alemania.jpg' },
  { slug: 'ethiopia-calendar',         category: 'africa',   flag: '🇪🇹', hero: 'assets/img/etiopia.jpg' },
  { slug: 'italy-cappuccino-rule',     category: 'europe',   flag: '🇮🇹', hero: 'assets/img/italia.jpg' },
  { slug: 'norway-babies-outside',     category: 'europe',   flag: '🇳🇴', hero: 'assets/img/noruega.jpg' },
  { slug: 'china-number-four',         category: 'asia',     flag: '🇨🇳', hero: 'assets/img/china.jpg' },
  { slug: 'argentina-mate-sharing',    category: 'americas', flag: '🇦🇷', hero: 'assets/img/argentina.jpg' },
  { slug: 'bhutan-happiness-index',    category: 'asia',     flag: '🇧🇹', hero: 'assets/img/butan.jpg' },
  { slug: 'russia-no-smiling',         category: 'europe',   flag: '🇷🇺', hero: 'assets/img/rusia.jpg' },
  { slug: 'portugal-codfish',          category: 'europe',   flag: '🇵🇹', hero: 'assets/img/portugal.jpg' },
  { slug: 'philippines-big-families',  category: 'asia',     flag: '🇵🇭', hero: 'assets/img/filipinas.jpg' },
  { slug: 'switzerland-punctual-trains', category: 'europe', flag: '🇨🇭', hero: 'assets/img/suiza.jpg' },
  { slug: 'morocco-haggling',          category: 'africa',   flag: '🇲🇦', hero: 'assets/img/marruecos.jpg' },
  { slug: 'iceland-no-surnames',       category: 'europe',   flag: '🇮🇸', hero: 'assets/img/islandia.jpg' },
  { slug: 'greece-breaking-plates',    category: 'europe',   flag: '🇬🇷', hero: 'assets/img/grecia.jpg' },
  { slug: 'singapore-chewing-gum-ban', category: 'asia',     flag: '🇸🇬', hero: 'assets/img/singapur.jpg' },
  { slug: 'peru-guinea-pig',           category: 'americas', flag: '🇵🇪', hero: 'assets/img/peru.jpg' },
  { slug: 'sweden-fika',               category: 'europe',   flag: '🇸🇪', hero: 'assets/img/suecia.jpg' }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { META };
}
