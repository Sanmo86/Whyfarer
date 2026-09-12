// tools/pages.js
// Static "legal / about" pages content, bilingual. Rendered by generate.js
// using the same header/footer/typography as articles.
'use strict';

const LAST_UPDATED = 'September 2026';
const LAST_UPDATED_ES = 'septiembre de 2026';
const CONTACT_EMAIL = 'whyfarerworld@gmail.com';

const PAGES = {

  en: {

    privacy: {
      slug: 'privacy',
      kicker: 'Legal',
      title: 'Privacy Policy',
      dek: `What we collect, what we don't, and how cookies work on Whyfarer.`,
      meta: `Last updated: ${LAST_UPDATED}`,
      sections: [
        {
          h: 'Overview',
          p: [
            `Whyfarer ("we", "us") publishes editorial articles about cultural customs around the world at whyfarer.world. This policy explains what information is collected when you visit the site, and how it's used.`
          ]
        },
        {
          h: 'Information we collect',
          p: [
            `We don't require account registration, and we don't collect personal information through forms — the site doesn't have any. If you email us, we receive whatever information you choose to include in that message.`,
            `Our hosting provider (Vercel) automatically logs standard technical data for every visit — such as IP address, browser type, and pages requested — for security and performance purposes. We don't access this data individually; it's part of standard web infrastructure.`
          ]
        },
        {
          h: 'Cookies and advertising',
          p: [
            `This site may display advertising served by Google AdSense and use analytics tools such as Google Analytics. These services can use cookies or similar technologies to understand how visitors use the site and, where advertising is enabled, to show ads based on your visits here and to other sites.`,
            `You can opt out of personalized advertising at any time through <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>. For more detail on how Google uses information from sites that use its services, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>.`
          ]
        },
        {
          h: 'Third-party links',
          p: [
            `Articles on Whyfarer link to external sources, including Creative Commons license pages and the original pages of the photographers we credit. We aren't responsible for the content or privacy practices of those third-party sites.`
          ]
        },
        {
          h: `Children's privacy`,
          p: [
            `Whyfarer isn't directed at children under 13, and we don't knowingly collect personal information from children.`
          ]
        },
        {
          h: 'Your rights',
          p: [
            `Depending on where you live, you may have the right to access, correct, or request deletion of any personal data we hold about you (for example, an email you sent us). To exercise these rights, contact us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
          ]
        },
        {
          h: 'Changes to this policy',
          p: [
            `We may update this policy from time to time. The date at the top of this page reflects the most recent revision.`
          ]
        },
        {
          h: 'Contact',
          p: [
            `Questions about this policy: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
          ]
        }
      ]
    },

    terms: {
      slug: 'terms',
      kicker: 'Legal',
      title: 'Terms of Use',
      dek: 'The basic rules for using Whyfarer.',
      meta: `Last updated: ${LAST_UPDATED}`,
      sections: [
        {
          h: 'Acceptance of terms',
          p: [
            `By accessing whyfarer.world, you agree to these Terms of Use. If you don't agree, please don't use the site.`
          ]
        },
        {
          h: 'About our content',
          p: [
            `Whyfarer publishes general-interest articles about cultural customs and traditions around the world. Our articles are researched for accuracy, but they're written for editorial purposes — not as an academic, legal, or professional reference.`,
            `Cultures are diverse and constantly evolving. The patterns we describe are general explanations, not universal rules that apply to every individual or every situation within a country or community.`
          ]
        },
        {
          h: 'Intellectual property',
          p: [
            `Unless otherwise noted, the text on Whyfarer is our own original work and may not be republished without permission. Photographs are licensed under Creative Commons and credited individually — see our <a href="credits.html">Photo Credits</a> page for the license terms of each image.`
          ]
        },
        {
          h: 'External links',
          p: [
            `Our articles may link to external websites for reference or attribution. We don't control, and aren't responsible for, the content or practices of those sites.`
          ]
        },
        {
          h: 'No warranty',
          p: [
            `This site and its content are provided "as is," without warranties of any kind. We do our best to keep information accurate and current, but we don't guarantee completeness or accuracy.`
          ]
        },
        {
          h: 'Limitation of liability',
          p: [
            `To the extent permitted by law, Whyfarer isn't liable for damages arising from your use of, or inability to use, this site.`
          ]
        },
        {
          h: 'Changes to these terms',
          p: [
            `We may revise these terms at any time. Continuing to use the site after a change means you accept the updated terms.`
          ]
        },
        {
          h: 'Contact',
          p: [
            `Questions about these terms: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
          ]
        }
      ]
    },

    about: {
      slug: 'about',
      kicker: 'About',
      title: 'About Whyfarer',
      dek: 'A magazine built around one simple question: why?',
      meta: '',
      sections: [
        {
          h: null,
          p: [
            `Whyfarer started from a simple frustration: most lists of "interesting facts about other cultures" stop right at the fact, without ever explaining where it actually comes from. We wanted something different — a magazine where every custom gets a real answer, not just a trivia bullet point.`,
            `Each article is researched from publicly available historical, anthropological, and cultural sources, then written to read like a magazine feature rather than an encyclopedia entry — because understanding <em>why</em> a tradition exists is a lot more interesting than just knowing that it does.`,
            `Whyfarer publishes in English and Spanish, with every article mirrored in both languages, and runs as a small, independent, static website: no ad-tech bloat, no tracking beyond what's disclosed in our <a href="privacy.html">Privacy Policy</a>, no clickbait.`,
            `All photography is real, sourced from Creative Commons contributors, and credited individually on our <a href="credits.html">Photo Credits</a> page.`,
            `Got a correction, a story idea, or a custom we should cover? See <a href="contact.html">Contact</a> — we read every email.`
          ]
        }
      ]
    },

    contact: {
      slug: 'contact',
      kicker: 'Get in touch',
      title: 'Contact',
      dek: 'Corrections, story ideas, or anything else — we read every email.',
      meta: '',
      email: CONTACT_EMAIL,
      emailCta: 'Email us',
      sections: [
        {
          h: null,
          p: [
            `The fastest way to reach us is by email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`,
            `We welcome factual corrections (we take accuracy seriously), pitches for customs we haven't covered yet, and licensing or partnership inquiries.`
          ]
        }
      ]
    }
  },

  es: {

    privacy: {
      slug: 'privacy',
      kicker: 'Legal',
      title: 'Política de Privacidad',
      dek: `Qué información recopilamos, cuál no, y cómo funcionan las cookies en Whyfarer.`,
      meta: `Última actualización: ${LAST_UPDATED_ES}`,
      sections: [
        {
          h: 'Resumen',
          p: [
            `Whyfarer ("nosotros") publica artículos editoriales sobre costumbres culturales del mundo en whyfarer.world. Esta política explica qué información se recopila cuando visitas el sitio y cómo se utiliza.`
          ]
        },
        {
          h: 'Información que recopilamos',
          p: [
            `No exigimos registro de cuenta ni recopilamos información personal mediante formularios — el sitio no tiene ninguno. Si nos escribes por email, recibimos la información que decidas incluir en ese mensaje.`,
            `Nuestro proveedor de hosting (Vercel) registra automáticamente datos técnicos estándar de cada visita —como dirección IP, tipo de navegador y páginas solicitadas— con fines de seguridad y rendimiento. No accedemos a estos datos de forma individual; son parte de la infraestructura web habitual.`
          ]
        },
        {
          h: 'Cookies y publicidad',
          p: [
            `Este sitio puede mostrar publicidad servida por Google AdSense y usar herramientas de analítica como Google Analytics. Estos servicios pueden usar cookies o tecnologías similares para entender cómo se usa el sitio y, cuando la publicidad esté activa, mostrar anuncios según tus visitas aquí y en otros sitios.`,
            `Puedes desactivar la publicidad personalizada en cualquier momento desde la <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">configuración de anuncios de Google</a>. Para más detalle sobre cómo usa Google la información de los sitios que usan sus servicios, consulta <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">cómo usa Google la información de los sitios o aplicaciones que usan nuestros servicios</a>.`
          ]
        },
        {
          h: 'Enlaces a terceros',
          p: [
            `Los artículos de Whyfarer enlazan a fuentes externas, incluyendo páginas de licencias Creative Commons y las páginas originales de los fotógrafos que acreditamos. No somos responsables del contenido ni de las prácticas de privacidad de esos sitios externos.`
          ]
        },
        {
          h: 'Privacidad de menores',
          p: [
            `Whyfarer no está dirigido a menores de 13 años y no recopilamos, a sabiendas, información personal de menores.`
          ]
        },
        {
          h: 'Tus derechos',
          p: [
            `Según dónde vivas, puedes tener derecho a acceder, corregir o solicitar la eliminación de cualquier dato personal que tengamos sobre ti (por ejemplo, un email que nos hayas enviado). Para ejercer estos derechos, escríbenos a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
          ]
        },
        {
          h: 'Cambios en esta política',
          p: [
            `Podemos actualizar esta política de vez en cuando. La fecha en la parte superior de esta página refleja la revisión más reciente.`
          ]
        },
        {
          h: 'Contacto',
          p: [
            `Preguntas sobre esta política: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
          ]
        }
      ]
    },

    terms: {
      slug: 'terms',
      kicker: 'Legal',
      title: 'Términos de Uso',
      dek: 'Las reglas básicas para usar Whyfarer.',
      meta: `Última actualización: ${LAST_UPDATED_ES}`,
      sections: [
        {
          h: 'Aceptación de los términos',
          p: [
            `Al acceder a whyfarer.world, aceptas estos Términos de Uso. Si no estás de acuerdo, por favor no uses el sitio.`
          ]
        },
        {
          h: 'Sobre nuestro contenido',
          p: [
            `Whyfarer publica artículos de interés general sobre costumbres y tradiciones culturales del mundo. Nuestros artículos se investigan buscando precisión, pero están escritos con fines editoriales — no como referencia académica, legal o profesional.`,
            `Las culturas son diversas y están en constante evolución. Los patrones que describimos son explicaciones generales, no reglas universales aplicables a cada persona o situación dentro de un país o comunidad.`
          ]
        },
        {
          h: 'Propiedad intelectual',
          p: [
            `Salvo que se indique lo contrario, los textos de Whyfarer son trabajo original propio y no pueden republicarse sin permiso. Las fotografías están bajo licencia Creative Commons y acreditadas individualmente — consulta nuestra página de <a href="credits.html">Créditos de imágenes</a> para conocer la licencia de cada una.`
          ]
        },
        {
          h: 'Enlaces externos',
          p: [
            `Nuestros artículos pueden enlazar a sitios web externos como referencia o atribución. No controlamos ni somos responsables del contenido o las prácticas de esos sitios.`
          ]
        },
        {
          h: 'Sin garantías',
          p: [
            `Este sitio y su contenido se ofrecen "tal cual", sin garantías de ningún tipo. Hacemos lo posible por mantener la información precisa y actualizada, pero no garantizamos que sea completa o exacta.`
          ]
        },
        {
          h: 'Limitación de responsabilidad',
          p: [
            `En la medida permitida por la ley, Whyfarer no es responsable de los daños derivados del uso, o la imposibilidad de uso, de este sitio.`
          ]
        },
        {
          h: 'Cambios en estos términos',
          p: [
            `Podemos revisar estos términos en cualquier momento. Seguir usando el sitio después de un cambio implica que aceptas los términos actualizados.`
          ]
        },
        {
          h: 'Contacto',
          p: [
            `Preguntas sobre estos términos: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
          ]
        }
      ]
    },

    about: {
      slug: 'about',
      kicker: 'Acerca de',
      title: 'Acerca de Whyfarer',
      dek: 'Una revista construida alrededor de una sola pregunta: ¿por qué?',
      meta: '',
      sections: [
        {
          h: null,
          p: [
            `Whyfarer nació de una frustración sencilla: la mayoría de las listas de "datos curiosos sobre otras culturas" se quedan justo en el dato, sin explicar nunca de dónde viene realmente. Quisimos hacer algo distinto — una revista donde cada costumbre tenga una respuesta de verdad, no solo una línea de trivia.`,
            `Cada artículo se investiga a partir de fuentes históricas, antropológicas y culturales de acceso público, y se escribe para leerse como un reportaje de revista, no como una entrada de enciclopedia — porque entender <em>por qué</em> existe una tradición es mucho más interesante que solo saber que existe.`,
            `Whyfarer publica en inglés y español, con cada artículo disponible en ambos idiomas, y funciona como un sitio web pequeño, independiente y estático: sin exceso de tecnología publicitaria, sin rastreo más allá de lo que revela nuestra <a href="privacy.html">Política de Privacidad</a>, sin clickbait.`,
            `Todas las fotografías son reales, provienen de colaboradores de Creative Commons y están acreditadas individualmente en nuestra página de <a href="credits.html">Créditos de imágenes</a>.`,
            `¿Tienes una corrección, una idea de artículo, o una costumbre que deberíamos cubrir? Ve a <a href="contact.html">Contacto</a> — leemos todos los correos.`
          ]
        }
      ]
    },

    contact: {
      slug: 'contact',
      kicker: 'Contáctanos',
      title: 'Contacto',
      dek: 'Correcciones, ideas de artículos, o lo que sea — leemos todos los correos.',
      meta: '',
      email: CONTACT_EMAIL,
      emailCta: 'Escríbenos',
      sections: [
        {
          h: null,
          p: [
            `La forma más rápida de contactarnos es por email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`,
            `Agradecemos correcciones factuales (nos tomamos la precisión en serio), propuestas de costumbres que aún no hayamos cubierto, y consultas de licencias o colaboración.`
          ]
        }
      ]
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PAGES, CONTACT_EMAIL };
}
