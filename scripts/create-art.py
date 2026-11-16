from pathlib import Path
import cairosvg
ROOT=Path(__file__).resolve().parents[1]
ART=ROOT/'public/art'; BRAND=ROOT/'public/branding'
ART.mkdir(parents=True,exist_ok=True); BRAND.mkdir(parents=True,exist_ok=True)
INK='#252927'; CREAM='#fff9ee'; ORANGE='#fa7650'; BLUE='#4378c9'; MINT='#b8dccc'; YELLOW='#f5c960'; PINK='#facbbf'

def wrap(w,h,body,bg='none',extra=''):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none"><defs><filter id="shadow" x="-30%" y="-30%" width="180%" height="190%"><feDropShadow dx="5" dy="9" stdDeviation="0" flood-color="#252927" flood-opacity=".18"/></filter><pattern id="dots" width="21" height="21" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.3" fill="{INK}" fill-opacity=".12"/></pattern></defs>{f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg!='none' else ''}{body}{extra}</svg>'''

def cat(x,y,s=1,fill=ORANGE,eye='open',rotate=0,scarffill=None):
    # Parent form uses 300x390 local coordinate space, feet + tail included.
    eyes='''<path d="M95 138q17-13 34 0M174 138q17-13 34 0" stroke="#252927" stroke-width="6" stroke-linecap="round"/>''' if eye=='sleep' else '''<ellipse cx="112" cy="140" rx="5.8" ry="10" fill="#252927"/><ellipse cx="194" cy="140" rx="5.8" ry="10" fill="#252927"/>'''
    scarf=f'<path d="M89 205Q149 229 217 205L204 242Q153 266 99 243Z" fill="{scarffill}" stroke="{INK}" stroke-width="7" stroke-linejoin="round"/><path d="M184 226L230 279L191 281L163 240" fill="{scarffill}" stroke="{INK}" stroke-width="7"/>' if scarffill else ''
    return f'''<g transform="translate({x} {y}) rotate({rotate} 145 185) scale({s})" stroke-linejoin="round" stroke-linecap="round">
      <path d="M219 301C285 289 275 227 248 224" stroke="{INK}" stroke-width="34"/>
      <path d="M220 299C274 291 262 244 245 242" stroke="{fill}" stroke-width="23"/>
      <path d="M100 210C76 250 77 336 100 355Q151 386 214 357C237 328 224 249 203 214Z" fill="{fill}" stroke="{INK}" stroke-width="8"/>
      <ellipse cx="152" cy="297" rx="49" ry="61" fill="#fff9ec" opacity=".85"/>
      <path d="M98 204L77 73L133 97L150 89L207 96L251 67L229 212Q159 244 98 204Z" fill="{fill}" stroke="{INK}" stroke-width="8"/>
      <path d="M89 89L119 107L94 129Z" fill="#fdb1a6"/>
      <path d="M236 86L208 107L226 130Z" fill="#fdb1a6"/>
      {eyes}
      <path d="M148 155L160 165L171 155Z" fill="{INK}"/>
      <path d="M159 166Q148 180 139 175M159 166Q169 179 179 175" stroke="{INK}" stroke-width="5"/>
      <path d="M80 162L123 168M77 182L121 177M198 166L240 160M199 178L241 187" stroke="{INK}" stroke-width="4"/>
      <ellipse cx="100" cy="166" rx="16" ry="9" fill="#ee8e80" opacity=".55"/><ellipse cx="214" cy="166" rx="16" ry="9" fill="#ee8e80" opacity=".55"/>
      {scarf}
      <path d="M118 348C106 358 111 373 125 375H161C177 375 170 349 156 346M164 349C159 360 161 374 178 375H209C225 375 226 349 210 344" fill="{fill}" stroke="{INK}" stroke-width="7"/>
    </g>'''

def star(x,y,s=1,fill=YELLOW):return f'<path transform="translate({x} {y}) scale({s})" d="M0 -36L8 -10L35 -8L12 9L20 34L0 19L-20 34L-12 9L-35 -8L-8 -10Z" fill="{fill}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'

def block(x,y,size,fill,letter=''):
    return f'''<g transform="translate({x} {y}) rotate(-4 {size/2} {size/2})" filter="url(#shadow)"><rect x="0" y="0" width="{size}" height="{size}" rx="9" fill="{fill}" stroke="{INK}" stroke-width="6"/>{f'<text x="{size/2}" y="{size*.7}" text-anchor="middle" font-family="Georgia,serif" font-size="{size*.6}" font-weight="bold" fill="{INK}">{letter}</text>' if letter else ''}</g>'''

hero=f'''
<path d="M52 104L278 36L386 92L607 40L812 150L972 56V673L849 763L613 721L377 822L96 761Z" fill="#a7cfbd" stroke="{INK}" stroke-width="8"/>
<path d="M42 603Q259 517 450 619T953 579L962 830L58 834Z" fill="#ffdcad"/>
<circle cx="705" cy="257" r="182" fill="{YELLOW}" stroke="{INK}" stroke-width="8"/>
<path d="M63 658L925 650L972 767L20 768Z" fill="{BLUE}" stroke="{INK}" stroke-width="8"/>
<path d="M75 699L914 690M92 732L932 721" stroke="#fff5e5" stroke-width="6" stroke-dasharray="18 24"/>
{star(175,197,1.2,ORANGE)}{star(805,87,.55,CREAM)}{star(889,406,.9,PINK)}
<path d="M111 378q-41 34 0 69M136 388q-20 17 0 37M853 435q49-36 82 0" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>
{cat(194,175,1.12,ORANGE,scarffill='#c9e2fe')}
{cat(529,337,.79,BLUE,eye='sleep')}
{block(112,610,91,YELLOW,'A')}{block(192,558,87,PINK,'B')}{block(755,603,84,MINT,'C')}
<circle cx="679" cy="740" r="37" fill="{ORANGE}" stroke="{INK}" stroke-width="7"/><path d="M659 722L700 755M704 717L660 757" stroke="{INK}" stroke-width="4"/>
'''
(ART/'little-cats-world.svg').write_text(wrap(1000,860,hero))

inf=f'''
<path d="M20 430L80 140L296 38L534 60L615 290L528 486L213 493Z" fill="#f5d0bc" stroke="{INK}" stroke-width="7"/>
<circle cx="435" cy="131" r="60" fill="{YELLOW}"/><path d="M458 83q-46 12-27 86" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>
{star(138,129,.65,CREAM)}{star(490,289,.5,CREAM)}
{cat(124,164,.63,'#f7b06b',eye='sleep')}
<path d="M354 212Q434 189 519 234" stroke="{INK}" stroke-width="6" stroke-dasharray="9 12"/>
<path d="M385 193v-58M455 210v-55M512 236v-57" stroke="{INK}" stroke-width="4"/>
<path d="M372 143l13-20 14 21-14 20Z" fill="{BLUE}"/><circle cx="455" cy="163" r="16" fill="{ORANGE}"/>{star(513,189,.36,YELLOW)}
'''
(ART/'infants.svg').write_text(wrap(640,520,inf))

tod=f'''
<path d="M24 108L232 36L566 61L628 316L491 489L65 484Z" fill="#c0dfcf" stroke="{INK}" stroke-width="7"/>
{cat(58,115,.76,ORANGE)}
{block(370,330,106,PINK,'B')}{block(387,222,94,YELLOW,'A')}{block(505,359,73,BLUE,'C')}
{star(474,132,.64,YELLOW)}{star(117,71,.42,BLUE)}
<path d="M312 115q24-42 47 0M302 133q12-14 22 0" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>
'''
(ART/'toddlers.svg').write_text(wrap(640,520,tod))

pres=f'''
<path d="M24 125L243 43L556 65L619 391L421 501L64 470Z" fill="#d9d8fb" stroke="{INK}" stroke-width="7"/>
{cat(123,81,.79,BLUE,scarffill=YELLOW)}
<path d="M285 316Q354 279 440 306L522 275L523 425Q423 399 399 431Q353 393 269 417Z" fill="{CREAM}" stroke="{INK}" stroke-width="8" stroke-linejoin="round"/>
<path d="M395 309L399 431M321 346L371 353M424 348L484 334M424 378L480 365" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>
{star(495,142,.67,ORANGE)}{star(89,122,.43,YELLOW)}
'''
(ART/'preschool.svg').write_text(wrap(640,520,pres))

feature=f'''
<rect x="85" y="65" width="820" height="675" fill="#edcfb4" stroke="{INK}" stroke-width="9" transform="rotate(-2 500 400)"/>
<rect x="115" y="88" width="770" height="630" fill="#fff9ec" stroke="{INK}" stroke-width="7"/>
<path d="M216 488L347 457L453 491L459 643Q378 612 302 654Q253 631 212 638Z" fill="{MINT}" stroke="{INK}" stroke-width="7"/>
<path d="M301 462v191M239 531l42 5M345 526l68-12" stroke="{INK}" stroke-width="5"/>
{block(527,402,124,YELLOW,'1')}{block(646,451,102,PINK,'2')}{block(732,333,88,BLUE,'3')}
<g transform="translate(248 163) rotate(-18)"><rect x="0" y="0" width="50" height="265" rx="9" fill="{ORANGE}" stroke="{INK}" stroke-width="6"/><path d="M0 228L25 278L50 228Z" fill="#fde4bd" stroke="{INK}" stroke-width="6"/><rect x="0" y="0" width="50" height="32" fill="#fff9e6" stroke="{INK}" stroke-width="6"/></g>
<g transform="translate(324 141) rotate(13)"><rect x="0" y="0" width="43" height="239" rx="8" fill="{BLUE}" stroke="{INK}" stroke-width="6"/><path d="M0 202L21 255L43 202Z" fill="#fde4bd" stroke="{INK}" stroke-width="6"/></g>
<circle cx="599" cy="254" r="104" fill="{MINT}" stroke="{INK}" stroke-width="7"/>
{cat(518,150,.49,ORANGE,eye='sleep')}
{star(758,165,.82,ORANGE)}{star(160,180,.52,YELLOW)}
'''
(ART/'paper-world.svg').write_text(wrap(1000,800,feature))

about=f'''
<path d="M60 80L325 29L600 111L801 54L925 292L871 687L602 731L383 797L108 711L29 381Z" fill="#c2dfcb" stroke="{INK}" stroke-width="8"/>
<circle cx="692" cy="190" r="107" fill="{YELLOW}" stroke="{INK}" stroke-width="8"/>
<path d="M135 704L871 664L897 794L109 791Z" fill="{PINK}" stroke="{INK}" stroke-width="7"/>
{cat(156,203,1.11,ORANGE)}
{cat(485,284,.87,BLUE,eye='sleep')}
{star(147,161,.8,CREAM)}{star(827,333,.95,ORANGE)}
<path d="M398 149q30-47 67-10" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>
'''
(ART/'about-cats.svg').write_text(wrap(1000,820,about))

# A simple original replaceable mark; intentionally not claimed to be the center's authentic branding.
logo=f'''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<rect width="512" height="512" rx="128" fill="#4378c9"/>
<circle cx="257" cy="267" r="184" fill="#f5c960"/>
<path d="M113 241L94 92L218 148Q258 133 300 148L417 92L397 239Q412 357 256 380Q104 354 113 241Z" fill="#fa7650" stroke="#252927" stroke-width="20" stroke-linejoin="round"/>
<path d="M121 126L206 164L146 219Z" fill="#ffd9cc"/><path d="M387 123L305 164L369 220Z" fill="#ffd9cc"/>
<ellipse cx="199" cy="254" rx="12" ry="22" fill="#252927"/><ellipse cx="313" cy="254" rx="12" ry="22" fill="#252927"/>
<path d="M238 290L258 304L278 290Z" fill="#252927"/><path d="M258 304Q241 324 224 316M258 304Q275 324 290 316" fill="none" stroke="#252927" stroke-width="10" stroke-linecap="round"/>
<path d="M111 292L192 307M109 329L197 320M311 304L397 290M313 319L399 337" fill="none" stroke="#252927" stroke-width="10" stroke-linecap="round"/>
<circle cx="168" cy="298" r="18" fill="#d85448" opacity=".55"/><circle cx="344" cy="298" r="18" fill="#d85448" opacity=".55"/>
</svg>'''
(BRAND/'logo.svg').write_text(logo)
cairosvg.svg2png(bytestring=logo.encode(),write_to=str(BRAND/'logo.png'),output_width=512,output_height=512)
cairosvg.svg2png(bytestring=logo.encode(),write_to=str(BRAND/'favicon.png'),output_width=128,output_height=128)
print('created', len(list(ART.glob('*.svg'))),'illustrations and 3 logo files')
