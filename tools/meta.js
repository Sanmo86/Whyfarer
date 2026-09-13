// tools/meta.js
// Locale-independent metadata for each article: slug, category, flag, hero image,
// and real external sources (verified via web search, not invented) used to
// fact-check the article. Order here defines the canonical order used to zip
// together content.en.js / content.es.js.
'use strict';

const META = [
  { slug: 'japan-nose-blowing', category: 'asia', flag: '🇯🇵', hero: 'assets/img/japon.jpg',
    sources: [
      { title: 'Blowing your nose, eating on the go, littering: what not to do in Japan', publisher: 'NZ Herald', url: 'https://www.nzherald.co.nz/travel/blowing-your-nose-eating-on-the-go-littering-what-not-to-do-in-japan/GNUZVGBV7MAREPCCMIRBFH7SXU/' },
      { title: "10 unspoken rules in Japan (that you'll probably break)", publisher: 'GaijinPot', url: 'https://blog.gaijinpot.com/10-unspoken-rules-in-japan-that-youll-probably-break/' }
    ] },
  { slug: 'india-sacred-cow', category: 'asia', flag: '🇮🇳', hero: 'assets/img/india.jpg',
    sources: [
      { title: 'The sacred cow', publisher: 'Alimentarium', url: 'https://www.alimentarium.org/en/fact-sheet/sacred-cow' },
      { title: 'Why are cows sacred to Hindus?', publisher: 'Patheos', url: 'https://www.patheos.com/answers/why-are-cows-sacred-to-hindus' }
    ] },
  { slug: 'finland-sauna-queue', category: 'europe', flag: '🇫🇮', hero: 'assets/img/finlandia.jpg',
    sources: [
      { title: 'UNESCO highlights the intangible but very real spirit of Finnish sauna culture', publisher: 'This is Finland', url: 'https://finland.fi/life-society/unesco-highlights-the-intangible-but-very-real-spirit-of-finnish-sauna-culture/' },
      { title: 'Sauna culture as intangible cultural heritage', publisher: 'Finnish Heritage Agency', url: 'https://www.museovirasto.fi/en/articles/sauna-culture-intangible-cultural-heritage' }
    ] },
  { slug: 'south-korea-age-system', category: 'asia', flag: '🇰🇷', hero: 'assets/img/corea.jpg',
    sources: [
      { title: 'South Koreans just got younger, thanks to a new law', publisher: 'Smithsonian Magazine', url: 'https://www.smithsonianmag.com/smart-news/south-korea-international-age-180982458/' },
      { title: 'South Korea adopts international practice for calculating age', publisher: 'CBS News', url: 'https://www.cbsnews.com/news/south-korea-adopts-international-practice-for-calculating-age-reducing-citizens-ages' }
    ] },
  { slug: 'france-restaurant-bill', category: 'europe', flag: '🇫🇷', hero: 'assets/img/francia.jpg',
    sources: [
      { title: 'Our guide to French restaurant etiquette', publisher: 'HiP Paris Blog', url: 'https://hipparis.com/paris-restaurant-etiquette-dining-discreetly/' },
      { title: "Why French waiters aren't rude — you're just misreading the culture", publisher: 'Polyglottist Language Academy', url: 'https://www.polyglottistlanguageacademy.com/language-culture-travelling-blog/2025/8/10/why-french-waiters-arent-rude-youre-just-misreading-the-culture' }
    ] },
  { slug: 'mexico-day-of-the-dead', category: 'americas', flag: '🇲🇽', hero: 'assets/img/mexico.jpg',
    sources: [
      { title: 'Indigenous festivity dedicated to the dead', publisher: 'UNESCO Intangible Cultural Heritage', url: 'https://ich.unesco.org/en/RL/indigenous-festivity-dedicated-to-the-dead-00054' },
      { title: 'Day of the Dead', publisher: 'Encyclopaedia Britannica', url: 'https://www.britannica.com/topic/Day-of-the-Dead' }
    ] },
  { slug: 'netherlands-no-curtains', category: 'europe', flag: '🇳🇱', hero: 'assets/img/holanda.jpg',
    sources: [
      { title: "Why Dutch people don't mind you staring into their homes", publisher: 'CNN Travel', url: 'https://www.cnn.com/travel/article/dutch-windows/index.html' },
      { title: "Why don't the Dutch like to use curtains?", publisher: 'DutchReview', url: 'https://dutchreview.com/culture/why-dont-the-dutch-like-to-use-curtains/' }
    ] },
  { slug: 'thailand-sacred-head', category: 'asia', flag: '🇹🇭', hero: 'assets/img/tailandia.jpg',
    sources: [
      { title: 'Feet low, head high: a guide to Thai etiquette', publisher: 'Thailand Foundation', url: 'https://thailandfoundation.or.th/feet-low-head-high-a-guide-to-thai-etiquettes/' },
      { title: "Don't touch the head! Touching heads in Bangkok", publisher: 'SmarterTravel', url: 'https://www.smartertravel.com/dont-touch-head-touching-heads-bangkok-thailand-tip/' }
    ] },
  { slug: 'germany-splitting-bills', category: 'europe', flag: '🇩🇪', hero: 'assets/img/alemania.jpg',
    sources: [
      { title: 'Why Germans always separate the bill: dining etiquette explained', publisher: 'GermanCulture.com.ua', url: 'https://germanculture.com.ua/daily/german-dining-etiquette-separate-bill/' },
      { title: 'Bill-splitting culture: key differences by country', publisher: 'bunq', url: 'https://www.bunq.com/en-us/blog/bill-splitting-culture-key-differences-by-country' }
    ] },
  { slug: 'ethiopia-calendar', category: 'africa', flag: '🇪🇹', hero: 'assets/img/etiopia.jpg',
    sources: [
      { title: 'Why is the Ethiopian calendar 7 years behind?', publisher: 'The Culture Trip', url: 'https://theculturetrip.com/africa/ethiopia/articles/why-is-the-ethiopian-calendar-7-years-behind' },
      { title: 'Why is the Ethiopian calendar behind by 7 years?', publisher: 'EthiopianCalendar.net', url: 'https://www.ethiopiancalendar.net/why-is-ethiopian-calendar-behind-by-7-years' }
    ] },
  { slug: 'italy-cappuccino-rule', category: 'europe', flag: '🇮🇹', hero: 'assets/img/italia.jpg',
    sources: [
      { title: "Why (most) Italians don't drink cappuccino after 11am", publisher: 'An American in Rome', url: 'https://anamericaninrome.com/2021/06/why-most-italians-dont-drink-cappuccino-after-11-am/' },
      { title: 'Why you should never drink cappuccino after 11 a.m.', publisher: 'HuffPost', url: 'https://www.huffpost.com/entry/food-rules-in-italy_l_669fc3ebe4b006a939846b35' }
    ] },
  { slug: 'norway-babies-outside', category: 'europe', flag: '🇳🇴', hero: 'assets/img/noruega.jpg',
    sources: [
      { title: 'Why Scandinavians let their babies nap outside in the winter', publisher: 'Rain or Shine Mamma', url: 'https://rainorshinemamma.com/2019/11/03/why-scandinavians-leave-their-babies-out-in-the-cold/' },
      { title: 'Outdoor winter baby naps: trying the Scandinavian tradition', publisher: 'The Every Mom', url: 'https://theeverymom.com/babies-outside-in-winter/' }
    ] },
  { slug: 'china-number-four', category: 'asia', flag: '🇨🇳', hero: 'assets/img/china.jpg',
    sources: [
      { title: 'Why do some cultures believe the number four is unlucky?', publisher: 'HowStuffWorks', url: 'https://people.howstuffworks.com/number-4-unlucky.htm' },
      { title: 'Floor M: avoiding unlucky numbers amounts to design by omission', publisher: '99% Invisible', url: 'https://99percentinvisible.org/article/floor-m-avoiding-unlucky-numbers-amounts-design-omission/' }
    ] },
  { slug: 'argentina-mate-sharing', category: 'americas', flag: '🇦🇷', hero: 'assets/img/argentina.jpg',
    sources: [
      { title: "How the pandemic transformed Argentina's yerba mate traditions", publisher: 'Atlas Obscura', url: 'https://www.atlasobscura.com/articles/how-to-drink-mate' },
      { title: 'Argentinian mate: history, rituals, and where to try it like a local', publisher: 'Argentina.travel (official tourism board)', url: 'https://www.argentina.travel/en/news/argentinian-mate-history-rituals-and-where-to-try-it-like-a-local' }
    ] },
  { slug: 'bhutan-happiness-index', category: 'asia', flag: '🇧🇹', hero: 'assets/img/butan.jpg',
    sources: [
      { title: 'Gross National Happiness in Bhutan: 12 things to know', publisher: 'Asian Development Bank', url: 'https://www.adb.org/news/features/gross-national-happiness-bhutan-12-things-know' },
      { title: 'Gross National Happiness', publisher: 'Oxford Poverty and Human Development Initiative (OPHI)', url: 'https://ophi.org.uk/gross-national-happiness' }
    ] },
  { slug: 'russia-no-smiling', category: 'europe', flag: '🇷🇺', hero: 'assets/img/rusia.jpg',
    sources: [
      { title: 'Why are Russians so stingy with their smiles?', publisher: 'The Conversation', url: 'https://theconversation.com/why-are-russians-so-stingy-with-their-smiles-98799' },
      { title: "10 reasons why Russians don't smile much", publisher: 'Russia Beyond', url: 'https://www.rbth.com/arts/2013/11/29/ten_reasons_why_russians_dont_smile_much_31259' }
    ] },
  { slug: 'portugal-codfish', category: 'europe', flag: '🇵🇹', hero: 'assets/img/portugal.jpg',
    sources: [
      { title: 'Bacalhau: understanding the Portuguese obsession with cod', publisher: 'Portugal.com', url: 'https://www.portugal.com/history-and-culture/bacalhau-understanding-the-portuguese-obsession-with-cod/' },
      { title: 'Bacalhau in Portugal: history, traditions & national dish', publisher: 'Cooltour Oporto', url: 'https://cooltouroporto.com/blog/bacalhau-portugal-history-traditions' }
    ] },
  { slug: 'philippines-big-families', category: 'asia', flag: '🇵🇭', hero: 'assets/img/filipinas.jpg',
    sources: [
      { title: "'Utang na loob?' Filipino family values gone wrong, and how they affect mental health", publisher: 'Rappler', url: 'https://www.rappler.com/life-and-style/relationships/filipino-family-values-gone-wrong/' },
      { title: "What is 'utang na loob' and why is it relevant among Filipino families?", publisher: 'GMA News Online', url: 'https://www.gmanetwork.com/news/lifestyle/familyandrelationships/917549/what-is-utang-na-loob-and-why-is-it-relevant-among-filipino-families-psychologist-answer/story/' }
    ] },
  { slug: 'switzerland-punctual-trains', category: 'europe', flag: '🇨🇭', hero: 'assets/img/suiza.jpg',
    sources: [
      { title: 'Swiss Federal Railways reports record punctuality in 2025', publisher: 'SWI swissinfo.ch', url: 'https://www.swissinfo.ch/eng/swiss-politics/swiss-federal-railways-reports-record-punctuality-in-2025/90842888' },
      { title: 'How punctual is SBB?', publisher: 'SBB (Swiss Federal Railways)', url: 'https://company.sbb.ch/en/company/responsibility/customers/punctuality.html' }
    ] },
  { slug: 'morocco-haggling', category: 'africa', flag: '🇲🇦', hero: 'assets/img/marruecos.jpg',
    sources: [
      { title: 'Marrakesh souk, the home of haggling', publisher: 'Barceló Experiences', url: 'https://www.barcelo.com/guia-turismo/en/morocco/marrakech/things-to-do/marrakesh-souk/' },
      { title: 'The art of the souk: market culture across the Middle East and North Africa', publisher: 'Native Threads', url: 'https://nativethreads.co/blogs/blog/the-art-of-the-souk-market-culture-across-the-middle-east-and-north-africa' }
    ] },
  { slug: 'iceland-no-surnames', category: 'europe', flag: '🇮🇸', hero: 'assets/img/islandia.jpg',
    sources: [
      { title: 'How did Iceland become a nation with no surnames?', publisher: 'The Culture Trip', url: 'https://theculturetrip.com/europe/iceland/articles/how-did-iceland-become-a-nation-with-no-surnames' },
      { title: 'How Icelandic names work', publisher: 'Guide to Iceland', url: 'https://guidetoiceland.is/history-culture/icelandic-names-and-their-meanings' }
    ] },
  { slug: 'greece-breaking-plates', category: 'europe', flag: '🇬🇷', hero: 'assets/img/grecia.jpg',
    sources: [
      { title: 'Why Greeks smash plates: the history behind the custom', publisher: 'GreekReporter.com', url: 'https://greekreporter.com/2025/04/05/smashing-plates-break-greek-custom/' },
      { title: 'How Greek traditions work', publisher: 'HowStuffWorks', url: 'https://people.howstuffworks.com/culture-traditions/national-traditions/greek-tradition.htm' }
    ] },
  { slug: 'singapore-chewing-gum-ban', category: 'asia', flag: '🇸🇬', hero: 'assets/img/singapur.jpg',
    sources: [
      { title: 'Chewing gum ban', publisher: 'National Library Board, Singapore', url: 'https://www.nlb.gov.sg/main/article-detail?cmsuuid=8d4408cb-eb2d-4604-921e-7fa55f51baf3' },
      { title: 'Why Singapore banned chewing gum', publisher: 'The Culture Trip', url: 'https://theculturetrip.com/asia/singapore/articles/why-singapore-banned-chewing-gum' }
    ] },
  { slug: 'peru-guinea-pig', category: 'americas', flag: '🇵🇪', hero: 'assets/img/peru.jpg',
    sources: [
      { title: 'Eating cuy: Peruvian guinea pig delicacy', publisher: 'Eat Peru', url: 'https://www.eatperu.com/eating-cuy-guinea-pig-peruvian-delicacy/' },
      { title: 'Peruvian guinea pig (cuy): 7 fascinating facts and traditions', publisher: 'Valencia Travel Cusco', url: 'https://www.valenciatravelcusco.com/passion-passport/fascinating-facts-about-the-peruvian-guinea-pig-cu' }
    ] },
  { slug: 'sweden-fika', category: 'europe', flag: '🇸🇪', hero: 'assets/img/suecia.jpg',
    sources: [
      { title: "Swedish fika: Sweden's 'premium coffee break' explained", publisher: 'Forbes', url: 'https://www.forbes.com/sites/davidnikel/2023/01/03/swedish-fika-swedens-premium-coffee-break-explained/' },
      { title: 'What is fika? An introduction to the Swedish coffee break', publisher: 'The Kitchn', url: 'https://www.thekitchn.com/what-in-the-world-is-fika-an-intro-to-the-swedish-coffee-break-the-art-of-fika-219297' }
    ] },
  { slug: 'usa-tipping-culture', category: 'americas', flag: '🇺🇸', hero: 'assets/img/eeuu.jpg',
    sources: [
      { title: 'Tipped Employees Under the FLSA (Fact Sheet #15)', publisher: 'U.S. Department of Labor', url: 'https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa' },
      { title: 'Americans have hated tipping almost as long as they’ve practiced it', publisher: 'National Geographic', url: 'https://www.nationalgeographic.com/history/article/tipping-history-united-states' }
    ] }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { META };
}
