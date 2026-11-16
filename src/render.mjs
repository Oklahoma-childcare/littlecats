/*
 * Little Cats Childcare LLC: semantic, crawlable, six-page HTML rendering.
 * Update factual content in src/config/site.json and images in src/config/media.json.
 * No external JS library or build dependency is required.
 */
export const ROUTES = [
  { slug: '', label: 'Home', key: 'home' },
  { slug: 'our-place', label: 'Our place', key: 'about' },
  { slug: 'little-years', label: 'Little years', key: 'ages' },
  { slug: 'for-families', label: 'For families', key: 'families' },
  { slug: 'questions', label: 'FAQs', key: 'questions' },
  { slug: 'contact', label: 'Say hello', key: 'contact' },
];

const esc = (v='') => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const jsonSafe = v => JSON.stringify(v).replaceAll('<','\\u003c');

export function renderPage(route, site, media) {
  const prefix = route.slug ? '../' : './';
  const href = slug => `${prefix}${slug ? `${slug}/` : ''}`;
  const mediaUrl = key => {
    const src = media[key]?.src ?? '';
    return /^https?:\/\//.test(src) ? src : `${prefix}${src.replace(/^\//,'')}`;
  };
  const image = (key,cls='',extra='') => `<img class="${esc(cls)}" src="${esc(mediaUrl(key))}" alt="${esc(media[key]?.alt ?? '')}" ${extra}/>`;
  const phone = `tel:${site.phoneE164}`;
  const mail = `mailto:${site.email}`;
  const address = `${site.street}, ${site.city}, ${site.stateCode} ${site.postalCode}`;
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const licenceLink = `<a href="${esc(site.licenseUrl)}" rel="noopener noreferrer" target="_blank">Oklahoma childcare listing <span aria-hidden="true">↗</span></a>`;
  const metadata = {
    home: {
      title: `Little Cats Childcare LLC | Childcare in ${site.city}, Oklahoma`,
      desc: `Explore Little Cats Childcare LLC in Cashion, OK: school-year childcare for infants, toddlers and preschoolers. Hours 7:30 AM–4 PM weekdays. Call ${site.phoneDisplay}.`
    },
    about: {
      title: `Our Place | ${site.name} — Cashion, OK`,
      desc: `Get to know Little Cats Childcare in Cashion, OK. View licensed capacity, school-year hours, age groups and the official Oklahoma childcare listing.`
    },
    ages: {
      title: `Infants, Toddlers & Preschool | ${site.name}`,
      desc: `Little Cats Childcare LLC in Cashion lists infants (0–11 months), toddlers (12–23 months) and preschool ages 2–4. Explore each age group and ask about care.`
    },
    families: {
      title: `For Families & Enrollment Questions | ${site.name}`,
      desc: `Planning childcare in Cashion? Learn how to ask about openings, pricing, routines and the school-year schedule at Little Cats Childcare LLC.`
    },
    questions: {
      title: `Childcare FAQs | ${site.name} in Cashion`,
      desc: `Find quick answers about Little Cats Childcare LLC hours, ages served, school-year operation, capacity, address and how to contact the provider.`
    },
    contact: {
      title: `Contact Little Cats Childcare LLC | Cashion, OK`,
      desc: `Call Little Cats Childcare LLC at ${site.phoneDisplay}, email ${site.email}, or find the center at ${address}.`
    }
  };
  const m = metadata[route.key];
  const home = route.key==='home';
  const current = name=>route.key === name ? 'aria-current="page"' : '';
  const nav = ROUTES.map(r=>`<a href="${href(r.slug)}" ${current(r.key)}>${esc(r.label)}</a>`).join('\n');
  const social = (site.socialLinks ?? []).filter(x=>x && x.url && x.label).map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(x.label)}">${esc(x.label)} ↗</a>`).join('');
  const titleArt = (title,no)=>`<span class="section-num" aria-hidden="true">${no}</span><h2>${title}</h2>`;
  const badge = t=>`<span class="eyebrow"><span class="mini-sun" aria-hidden="true">✷</span> ${t}</span>`;
  const linkButton = (to,txt,cls='btn-ink')=>`<a class="button ${cls}" href="${to}">${txt}<span aria-hidden="true">↗</span></a>`;
  const ageLabel = (g,i)=>`<article class="age-row"><div class="age-row-no">0${i+1}<span> / THREE</span></div><div class="age-row-art art-${g.id}">${image(i===0?'chapterInfants':i===1?'chapterToddlers':'chapterPreschool','')}</div><div class="age-row-copy"><p class="age-row-kicker">${esc(g.ages)}</p><h3>${esc(g.title)}</h3><p>${esc(g.summary)}</p><a class="text-link" href="${href('little-years')}#${g.id}">Explore this chapter <span aria-hidden="true">↗</span></a></div></article>`;
  const fact = (num,k,v)=>`<div class="mini-fact"><span class="mini-fact-num">${num}</span><div><strong>${k}</strong><span>${v}</span></div></div>`;
  const story = {
    home: ()=>`
<section class="home-hero section-shell" aria-labelledby="hero-title">
  <div class="tiny-track"><span class="tiny-track-line"></span> <span>THE LITTLE YEARS, REIMAGINED</span> <span class="tiny-track-line"></span> <span>EST. IN CASHION, OKLAHOMA</span></div>
  <div class="hero-title-wrap">
    <div class="hero-sticker hero-sticker-top" aria-hidden="true">little<br/>wonder<br/>club ✷</div>
    ${badge('Childcare in Cashion, Oklahoma')}
    <h1 id="hero-title">Small world.<br/><em>Big</em> wonder<span class="orange-dot">.</span></h1>
    <div class="hero-underline" aria-hidden="true"></div>
    <p class="hero-deck">A little space for the very first chapters. Discover the ages listed for care, the weekday details, and how to start a conversation with <strong>Little Cats Childcare LLC.</strong></p>
    <div class="hero-actions">${linkButton(href('little-years'),'Explore the little years')}${linkButton(phone,'Call the center','btn-outline')}</div>
  </div>
  <div class="hero-poster" aria-label="Original illustrated scene">
    <div class="hero-poster-art">${image('hero','hero-illustration','fetchpriority="high" width="1000" height="860"')}</div>
    <div class="hero-poster-side"><span>THE<br/>LITTLE<br/>CATS<br/>CLUB</span><div class="poster-arrows" aria-hidden="true">↗ ↗ ↗</div></div>
    <div class="hero-poster-stamp">Small place.<br/>Big firsts.</div>
  </div>
  <div class="hero-bottom-strip"><span>✳ infant care</span><span>✳ curious toddlers</span><span>✳ preschool years</span><a href="${href('contact')}">Find your way to us <b aria-hidden="true">↗</b></a></div>
</section>
<section class="facts-ticker section-shell" aria-label="At a glance">
  ${fact('01','8 children','Total listed capacity')}
  ${fact('02','3 age chapters','Infants through preschool')}
  ${fact('03','7:30 AM','Weekday opening time')}
  ${fact('04','School year','Listed operating schedule')}
</section>
<section class="chapters section-shell" aria-labelledby="chapters-title">
  <div class="section-heading"><div>${badge('One age at a time')}${titleArt('Every little age has <em>a story.</em>','01')}</div><p>Those first few years are full of change. Start with the three age ranges listed by Oklahoma Human Services, then ask the center about current openings and everyday routines.</p></div>
  <div class="ages-editorial">${site.ageGroups.map(ageLabel).join('')}</div>
</section>
<section class="mid-feature section-shell" aria-labelledby="firsts-title">
  <div class="mid-feature-art">${image('feature','', 'loading="lazy" width="1000" height="800"')}<span class="mid-feature-tag">A LITTLE SOMETHING EXTRA ✷</span></div>
  <div class="mid-feature-copy">${badge('A thoughtful starting point')}<h2 id="firsts-title">First words.<br/>First friends.<br/><em>Firsts, firsts, firsts.</em></h2><p>Care is personal. Whether you're planning for naps, a new routine, or a preschooler's growing independence, the best next step is a real conversation about your child.</p><div class="feature-list"><span>Ask about availability</span><span>Talk through daily routines</span><span>Discuss enrollment details</span></div>${linkButton(href('for-families'),'For families','btn-cream')}</div>
</section>
<section class="note-section section-shell" aria-labelledby="note-title"><div class="note-index">THE PARENT NOTEBOOK / 001</div><div class="note-main"><h2 id="note-title">A few good questions can make a <em>big</em> difference.</h2><p>Wondering about drop-off, rest time, tuition or what's needed to enroll? We've organized the questions families most often need answered—all in one place.</p>${linkButton(href('questions'),'Open the question book')}</div><div class="note-scribble" aria-hidden="true">?</div></section>
${bottomCta('Hello, little possibilities.','Start with one easy conversation.',href('contact'),'Say hello')}
`,
    about: ()=>`
${pageLead('01 / THE PLACE','Our little<br/><em>corner of Cashion.</em>','A small licensed capacity. Three early age groups. A simple place to start your childcare search.', 'mint')}
<section class="about-split section-shell"><div class="about-portrait">${image('about','','loading="lazy" width="1000" height="820"')}<span class="portrait-label">LITTLE CATS / CASHION, OK</span></div><div class="about-words">${badge('The essentials')}<h2>There’s a lot to find out about a <em>little</em> place.</h2><p>Little Cats Childcare LLC appears on Oklahoma Human Services' childcare locator as a licensed childcare center in Cashion. It lists a total capacity of eight children and serves infant, toddler and preschool age groups.</p><p>The center is listed for school-year operation, Monday through Friday. For current space, routines, pricing and enrollment details, contact the provider directly.</p><a class="text-link" target="_blank" rel="noopener noreferrer" href="${esc(site.licenseUrl)}">See the official childcare record ↗</a></div></section>
<section class="facts-feature section-shell">${badge('At a glance')}<div class="facts-feature-grid"><div><span>08</span><b>Children</b><p>State-listed capacity</p></div><div><span>03</span><b>Age groups</b><p>Infant, toddler, preschool</p></div><div><span>01</span><b>Star level</b><p>Oklahoma listing</p></div></div></section>
<section class="paper-steps section-shell">${badge('The way to begin')}<h2>Start with <em>hello.</em></h2><div class="steps-grid"><article><span>01</span><h3>Explore</h3><p>Look through the age ranges and verified opening hours.</p></article><article><span>02</span><h3>Ask</h3><p>Contact the center to discuss openings, schedules and fees.</p></article><article><span>03</span><h3>Connect</h3><p>Ask how to learn about the setting and the next steps for care.</p></article></div></section>
${bottomCta('Every story begins somewhere.','Ask the provider your first question.',href('contact'),'Get in touch')}
`,
    ages: ()=>`
${pageLead('02 / THE LITTLE YEARS','Three little<br/><em>chapters.</em>','From tiny firsts to growing independence. Explore the three age ranges listed for Little Cats Childcare LLC.', 'peach')}
<section class="ages-page section-shell" aria-labelledby="ageguide-title"><div class="section-heading"><div>${badge('Choose a chapter')}<h2 id="ageguide-title">Growing, <em>day by day.</em></h2></div><p>Select an age range to see useful conversation starters. These are general questions—not a published curriculum or daily schedule.</p></div>
<div class="age-selector" role="tablist" aria-label="Age groups">${site.ageGroups.map((g,i)=>`<button type="button" id="tab-${g.id}" role="tab" aria-controls="${g.id}" aria-selected="${i===0?'true':'false'}" tabindex="${i===0?'0':'-1'}" data-age-tab="${g.id}"><span>0${i+1}</span><strong>${esc(g.title)}</strong><small>${esc(g.ages)}</small></button>`).join('')}</div>
<div class="age-panels">${site.ageGroups.map((g,i)=>`<section class="age-panel" id="${g.id}" role="tabpanel" aria-labelledby="tab-${g.id}" ${i!==0?'hidden':''} data-age-panel="${g.id}"><div class="panel-art panel-${g.id}">${image(i===0?'chapterInfants':i===1?'chapterToddlers':'chapterPreschool','','loading="lazy" width="640" height="520"')}</div><div class="panel-copy"><p class="panel-index">CHAPTER 0${i+1} — ${esc(g.ages)}</p><h3>${esc(g.label)}</h3><p>${esc(g.summary)}</p><h4>Good things to ask</h4><ul>${i===0?'<li>How are feeding and rest routines coordinated?</li><li>What should families pack each day?</li><li>How does drop-off and settling in work?</li>':i===1?'<li>How are transitions and routines discussed?</li><li>What should families bring for the day?</li><li>What is the approach to play and communication?</li>':'<li>How does the day balance play and rest?</li><li>What are the expectations for independence?</li><li>How is family communication handled?</li>'}</ul>${linkButton(href('contact'),'Ask about '+esc(g.title.toLowerCase()))}</div></section>`).join('')}</div>
</section>
<section class="age-summary section-shell"><div class="age-summary-left"><span class="section-num">✷</span><h2>One place to find the <em>basics.</em></h2></div><div class="age-summary-right"><p>The current Oklahoma state record lists children aged 0–4 and a total capacity of eight, with weekday school-year operation.</p><div class="mini-table"><div><span>Ages</span><strong>0 months–4 years</strong></div><div><span>Hours</span><strong>Mon–Fri, 7:30 AM–4 PM</strong></div><div><span>Schedule</span><strong>School year only</strong></div><div><span>Capacity</span><strong>8</strong></div></div><a class="text-link" href="${esc(site.licenseUrl)}" target="_blank" rel="noopener noreferrer">View state listing ↗</a></div></section>
${bottomCta('Have an age-specific question?','The center can tell you about current availability.',href('contact'),'Ask a question')}
`,
    families: ()=>`
${pageLead('03 / FAMILY NOTES','Little details.<br/><em>Big peace of mind.</em>','A practical guide to starting a childcare conversation, without the guesswork.', 'blue')}
<section class="families-steps section-shell"><div class="family-aside">${badge('Parent notebook')}<h2>Let’s make the <em>next step</em> a little easier.</h2><p>Choosing care should begin with the details that matter most to your family. Here are three helpful places to start.</p><div class="aside-doodle" aria-hidden="true">✳</div></div><div class="family-step-list"><article><span>01</span><div><h3>Check the fit</h3><p>Compare the state-listed age ranges and school-year hours with your family's needs.</p></div></article><article><span>02</span><div><h3>Ask about openings</h3><p>Enrollment availability, tuition and start dates aren't listed in the state record; call or email to confirm them.</p></div></article><article><span>03</span><div><h3>Plan the practical bits</h3><p>Ask about meals, what to pack, drop-off, rest, communication and any paperwork before enrolling.</p></div></article></div></section>
<section class="family-list section-shell"><div class="family-list-heading"><span class="mini-caps">THE LITTLE LIST / KEEP THIS HANDY</span><h2>Questions worth <em>asking.</em></h2></div><div class="checkboard"><div class="check-item"><span aria-hidden="true">□</span><p>What openings are available for my child's age?</p></div><div class="check-item"><span aria-hidden="true">□</span><p>What are tuition, fees and payment policies?</p></div><div class="check-item"><span aria-hidden="true">□</span><p>What are drop-off and pickup arrangements?</p></div><div class="check-item"><span aria-hidden="true">□</span><p>How are meals, supplies and rest handled?</p></div><div class="check-item"><span aria-hidden="true">□</span><p>How does the school-year calendar work?</p></div><div class="check-item"><span aria-hidden="true">□</span><p>What documents are needed for enrollment?</p></div></div></section>
<section class="season-card section-shell"><div class="season-graphic" aria-hidden="true">S<br/>Y<br/>✷</div><div><span class="mini-caps">A NOTE ON THE CALENDAR</span><h2>School-year care.</h2><p>Oklahoma Human Services lists this program as <strong>school year only</strong>, with Monday–Friday hours of 7:30 AM–4:00 PM. Contact the center to confirm specific dates, holidays and closure plans.</p>${linkButton(href('questions'),'Read common questions','btn-cream')}</div></section>
${bottomCta('Ready to ask about care?','A quick message is a good place to start.',href('contact'),'Contact Little Cats')}
`,
    questions: ()=>`
${pageLead('04 / GOOD QUESTIONS','Curious? That’s<br/><em>a good thing.</em>','Everything here starts with the publicly listed facts, plus the questions you can bring to the provider.', 'yellow')}
<section class="faq-section section-shell"><div class="faq-aside">${badge('The question book')}<h2>Quick answers, <em>little by little.</em></h2><p>Click a question to open it. For details not in the public listing, the best source is the center itself.</p><div class="faq-cat" aria-hidden="true">?</div></div><div class="faq-list">
${faq('What ages does Little Cats Childcare serve?','The Oklahoma childcare listing accepts infants (0–11 months), toddlers (12–23 months), and preschool children (ages 2–4).')}
${faq('What are the opening hours?','Monday through Friday, 7:30 AM to 4:00 PM. The public listing shows Saturday and Sunday as closed.')}
${faq('Is the childcare center open year-round?','The current state listing says “School Year Only.” Ask the center for its exact term dates, holidays and closure calendar.')}
${faq('How many children can attend?','The state-listed total capacity is 8 children. Capacity does not necessarily mean eight spots are available now.')}
${faq('Are there openings right now?','Current vacancies are not published in the state listing. Call ${esc(site.phoneDisplay)} or email ${esc(site.email)} for the latest availability.')}
${faq('How much does childcare cost?','Tuition and registration fees are not published in the state listing. Contact the provider to discuss rates, payment terms and any applicable policies.')}
${faq('Are subsidies accepted?','The state provider page has no subsidy contract number listed. Ask the center directly if you need to confirm current assistance or payment options.')}
${faq('Where is Little Cats located?','101 N Euclid Street, Cashion, Oklahoma 73016. You can open the address in a maps application from the contact page.')}
${faq('How can I review licensing information?','Visit the Oklahoma Human Services childcare locator for license K830058305, where program details and monitoring history are published.')}
</div></section>
<section class="question-close section-shell"><h2>Still have a <em>question?</em></h2><p>There are always details that only a real conversation can answer.</p>${linkButton(href('contact'),'Ask Little Cats')}</section>
`,
    contact: ()=>`
${pageLead('05 / SAY HELLO','Let’s start<br/><em>with hello.</em>','Have a question about the little years? Here’s how to reach Little Cats Childcare LLC.', 'mint')}
<section class="contact-section section-shell"><div class="contact-details">${badge('Find us in Cashion')}<h2>Small place. <em>Open conversation.</em></h2><div class="contact-rows"><div class="contact-row"><span>01 / CALL</span><a href="${phone}">${esc(site.phoneDisplay)} ↗</a></div><div class="contact-row"><span>02 / EMAIL</span><a href="${mail}">${esc(site.email)} ↗</a></div><div class="contact-row"><span>03 / VISIT</span><p>${esc(site.street)}<br/>${esc(site.city)}, ${esc(site.stateCode)} ${esc(site.postalCode)}</p><a class="tiny-map" href="${map}" target="_blank" rel="noopener noreferrer">Get directions ↗</a></div><div class="contact-row"><span>04 / HOURS</span><p>Monday–Friday<br/>${esc(site.weekdayHours)}<br/><small>School-year operation</small></p></div></div></div><div class="contact-form-box"><div class="form-title"><span class="mini-caps">A LITTLE NOTE / FROM YOU TO US</span><h2>Drop a line <span aria-hidden="true">✷</span></h2><p>This form opens your email app; no message is stored by this website.</p></div><form id="contact-form" data-contact-form data-to-email="${esc(site.email)}" novalidate><label for="parent-name">Your name</label><input id="parent-name" name="name" type="text" autocomplete="name" placeholder="Your name" required maxlength="100"/><label for="parent-email">Your email</label><input id="parent-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required maxlength="180"/><label for="parent-subject">I'm asking about</label><select id="parent-subject" name="subject"><option value="General childcare question">General childcare question</option><option value="Infant care">Infant care</option><option value="Toddler care">Toddler care</option><option value="Preschool care">Preschool care</option><option value="Availability and tuition">Availability and tuition</option></select><label for="parent-message">Your message</label><textarea id="parent-message" name="message" rows="5" maxlength="1800" required placeholder="Hello! I'd like to know more about..."></textarea><p class="field-hint">Please don't include sensitive information about a child in your first message.</p><button class="button btn-ink form-submit" type="submit">Open my email <span aria-hidden="true">↗</span></button><p class="form-status" data-form-status role="status" aria-live="polite"></p></form></div></section>
<section class="license-contact section-shell"><div><span class="mini-caps">OFFICIAL STATE RECORD</span><h2>Want to check the <em>listing?</em></h2></div><div><p>Little Cats Childcare LLC appears on the Oklahoma Human Services childcare locator as center ${esc(site.licenseId)}.</p>${licenceLink}</div></section>
`
  };
  function pageLead(kicker,title,desc,theme){
    return `<section class="page-lead section-shell page-${theme}"><div class="page-lead-top"><span class="mini-caps">${kicker}</span><span>THE LITTLE CATS FIELD GUIDE ✳</span></div><h1>${title}</h1><div class="page-lead-bottom"><p>${desc}</p><div class="page-lead-mark" aria-hidden="true">✳</div></div></section>`;
  }
  function faq(q,a){return `<details class="faq-item"><summary><span class="faq-symbol" aria-hidden="true">+</span><span>${q}</span></summary><p>${a}</p></details>`;}
  function bottomCta(big,small,to,label){return `<section class="bottom-cta section-shell"><div><span class="mini-caps">A LITTLE NOTE BEFORE YOU GO</span><h2>${big}</h2><p>${small}</p></div>${linkButton(to,label,'btn-cream')}</section>`;}
  const canonical = site.domain?.startsWith('https://')?`${site.domain.replace(/\/$/,'')}/${route.slug ? `${route.slug}/`:''}`:null;
  const schema = {
    '@context': 'https://schema.org', '@type':'ChildCare',
    name:site.name,
    ...(canonical?{url: canonical}:{}),
    telephone:site.phoneE164, email:site.email,
    address: { '@type':'PostalAddress',streetAddress:site.street,addressLocality:site.city,addressRegion:site.stateCode,postalCode:site.postalCode,addressCountry:'US' },
    openingHoursSpecification: [{ '@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:site.opens24,closes:site.closes24 }],
    sameAs:[site.licenseUrl, ...(site.socialLinks??[]).filter(x=>x.verified===true).map(x=>x.url)]
  };
  const body = story[route.key]();
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="theme-color" content="#f8f4e9"/>
<meta name="color-scheme" content="light"/>
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.desc)}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${esc(m.title)}"/>
<meta property="og:description" content="${esc(m.desc)}"/>
${canonical ? `<link rel="canonical" href="${esc(canonical)}"/><meta property="og:url" content="${esc(canonical)}"/>` : ''}
<meta property="og:image" content="${esc(site.domain?.startsWith('https://') ? site.domain.replace(/\/$/,'')+'/branding/logo.png' : mediaUrl('logo'))}"/>
<meta name="twitter:card" content="summary"/>
<link rel="icon" type="image/png" href="${prefix}branding/favicon.png"/>
<link rel="stylesheet" href="${prefix}styles/site.css"/>
<script type="application/ld+json">${jsonSafe(schema)}</script>
</head>
<body data-page="${route.key}">
<a class="skip-link" href="#main">Skip to content</a>
<div class="hello-strip"><div class="container"><span><b>✳</b> LITTLE CATS CHILDCARE LLC</span><span>CASHION, OKLAHOMA <b>✳</b> SCHOOL-YEAR CARE</span><a href="${phone}">CALL ${esc(site.phoneDisplay)} <span aria-hidden="true">↗</span></a></div></div>
<header class="site-header" data-site-header><div class="container header-inner"><a class="brand" href="${href('')}" aria-label="Little Cats Childcare, home">${image('logo','brand-logo','width="58" height="58"')}<span class="brand-type"><strong>little cats.</strong><small>CHILDCARE LLC / CASHION</small></span></a><button type="button" class="menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span><span></span><span></span></button><nav class="site-nav" id="site-nav" data-menu aria-label="Main navigation">${nav}<a class="nav-phone" href="${phone}">Call the center ↗</a></nav><a class="header-cta" href="${href('contact')}">Let's talk <span aria-hidden="true">↗</span></a></div></header>
<main id="main">${body}</main>
<footer class="site-footer"><div class="section-shell"><div class="footer-top"><div class="footer-branding"><a class="footer-brand" href="${href('')}">${image('logo','','width="64" height="64"')}<span><strong>little cats.</strong><small>CHILDCARE LLC / CASHION</small></span></a><p>A little space for big beginnings.<br/>Cashion, Oklahoma.</p><div class="footer-social">${social}</div></div><div class="footer-nav-block"><h2>Find your way</h2><nav aria-label="Footer navigation">${ROUTES.map(r=>`<a href="${href(r.slug)}">${esc(r.label)}</a>`).join('')}</nav></div><div class="footer-contact-block"><h2>Say hello</h2><a href="${phone}">${esc(site.phoneDisplay)}</a><a href="${mail}">${esc(site.email)}</a><p>${esc(address)}</p><p class="footer-hours">Mon–Fri · ${esc(site.weekdayHours)}<br/>School-year only</p></div></div><div class="footer-bottom"><span>© <span data-current-year>2026</span> Little Cats Childcare LLC</span><span>Oklahoma listing: <a target="_blank" rel="noopener noreferrer" href="${esc(site.licenseUrl)}">${esc(site.licenseId)} ↗</a></span><a href="#main">Back to top ↑</a></div></div></footer>
<script src="${prefix}scripts/site.js" defer></script>
</body>
</html>`;
}
