// tools/inline-images.js
// A second, mid-article photo per piece (the hero image is in meta.js).
// Bilingual alt text lives here since it's the only locale-specific part;
// the file itself and its credits.json entry are shared across EN/ES.
'use strict';

const INLINE_IMAGES = {
  'japan-nose-blowing':        { file: 'assets/img/japon2.jpg',      alt: { en: 'Commuters in a crowded street in Japan', es: 'Viajeros en una calle concurrida de Japón' } },
  'india-sacred-cow':          { file: 'assets/img/india2.jpg',      alt: { en: 'A cow near a temple in India', es: 'Una vaca cerca de un templo en India' } },
  'finland-sauna-queue':       { file: 'assets/img/finlandia2.jpg',  alt: { en: 'Hot stones on a traditional sauna stove', es: 'Piedras calientes sobre una estufa de sauna tradicional' } },
  'south-korea-age-system':    { file: 'assets/img/corea2.jpg',      alt: { en: 'A family spending time together in South Korea', es: 'Una familia pasando tiempo junta en Corea del Sur' } },
  'france-restaurant-bill':    { file: 'assets/img/francia2.jpg',    alt: { en: 'A waiter serving a table at a French restaurant', es: 'Un camarero sirviendo una mesa en un restaurante francés' } },
  'mexico-day-of-the-dead':    { file: 'assets/img/mexico2.jpg',     alt: { en: 'A decorative calavera skull for Día de Muertos', es: 'Una calavera decorativa del Día de Muertos' } },
  'netherlands-no-curtains':   { file: 'assets/img/holanda2.jpg',    alt: { en: 'A lit window in a Dutch house at night', es: 'Una ventana iluminada en una casa holandesa de noche' } },
  'thailand-sacred-head':      { file: 'assets/img/tailandia2.jpg',  alt: { en: 'A Buddhist monk collecting alms in Thailand', es: 'Un monje budista recogiendo limosnas en Tailandia' } },
  'germany-splitting-bills':   { file: 'assets/img/alemania2.jpg',   alt: { en: 'Friends toasting at a German beer garden', es: 'Amigos brindando en un jardín de cerveza alemán' } },
  'ethiopia-calendar':         { file: 'assets/img/etiopia2.jpg',    alt: { en: 'An Ethiopian Orthodox priest at a church', es: 'Un sacerdote ortodoxo etíope en una iglesia' } },
  'italy-cappuccino-rule':     { file: 'assets/img/italia2.jpg',     alt: { en: 'A barista preparing coffee at an Italian espresso bar', es: 'Un barista preparando café en un bar italiano' } },
  'norway-babies-outside':     { file: 'assets/img/noruega2.jpg',    alt: { en: 'A snow-covered forest in the Nordic winter', es: 'Un bosque nevado en el invierno nórdico' } },
  'china-number-four':         { file: 'assets/img/china2.jpg',      alt: { en: 'Red lanterns during a festival in China', es: 'Farolillos rojos durante un festival en China' } },
  'argentina-mate-sharing':    { file: 'assets/img/argentina2.jpg',  alt: { en: 'A gaucho on the Argentine pampas', es: 'Un gaucho en la pampa argentina' } },
  'bhutan-happiness-index':    { file: 'assets/img/butan2.jpg',      alt: { en: 'A monk near a monastery in the mountains of Bhutan', es: 'Un monje cerca de un monasterio en las montañas de Bután' } },
  'russia-no-smiling':         { file: 'assets/img/rusia2.jpg',      alt: { en: 'A snowy street in Moscow in winter', es: 'Una calle nevada en Moscú en invierno' } },
  'portugal-codfish':          { file: 'assets/img/portugal2.jpg',   alt: { en: 'Fishing boats in a harbor in Lisbon', es: 'Barcos de pesca en un puerto de Lisboa' } },
  'philippines-big-families':  { file: 'assets/img/filipinas2.jpg',  alt: { en: 'A family celebration in the Philippines', es: 'Una celebración familiar en Filipinas' } },
  'switzerland-punctual-trains': { file: 'assets/img/suiza2.jpg',    alt: { en: 'A platform at a Swiss train station', es: 'Un andén en una estación de tren suiza' } },
  'morocco-haggling':          { file: 'assets/img/marruecos2.jpg',  alt: { en: 'Colorful spices at a market in Marrakech', es: 'Especias de colores en un mercado de Marrakech' } },
  'iceland-no-surnames':       { file: 'assets/img/islandia2.jpg',   alt: { en: 'A waterfall in the Icelandic landscape', es: 'Una cascada en el paisaje islandés' } },
  'greece-breaking-plates':    { file: 'assets/img/grecia2.jpg',     alt: { en: 'Outdoor dining at a Greek taverna', es: 'Comensales al aire libre en una taberna griega' } },
  'singapore-chewing-gum-ban': { file: 'assets/img/singapur2.jpg',   alt: { en: 'A train platform in the Singapore MRT', es: 'Un andén del metro (MRT) de Singapur' } },
  'peru-guinea-pig':           { file: 'assets/img/peru2.jpg',       alt: { en: 'A village in the Andes mountains of Peru', es: 'Un pueblo en las montañas andinas de Perú' } },
  'sweden-fika':                { file: 'assets/img/suecia2.jpg',    alt: { en: 'Coffee and pastries on a café table in Stockholm', es: 'Café y pasteles en la mesa de una cafetería en Estocolmo' } },
  'usa-tipping-culture':        { file: 'assets/img/eeuu2.jpg',      alt: { en: 'A jar for tips on a counter in an American restaurant', es: 'Un bote de propinas en el mostrador de un restaurante estadounidense' } }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INLINE_IMAGES };
}
