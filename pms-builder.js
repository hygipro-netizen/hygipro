// ============================================
// HYGIPRO — Constructeur de PMS multi-métiers
// Structure conforme annexe II note de service DGAL/SDSSA 2022-349
// Métiers : boulangerie, restaurant, boucherie
// Zones "à remplir à la main" = pointillés (BLANK).
// ============================================

const BLANK='..................................................';

const DANGERS_BIO_MP=[
  ['Bacillus cereus','Végétaux, produits amylacés, prolifération durant les opérations de transformation','Important'],
  ['Clostridium botulinum','Toute matière première. Prolifération durant ou après les opérations de fabrication','Importance très élevée (toxine)'],
  ['Clostridium perfringens','Toute matière première. Prolifération durant ou après les opérations de fabrication','Important (toxine)'],
  ['Listeria monocytogenes','Toute matière première. Prolifération durant ou après les étapes de transformation','Importance élevée'],
  ['Salmonella spp','Ovoproduits, produits laitiers, viande','Importance élevée'],
  ['E. coli O157:H7','Viande de bœuf','Importance élevée'],
  ["E. coli (indicateur d'hygiène)",'Manipulation','Faible'],
  ['Shigella','Eau / salade','Important'],
  ['Staphylococcus aureus','Produits laitiers (lait cru), manipulation','Importance élevée'],
  ['Yersinia enterocolitica','Viande','Important'],
  ['Mycotoxines','Matière première (céréales, fruits à coque, lait), condition de conservation','Important'],
];

const DANGERS_CHIM=[
  ['Mycotoxines','Développement dans la matière première lors du stockage','Rare'],
  ['Dioxines, PCB','Tout type de matières premières','Rare'],
  ['Résidus phytosanitaires','Matières premières animales ou végétales','Rare'],
  ['Composés et éléments toxiques (plomb, zinc, cadmium...)','Tout type de matières premières','Rare'],
  ['Additifs alimentaires','Défaut de dosage','Rare'],
  ['Graisses et lubrifiants','Équipements','Rare'],
  ['Fluides frigorigènes','Installations frigorifiques','Rare'],
  ['Produits de lutte contre les nuisibles','Erreur de manipulation','Rare'],
  ['Résidus de produits de nettoyage','Matériel et équipements','Rare'],
  ['Composés de plastification','Conditionnements en plastique','Rare'],
  ['Produits interdits','Conditionnements','Rare'],
];

const DANGERS_PHYS=[
  ['Verre','Bouteille, ampoules','Possible'],
  ['Bois','Palettes, caisses en bois, pelle à pizza','Rare'],
  ['Pierre','Bâtiments, terre','Rare'],
  ['Métaux','Équipements, boîtes de conserve, employés','Possible'],
  ['Isolants','Matériaux des bâtiments','Rare'],
  ['Plastique','Conditionnements, palettes, équipements','Rare'],
  ['Objets personnels','Employés','Rare'],
];

const FICHES_MP_BASE=[
  {nom:'Eau',contam:"L'eau non potable est une source de contamination par des parasites et germes pathogènes. L'air ambiant est vecteur d'humidité (condensation, givre des installations frigorifiques).",multi:"L'eau stagnante est contaminée par l'air, les poussières et débris. Les germes peuvent être véhiculés aux aliments.",mesures:["Eau du réseau contrôlée par les services de la commune ; demander un bulletin d'analyses au moindre doute","Limiter la condensation par calorifugeage des tuyauteries","Ne jamais utiliser l'eau de dégivrage (sauf nettoyage des sols)","Ne jamais laisser stagner d'eau (flaques, sous les meubles, enceintes)"]},
  {nom:'Farines, fécules, amidon, sucres et sirops',contam:"Farines et amidon renferment des particules volatiles que les courants d'air véhiculent. Insectes et rongeurs peuvent contaminer ces produits au stockage.",multi:"L'humidité de l'air, remontées d'égout ou inondation de la réserve provoquent l'humidification des produits secs.",mesures:["Vérifier l'intégrité du conditionnement à réception","Ne pas balayer à sec pendant le travail","Lutter contre les insectes et rongeurs","Transvaser le contenu du sac dans un bac à farine / sucre","Ne pas stocker à même le sol","Ne pas laisser de récipients ouverts dans les réserves"]},
  {nom:'Œufs (coquilles)',contam:"Une coquille fêlée ou nettoyée permet le passage de germes (Salmonelles). La clarifieuse peut être une source de contamination.",multi:"Le cassage de l'œuf à l'avance ou le stockage de ses parties favorise la multiplication des germes.",mesures:["Ne jamais utiliser d'œufs fêlés (sauf pâtes cuites)","Ne jamais nettoyer les œufs","Sortir seulement la quantité nécessaire","Se nettoyer les mains avant et après cassage","Ne pas pratiquer le cornage","Nettoyer et désinfecter la clarifieuse avant et après usage","Conserver les œufs en réfrigération (+4°C max)"]},
  {nom:'Ovoproduits',contam:"Après ouverture, les ovoproduits peuvent être contaminés par l'air ou les manipulations.",multi:"Milieu propice au développement des germes ; un mauvais stockage permet leur multiplication.",mesures:["Refermer les conditionnements entamés","Respecter les températures et durées de stockage (+4°C frais, -18°C congelé)","Après décongélation, conserver à +4°C max","Stocker au froid (+4°C), récipient fermé, 1 à 2 jours max après décongélation","Ne pas utiliser pour l'élaboration de bases sensibles"]},
  {nom:'Laits, crèmes, fromages blancs',contam:"Les laits et crèmes crus peuvent être source de contamination. Les crèmes Fleurettes en seau sont fragiles.",multi:"Au-dessus de +4°C, multiplication importante en quelques jours. Les produits UHT entamés se dégradent rapidement.",mesures:["Réserver l'usage à des préparations subissant un traitement thermique suffisant","Refermer le conditionnement entamé","Pour fabrications sensibles : pasteuriser (72°C, 4 minutes)","Respecter impérativement les DLC et températures","Conserver au froid positif (+4°C max)","Porter à ébullition avant utilisation si nécessaire"]},
  {nom:'Beurre',contam:"Le beurre, corps gras, est sensible aux odeurs environnantes et peut être contaminé.",multi:"Peu propice à la multiplication mais l'oxydation altère le produit.",mesures:["Ne pas stocker dans un emballage ouvert","Stocker à l'abri des odeurs","Vérifier systématiquement le conditionnement"]},
  {nom:'Fruits (frais, secs, confits, sirop, surgelés)',contam:"Les fruits peuvent être contaminés par des microorganismes telluriques (terre).",multi:"Les fruits secs peuvent être rincés, pochés ou macérés dans l'alcool.",mesures:["Rincer les fruits frais avant utilisation","Ne commander que les quantités nécessaires","Éliminer les fruits frais moisis à réception","Transvaser dans des récipients propres et fermés, conserver au froid (+4°C max)"]},
  {nom:'Chocolats, poudre de cacao, pâte de cacao',contam:"Peu riches en eau mais peuvent contaminer les produits sensibles.",multi:"Produits stables, peu favorables au développement des germes.",mesures:["Stocker en réserve sèche, à l'abri de l'humidité et de la lumière","Refermer soigneusement après usage","Utiliser la couverture de cacao pour les fabrications non cuites sensibles"]},
  {nom:'Légumes',contam:"Risque élevé : germes telluriques (terre) ou moisissures. Conditionnements souillés, déchets.",multi:"Produits IVe gamme prédécoupés : dégradation rapide. Après décongélation : multiplication rapide.",mesures:["Lavage à l'eau potable avant incorporation (eau javellisée 12° puis rinçage vinaigré)","Éliminer les emballages hors zone de fabrication","Nettoyer et désinfecter plan de travail et ustensiles","Stocker au froid positif (+4°C max)","Éliminer les parties abîmées","Ne jamais recongeler"]},
  {nom:'Viandes et charcuteries',contam:"Entrant dans les pâtés, viandes cuites sous-vide, charcuteries. Peut être contaminé à l'origine.",multi:"Milieu idéal de prolifération de germes.",mesures:["Vérifier l'état de fraîcheur et les DLC à réception","Éliminer l'emballage avant stockage ou reconditionner","Nettoyer et désinfecter les couteaux-trancheurs (alcool 70°)","Stocker à +4°C max, caisses à clayettes couvertes","Respecter DLC/DLUO et la rotation des stocks"]},
  {nom:'Fromages',contam:"Contiennent des germes et moisissures utiles mais susceptibles de contaminer d'autres produits.",multi:"En présence d'air et d'humidité, multiplication des micro-organismes.",mesures:["Conserver dans l'emballage d'origine, au froid positif, à l'abri de l'air et l'humidité","Éliminer les fromages anormalement moisis ou DLC dépassée","Conserver au froid positif (+6°C max)","Utiliser rapidement après ouverture du sachet"]},
  {nom:'Conserves et semi-conserves',contam:"Conserves de viande : risque botulisme si mal fabriquées. À l'ouverture, contamination possible.",multi:"Semi-conserves non stabilisées : multiplication à température ambiante. Oxydation de la boîte après ouverture.",mesures:["Vérifier la présence d'une marque de salubrité","Éliminer les conserves flochées, bombées, becquées","Nettoyer les boîtes souillées avant ouverture","Respecter conservation (froid positif +4°C max)","Transférer dans un récipient couvert si la boîte n'est pas utilisée en totalité"]},
  {nom:'Produits réceptionnés surgelés',contam:"L'emballage des produits congelés peut être source de contamination.",multi:"Effet bactériostatique du froid négatif ; à la décongélation, la multiplication reprend.",mesures:["Éviter de stocker les produits livrés congelés avec leur emballage","Décongeler en enceinte réfrigérée (≤ +4°C)","Ne jamais recongeler un produit décongelé","Conserver la DLUO et l'identification du lot / fournisseur"]},
];

const PMS_METIERS={
  boulangerie:{
    label:'Boulangerie-Pâtisserie',
    sousTitre:'Boulangerie · Pâtisserie · Viennoiserie',
    produits:'Pains, viennoiseries, pâtisseries et sandwichs',
    diagrammes:['Pain','Sandwich','Tarte aux fruits'],
    temperatures:[
      ['Crèmes pâtissières, chantilly, entremets','≤ +4°C'],['Ovoproduits','≤ +4°C'],['Beurre, matières grasses','≤ +8°C'],
      ['Viandes, charcuteries (sandwiches)','≤ +4°C'],['Produits surgelés','≤ -18°C'],['Pain, viennoiserie sèche','Ambiante'],
    ],
    fiches:FICHES_MP_BASE,
    prpo:[
      ['PrPo 1 : température de réception des matières premières','Viandes +2°C / BOF* +4°C','Viandes +4°C / BOF* +6°C',"Arrêté du 21 décembre 2009"],
      ['PrPo 2 : température de stockage (MP, produits intermédiaires et finis)','0 à +2°C','+3°C',"Arrêté du 21 décembre 2009"],
    ],
  },
  restaurant:{
    label:'Restaurant / Restauration',
    sousTitre:'Restauration commerciale · Préparation et service de repas',
    produits:'Entrées, plats chauds, desserts, préparations froides',
    diagrammes:['Plat chaud','Entrée froide','Dessert'],
    temperatures:[
      ['Viandes hachées','≤ +2°C'],['Abats','≤ +3°C'],['Viandes, volailles, charcuterie','≤ +4°C'],
      ['Poissons (sous glace)','0 à +2°C'],['Préparations froides, crudités','≤ +4°C'],['Plats cuisinés réfrigérés','≤ +3°C'],
      ['Produits surgelés','≤ -18°C'],['Maintien au chaud','≥ +63°C'],['Cuisson à cœur (général)','≥ +63°C'],['Cuisson volaille','≥ +74°C'],
    ],
    fiches:FICHES_MP_BASE.concat([
      {nom:'Volailles',contam:'Salmonelles et Campylobacter fréquents en surface.',multi:'Multiplication rapide hors froid.',mesures:["Stockage séparé +4°C max","Ne jamais laver (projections de germes)","Planche et couteaux dédiés","Cuisson à cœur ≥74°C"]},
      {nom:'Poissons et produits de la mer',contam:'Histamine, parasites (Anisakis), altération rapide.',multi:'Multiplication très rapide hors froid.',mesures:["Réception sous glace 0 à +2°C","Contrôle fraîcheur (œil, odeur, branchies)","Congélation -20°C 24h si consommation crue","Utilisation rapide"]},
    ]),
    prpo:[
      ['PrPo 1 : température de réception','Viandes +2°C / autres +4°C','Viandes +4°C / autres +6°C','Arrêté du 21 décembre 2009'],
      ['PrPo 2 : température de stockage','0 à +3°C','+4°C','Arrêté du 21 décembre 2009'],
      ['CCP 1 : cuisson à cœur','≥ 63°C (volaille 74°C)','—','Destruction des germes pathogènes'],
      ['CCP 2 : refroidissement rapide','+63°C → +10°C en < 2h','—','Limitation de la multiplication'],
    ],
  },
  boucherie:{
    label:'Boucherie-Charcuterie',
    sousTitre:'Boucherie · Charcuterie · Préparations de viande',
    produits:'Viandes découpées, préparations de viande, charcuteries maison',
    diagrammes:['Découpe / désossage','Préparation hachée','Fabrication charcuterie'],
    temperatures:[
      ['Viandes hachées','≤ +2°C'],['Préparations de viande','≤ +4°C'],['Abats','≤ +3°C'],['Carcasses (réception)','≤ +7°C'],
      ['Viandes de découpe','≤ +4°C'],['Volailles','≤ +4°C'],['Charcuterie cuite','≤ +4°C'],['Produits surgelés','≤ -18°C'],
      ['Cuisson charcuterie à cœur','≥ +70°C'],['Refroidissement rapide','+63°C → +10°C en < 2h'],
    ],
    fiches:FICHES_MP_BASE.concat([
      {nom:'Carcasses et viandes fraîches',contam:"Contamination de surface lors de l'abattage et du transport.",multi:'Multiplication rapide hors froid.',mesures:["Réception ≤+7°C (carcasses), +4°C (découpe)","Crochets et rails propres","Désinfection quotidienne du laboratoire","Local de découpe +12°C max"]},
      {nom:'Viandes hachées et préparations',contam:'Surface développée = charge microbienne élevée.',multi:'Multiplication intense.',mesures:["Hachage extemporané","+2°C max immédiat","DLC très courte","Traçabilité du lot d'origine obligatoire","Hachoir désinfecté avant usage"]},
      {nom:'Charcuterie maison (pâtés, terrines, saucisses)',contam:'Listeria, Salmonelles, botulisme (conserves).',multi:'Multiplication si refroidissement lent.',mesures:["Cuisson à cœur ≥70°C","Refroidissement rapide +63→+10°C en <2h","Nitrites dosés précisément","Barème de stérilisation respecté pour les conserves"]},
    ]),
    prpo:[
      ['PrPo 1 : température de réception','Carcasses +7°C / découpe +4°C / hachées +2°C','+ tolérance arrêté','Arrêté du 21 décembre 2009'],
      ['PrPo 2 : température de stockage','0 à +2°C (hachées) / +4°C (découpe)','+3°C','Arrêté du 21 décembre 2009'],
      ['CCP 1 : cuisson charcuterie à cœur','≥ 70°C','—','Destruction des germes pathogènes'],
      ['CCP 2 : refroidissement rapide','+63°C → +10°C en < 2h','—','Limitation de la multiplication'],
    ],
  },
};

// ============================================================
// RENDU PMS — version sobre & paginée (Phase 1)
// Palette institutionnelle, logo discret, pagination blindée.
// La section DONNÉES ci-dessus (PMS_METIERS, DANGERS_*) est inchangée.
// ============================================================

const DOTS='..................................................';

function rows3(arr){return arr.map(d=>`<tr><td><strong>${d[0]}</strong></td><td>${d[1]}</td><td>${d[2]}</td></tr>`).join('');}
function fichesHtml(fiches){
  return fiches.map(f=>`<div class="mp avoid"><h4>${f.nom}</h4><p><strong>Contamination :</strong> ${f.contam}</p><p><strong>Multiplication :</strong> ${f.multi}</p><p class="mpm"><strong>Mesures de maîtrise :</strong></p><ul>${f.mesures.map(m=>`<li>${m}</li>`).join('')}</ul></div>`).join('');
}

function buildPMSHtml(cfg){
  const M=PMS_METIERS[cfg.metier]||PMS_METIERS.boulangerie;
  const dateGen=new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
  const logoUrl='https://hygipro.vercel.app/logo.png';

  const usersRows=(cfg.users||[]).map(u=>`<tr><td>${u.name}</td><td>${u.role||'—'}</td><td>${DOTS.slice(0,20)}</td><td>${DOTS.slice(0,20)}</td></tr>`).join('')
    ||`<tr><td>${DOTS.slice(0,24)}</td><td>${DOTS.slice(0,16)}</td><td>${DOTS.slice(0,20)}</td><td>${DOTS.slice(0,20)}</td></tr><tr><td>${DOTS.slice(0,24)}</td><td>${DOTS.slice(0,16)}</td><td>${DOTS.slice(0,20)}</td><td>${DOTS.slice(0,20)}</td></tr>`;
  const zonesRows=(cfg.zones||[]).map(z=>`<tr><td>${z.name}</td><td>${z.threshold_min!=null?z.threshold_min+'°C':DOTS.slice(0,12)}</td><td>${z.threshold_max!=null?z.threshold_max+'°C':DOTS.slice(0,12)}</td><td>2×/jour</td></tr>`).join('')
    ||`<tr><td>${DOTS.slice(0,28)}</td><td>${DOTS.slice(0,12)}</td><td>${DOTS.slice(0,12)}</td><td>${DOTS.slice(0,12)}</td></tr>`;
  const nettRows=(cfg.nettoyage||[]).map(n=>`<tr><td>${n.zone||''}</td><td>${n.surface||''}</td><td>${n.frequence||''}</td><td>${n.produit||''}</td><td>${n.dilution||'PAE'}</td></tr>`).join('')
    ||`<tr><td colspan="5" style="text-align:center;color:#94a3b8">Plan de nettoyage à configurer dans HygiPro</td></tr>`;
  const tempRows=M.temperatures.map(t=>`<tr><td>${t[0]}</td><td class="tc"><strong>${t[1]}</strong></td></tr>`).join('');
  const prpoRows=M.prpo.map(p=>`<tr><td><strong>${p[0]}</strong></td><td>${p[1]}</td><td class="tc">${p[2]}</td><td>${p[3]}</td></tr>`).join('');
  const diagList=M.diagrammes.map((d,i)=>`<li>Annexe ${13+i} : Diagramme de fabrication — ${d}</li>`).join('');

  // Fiches MP paginées : 3 par page (garantit le tenir même pour les fiches longues)
  const FICHES_PAR_PAGE=3;
  const fichesPages=[];
  for(let i=0;i<M.fiches.length;i+=FICHES_PAR_PAGE) fichesPages.push(M.fiches.slice(i,i+FICHES_PAR_PAGE));
  const fichesSections=fichesPages.map((chunk,idx)=>`
  <section class="page">
    ${pageHead('III · Fiches matières premières',logoUrl)}
    <h1>III.3 Fiches matières premières${fichesPages.length>1?` <span class="sub">(${idx+1}/${fichesPages.length})</span>`:''}</h1>
    ${idx===0?`<p>Pour chaque famille de matières premières : sources de contamination, conditions de multiplication et mesures de maîtrise.</p>`:`<p class="cont">Suite des fiches matières premières.</p>`}
    ${fichesHtml(chunk)}
    ${pageFoot()}
  </section>`).join('');

  // Grille de relevé température vierge (2 blocs : jours 1-16 / 17-31)
  function tempGrid(title,temps){
    function block(s,e){
      const days=[];for(let d=s+1;d<=e;d++)days.push(d);
      const th=days.map(d=>`<th>${d}</th>`).join('');
      const rows=temps.map(t=>`<tr><td class="gt">${t}</td>${days.map(()=>'<td></td>').join('')}</tr>`).join('');
      return `<table class="grid"><thead><tr><th class="gt">J/T</th>${th}</tr></thead><tbody>${rows}</tbody></table>`;
    }
    return `<p class="gtitle"><strong>${title}</strong></p><p class="gsub">Mois : ____________  Année : ________</p>${block(0,16)}<div class="gspace"></div>${block(16,31)}`;
  }

  const cerfaPage=cfg.cerfa?`
  <section class="page">
    ${pageHead("Déclaration d'activité · CERFA",logoUrl)}
    <h1>Déclaration d'activité (CERFA n°16243)</h1>
    <div class="box info avoid"><span class="bt">Cadre réglementaire</span> Tout établissement manipulant des denrées d'origine animale doit déclarer son activité à la DDPP avant ouverture, et à chaque changement d'exploitant, d'adresse ou d'activité (CE 852/2004). Depuis le 1<sup>er</sup> janvier 2023, le formulaire commun est le CERFA n°16243.</div>
    <h3>Démarche</h3>
    <ul>
      <li>Remplir le formulaire sur entreprendre.service-public.fr ou mesdemarches.agriculture.gouv.fr</li>
      <li>Renseigner l'identification de l'établissement (SIRET, adresse, responsable)</li>
      <li>Cocher les activités, dater et signer</li>
      <li>Transmettre à la DDPP du département et conserver le récépissé</li>
    </ul>
    <h3>Coordonnées de la DDPP</h3>
    <table><tbody>
      <tr><td style="width:35%"><strong>Direction (DDPP)</strong></td><td>${cfg.ddppNom||DOTS}</td></tr>
      <tr><td><strong>Adresse</strong></td><td>${cfg.ddppAdresse||DOTS}</td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${cfg.ddppTel||DOTS.slice(0,30)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${cfg.ddppEmail||DOTS.slice(0,36)}</td></tr>
    </tbody></table>
    <p><strong>Déclaration faite le :</strong> ${DOTS.slice(0,26)} &nbsp; <strong>N° récépissé :</strong> ${DOTS.slice(0,26)}</p>
    <div class="box crit avoid"><span class="bt">Pièce à joindre</span> Joindre l'accusé de réception de la déclaration signée par la DDPP ci-dessous.</div>
    <div class="recepisse">Espace récépissé DDPP</div>
    ${pageFoot()}
  </section>`:'';

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>PMS — ${cfg.nom}</title>
<style>
/* ===== Palette sobre institutionnelle ===== */
:root{--navy:#1F3864;--accent:#2E75B6;--ink:#222;--muted:#595959;--line:#BFBFBF;--zebra:#F4F6F9;--red:#C00000;--logo:url('${logoUrl}')}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Calibri,Arial,sans-serif;color:var(--ink);font-size:11pt;line-height:1.5}

/* ===== Page A4 ===== */
.page{width:210mm;min-height:284mm;padding:13mm 15mm;margin:0 auto;position:relative;display:flex;flex-direction:column;page-break-after:always;background:#fff}
.page:last-child{page-break-after:auto}
.pbody{flex:1}

/* ===== En-tête / pied de page (répétés par section) ===== */
.phead{display:flex;align-items:center;justify-content:space-between;border-bottom:1.5px solid var(--navy);padding-bottom:3mm;margin-bottom:7mm}
.phead .pl{display:flex;align-items:center;gap:8px}
.phead .logo{width:22px;height:30px;background:var(--logo) center/contain no-repeat}
.phead .pt{font-size:8.5pt;color:var(--muted)}
.phead .pr{font-size:8.5pt;color:var(--muted)}
.pfoot{margin-top:8mm;border-top:1px solid var(--line);padding-top:2.5mm;display:flex;justify-content:space-between;font-size:8pt;color:var(--muted)}

/* ===== Couverture ===== */
.cover{width:210mm;min-height:297mm;padding:40mm 22mm;margin:0 auto;display:flex;flex-direction:column;page-break-after:always;background:#fff;text-align:center}
.cover .clogo{width:64px;height:84px;background:var(--logo) center/contain no-repeat;margin:0 auto 16mm}
.cover h1.ct{font-size:32pt;font-weight:800;color:var(--navy);letter-spacing:.5px}
.cover .cmet{font-size:18pt;color:var(--accent);margin-top:4mm;margin-bottom:18mm}
.cover .cfield{font-size:13pt;margin-bottom:5mm}
.cover .cfield b{color:var(--navy)}
.cover .cver{font-size:11pt;color:var(--muted);margin-top:6mm}
.cover .cbadge{margin-top:auto;font-size:9.5pt;color:var(--muted);border-top:1px solid var(--line);padding-top:6mm}

/* ===== Titres ===== */
h1{font-size:17pt;font-weight:800;color:var(--navy);border-bottom:2.5px solid var(--accent);padding-bottom:2mm;margin-bottom:4mm;page-break-after:avoid}
h1 .sub{font-size:11pt;color:var(--muted);font-weight:600}
h2{font-size:13pt;font-weight:700;color:var(--accent);margin:6mm 0 2.5mm;page-break-after:avoid}
h3{font-size:11.5pt;font-weight:700;color:#404040;margin:4mm 0 2mm;page-break-after:avoid}
h4{font-size:11pt;font-weight:700;color:var(--navy);margin-bottom:2mm}
p{margin-bottom:2.5mm;color:#333;text-align:justify}
p.cont{color:var(--muted);font-style:italic}
ul{margin:1.5mm 0 3mm 6mm}
li{margin-bottom:1mm}
sup{font-size:7pt}

/* ===== Tableaux ===== */
table{width:100%;border-collapse:collapse;margin:2.5mm 0 5mm;font-size:9.5pt}
th{background:var(--navy);color:#fff;font-weight:600;text-align:left;padding:6px 9px;border:.5px solid var(--navy);font-size:8.5pt;text-transform:uppercase;letter-spacing:.3px}
td{padding:6px 9px;border:.5px solid var(--line);color:#333;vertical-align:top}
tr:nth-child(even) td{background:var(--zebra)}
td.tc{text-align:center;white-space:nowrap}
table.danger th{background:var(--red);border-color:var(--red)}

/* ===== Méthode 5M ===== */
.m5{border:.5px solid var(--line);margin:2.5mm 0 5mm;font-size:9.5pt}
.m5 .r{display:flex;border-bottom:.5px solid var(--line)}
.m5 .r:last-child{border-bottom:none}
.m5 .k{width:32%;padding:6px 9px;background:var(--zebra);font-weight:700;color:var(--navy)}
.m5 .v{width:68%;padding:6px 9px;color:#333}

/* ===== Fiches matières premières ===== */
.mp{background:var(--zebra);border-left:3px solid var(--accent);padding:6px 11px;margin:3mm 0;border-radius:0 3px 3px 0}
.mp h4{margin-bottom:1.5mm}
.mp p{font-size:9.5pt;margin-bottom:1mm}
.mp p.mpm{margin-top:1.5mm}
.mp ul{font-size:9.5pt;margin-top:.5mm}

/* ===== Encadrés ===== */
.box{padding:7px 12px;margin:3mm 0;font-size:9.5pt;border-left:4px solid}
.box .bt{display:block;font-weight:700;font-size:8.5pt;text-transform:uppercase;margin-bottom:1.5mm}
.box.info{background:#EAF1FB;border-left-color:var(--accent)}.box.info .bt{color:var(--navy)}
.box.crit{background:#FDECEA;border-left-color:var(--red);color:#7a1c12}.box.crit .bt{color:var(--red)}
.box.ok{background:#EAF6EF;border-left-color:#2E8B57}.box.ok .bt{color:#1E6B43}

/* ===== Sommaire ===== */
.toc{margin:0}
.toc .row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px dotted var(--line);font-size:10.5pt}
.toc .row .t{color:var(--navy)}
.toc .row .s{padding-left:6mm;color:var(--muted)}
.toc .row .pg{color:var(--accent);font-weight:700}

/* ===== Grilles de relevé ===== */
.gtitle{margin:2mm 0 1mm;color:var(--navy)}
.gsub{font-size:9pt;color:var(--muted);margin-bottom:2mm}
.gspace{height:3mm}
table.grid{font-size:7.5pt}
table.grid th{padding:3px 2px;text-align:center;font-size:7pt}
table.grid td{padding:5px 2px}
table.grid td.gt,table.grid th.gt{background:var(--zebra);color:var(--navy);font-weight:700;text-align:center;width:9%}
table.grid th.gt{background:var(--navy);color:#fff}

/* ===== Récépissé / signature ===== */
.recepisse{border:1.5px dashed #cbd5e1;border-radius:6px;height:36mm;display:flex;align-items:center;justify-content:center;color:#9aa7b8;font-size:10pt;margin:3mm 0}
.signline{margin-top:14mm;border-top:1px solid #94a3b8;width:78mm;padding-top:2mm;font-size:9.5pt;color:var(--muted)}

/* ===== PAGINATION BLINDÉE (le coeur de la correction) ===== */
tr,.mp,.box,.m5,.signline{page-break-inside:avoid}
thead{display:table-header-group}
h1,h2,h3,h4{page-break-after:avoid}
.avoid{page-break-inside:avoid}
@media print{
  .page,.cover{margin:0}
  tr,.mp,.box,.m5{page-break-inside:avoid}
  thead{display:table-header-group}
  h1,h2,h3,h4{page-break-after:avoid}
}
</style></head><body>

<!-- COUVERTURE (sobre) -->
<div class="cover">
  <div class="clogo"></div>
  <h1 class="ct">Plan de Maîtrise Sanitaire</h1>
  <div class="cmet">${M.label}</div>
  <div class="cfield"><b>Établissement :</b> ${cfg.nom||DOTS.slice(0,30)}</div>
  <div class="cfield"><b>Responsable :</b> ${cfg.responsable||DOTS.slice(0,30)}</div>
  <div class="cver">Version 1.0 — ${dateGen}</div>
  <div class="cbadge">Conforme Règlement CE 852/2004 · Note de service DGAL/SDSSA 2022-349 · HACCP<br>Édité par SASU DarTech Solution</div>
</div>

<!-- SOMMAIRE -->
<section class="page">
  ${pageHead('Sommaire',logoUrl)}
  <h1>Sommaire</h1>
  <p style="font-size:9.5pt;color:var(--muted)">Structure conforme à l'annexe II de la note de service DGAL/SDSSA 2022-349.</p>
  <div class="toc">
    <div class="row"><span class="t">I. Description des activités</span><span class="pg">3</span></div>
    <div class="row"><span class="t">II. Bonnes pratiques d'hygiène</span><span class="pg">4</span></div>
    <div class="row"><span class="t s">1. Le personnel</span><span class="pg">4</span></div>
    <div class="row"><span class="t s">2. Maintenance des locaux & équipements</span><span class="pg">5</span></div>
    <div class="row"><span class="t s">3. Plan de nettoyage et de désinfection</span><span class="pg">5</span></div>
    <div class="row"><span class="t s">4. Lutte contre les nuisibles</span><span class="pg">6</span></div>
    <div class="row"><span class="t s">5. Approvisionnement en eau</span><span class="pg">6</span></div>
    <div class="row"><span class="t s">6. Maîtrise des températures</span><span class="pg">7</span></div>
    <div class="row"><span class="t">III. Procédures basées sur les principes HACCP</span><span class="pg">8</span></div>
    <div class="row"><span class="t s">1. Champ d'application & analyse des dangers</span><span class="pg">8</span></div>
    <div class="row"><span class="t s">3. Fiches matières premières & étapes</span><span class="pg">10</span></div>
    <div class="row"><span class="t s">4. Points déterminants (CCP / PrPo)</span><span class="pg">13</span></div>
    <div class="row"><span class="t">IV. Traçabilité & non-conformes (TIAC)</span><span class="pg">15</span></div>
    ${cfg.cerfa?`<div class="row"><span class="t">Déclaration d'activité — CERFA</span><span class="pg">16</span></div>`:''}
    <div class="row"><span class="t">Fiches de relevé de température</span><span class="pg">17</span></div>
    <div class="row"><span class="t">V. Annexes</span><span class="pg">18</span></div>
    <div class="row"><span class="t">Validation et engagement</span><span class="pg">19</span></div>
  </div>
  <div class="box info avoid" style="margin-top:6mm"><span class="bt">Note importante</span> Ce document doit être complété, paraphé et maintenu à jour à chaque modification des processus de fabrication ou de la structure de l'établissement.</div>
  ${pageFoot()}
</section>

<!-- I. DESCRIPTION -->
<section class="page">
  ${pageHead('I · Description des activités',logoUrl)}
  <h1>I. Description des activités</h1>
  <h2>Organisation générale</h2>
  <table><tbody>
    <tr><td colspan="2" style="background:var(--navy);color:#fff;font-weight:700;text-transform:uppercase;font-size:8.5pt">Établissement</td></tr>
    <tr><td style="width:38%"><strong>Nom commercial</strong></td><td>${cfg.nom}</td></tr>
    ${cfg.raisonSociale?`<tr><td><strong>Raison sociale</strong></td><td>${cfg.raisonSociale}</td></tr>`:''}
    ${cfg.formeJuridique?`<tr><td><strong>Forme juridique</strong></td><td>${cfg.formeJuridique}</td></tr>`:''}
    <tr><td><strong>Adresse</strong></td><td>${cfg.adresse||DOTS}</td></tr>
    <tr><td><strong>N° SIRET</strong></td><td>${cfg.siret||DOTS.slice(0,30)}</td></tr>
    <tr><td><strong>Téléphone</strong></td><td>${[cfg.tel?'Port. '+cfg.tel:'',cfg.telFixe?'Fixe '+cfg.telFixe:''].filter(Boolean).join(' · ')||DOTS.slice(0,30)}</td></tr>
    <tr><td><strong>Courriel</strong></td><td>${cfg.email||DOTS.slice(0,34)}</td></tr>
    <tr><td><strong>Date d'ouverture</strong></td><td>${DOTS.slice(0,26)}</td></tr>
    <tr><td><strong>Responsable légal</strong></td><td>${cfg.responsable||DOTS.slice(0,30)}</td></tr>
    <tr><td><strong>Horaires de travail</strong></td><td>${DOTS.slice(0,32)}</td></tr>
    <tr><td><strong>Activité</strong></td><td>${M.label}</td></tr>
  </tbody></table>
  <p><strong>Déclaration d'activité CERFA faite le :</strong> ${DOTS.slice(0,26)}</p>
  <div class="box info avoid"><span class="bt">Rappel</span> Joindre l'accusé de réception de la déclaration signée par la DDPP en annexe.</div>
  ${pageFoot()}
</section>

<!-- II.1 PERSONNEL -->
<section class="page">
  ${pageHead("II · Bonnes pratiques d'hygiène",logoUrl)}
  <h1>II. Bonnes pratiques d'hygiène</h1>
  <h2>1. Le personnel — Plan de formation</h2>
  <p>Conformément au décret n°2011-731, au moins une personne peut justifier d'une formation en hygiène alimentaire adaptée à l'activité (stage effectué par ${DOTS.slice(0,26)} le ${DOTS.slice(0,18)}). À l'arrivée d'un nouveau membre, une formation orale est dispensée par le gérant.</p>
  <table><thead><tr><th>Nom</th><th>Poste</th><th>Formation hygiène</th><th>Date / À jour</th></tr></thead><tbody>${usersRows}</tbody></table>
  <h3>Tenue du personnel</h3>
  <p>Veste ou tee-shirt, pantalon, charlotte ou toque, chaussures de sécurité blanches adaptées au travail agro-alimentaire. Changée tous les jours. Port de bijoux interdit (tolérance alliance lisse sans pierre). Interdiction de fumer/vapoter, manger et boire en production.</p>
  <h3>Lavage des mains</h3>
  <p>Obligatoire à l'eau et au savon, systématiquement : prise de poste, après WC, après les pauses, avant de manipuler les denrées, après toute opération salissante.</p>
  <table><thead><tr><th style="width:12%">Étape</th><th>Méthode</th></tr></thead><tbody>
    <tr><td>1</td><td>Mouiller les mains et les avant-bras</td></tr>
    <tr><td>2</td><td>Prendre une dose de savon liquide bactéricide</td></tr>
    <tr><td>3</td><td>Frotter mains et avant-bras, vérifier les ongles, 30 secondes minimum</td></tr>
    <tr><td>4</td><td>Rincer abondamment</td></tr>
    <tr><td>5</td><td>Sécher avec un essuie-main à usage unique</td></tr>
  </tbody></table>
  <h3>État de santé et plaies</h3>
  <p>Visite médicale à l'embauche puis tous les 2 ans (Code du Travail). Toute plaie est nettoyée et désinfectée immédiatement : pansement + gant jetable renouvelé ; consulter un médecin si la plaie est profonde.</p>
  ${pageFoot()}
</section>

<!-- II.2-3 LOCAUX & NETTOYAGE -->
<section class="page">
  ${pageHead("II · Bonnes pratiques d'hygiène",logoUrl)}
  <h1>II.2 Locaux & nettoyage</h1>
  <h2>2. Maintenance des locaux et équipements</h2>
  <p>Maintenance curative en interne (travaux simples) ou externe par un prestataire (matériel de production, frigorifique). Maintenance préventive à compléter :</p>
  <table><thead><tr><th>Équipements</th><th>Organisme de révision</th><th>Téléphone</th><th>Fréquence</th></tr></thead><tbody>
    <tr><td>Installation frigorifique</td><td>${DOTS.slice(0,20)}</td><td>${DOTS.slice(0,16)}</td><td>1×/an</td></tr>
    <tr><td>Hotte d'extraction</td><td>${DOTS.slice(0,20)}</td><td>${DOTS.slice(0,16)}</td><td>2×/an</td></tr>
    <tr><td>${DOTS.slice(0,20)}</td><td>${DOTS.slice(0,20)}</td><td>${DOTS.slice(0,16)}</td><td>${DOTS.slice(0,12)}</td></tr>
  </tbody></table>
  <h2>3. Plan de nettoyage et de désinfection</h2>
  <p>Trois phases : pré-opérationnel (désinfection avant utilisation), opérationnel (surface, produit, matériel, mode, temps d'action), post-opérationnel (vérification et renouvellement).</p>
  <table><thead><tr><th>Zone</th><th>Surface</th><th>Fréquence</th><th>Produit</th><th>Dilution</th></tr></thead><tbody>${nettRows}</tbody></table>
  <div class="box ok avoid"><span class="bt">Méthode TACT — cercle de Sinner</span> Température, Action mécanique, Concentration, Temps : 4 facteurs indissociables. Débarrasser les souillures → appliquer/brosser → laisser agir → rincer → sécher (papier à usage unique).</div>
  <div class="box info avoid"><span class="bt">Enregistrement</span> Les validations de nettoyage sont enregistrées avec signature dans HygiPro. Fiches techniques et de sécurité consultables sur site.</div>
  ${pageFoot()}
</section>

<!-- II.4-5 NUISIBLES & EAU -->
<section class="page">
  ${pageHead("II · Bonnes pratiques d'hygiène",logoUrl)}
  <h1>II.4 Nuisibles & eau</h1>
  <h2>4. Lutte contre les nuisibles</h2>
  <p>La société prestataire ${DOTS.slice(0,26)} est en charge de la lutte (rongeurs et blattes), avec ${DOTS.slice(0,12)} passage(s)/an. Fiches techniques et plan d'appâtage tenus à disposition. En cas d'infestation : appel immédiat et fiche de non-conformité.</p>
  <div class="box crit avoid"><span class="bt">Insectes volants</span> En cas de présence avérée, un destructeur électrique d'insectes volants (DEIV) sera installé.</div>
  <h2>5. Approvisionnement en eau</h2>
  <p>Établissement raccordé au réseau d'eau public. Le gérant atteste ne pas utiliser d'eau d'une autre origine. Eau contrôlée par les services de la commune.</p>
  <ul><li>Ne jamais utiliser d'eaux non contrôlées (forage non analysé)</li><li>Limiter la condensation par calorifugeage des tuyauteries</li><li>Ne jamais laisser d'eau stagner</li></ul>
  ${pageFoot()}
</section>

<!-- II.6 TEMPÉRATURES -->
<section class="page">
  ${pageHead("II · Bonnes pratiques d'hygiène",logoUrl)}
  <h1>II.6 Maîtrise des températures</h1>
  <h3>Contrôle à réception</h3>
  <table><thead><tr><th>Points de contrôle</th><th>Action si non-conformité</th></tr></thead><tbody>
    <tr><td>Produit : aspect, odeur, couleur</td><td>Refuser si non conforme</td></tr>
    <tr><td>Emballage : aspect</td><td>Refuser (cabossé, rouillé, percé)</td></tr>
    <tr><td>Étiquetage : DLC/DDM, n° lot</td><td>Refuser sans traçabilité</td></tr>
    <tr><td>Température</td><td>Refuser si non conforme</td></tr>
  </tbody></table>
  <h3>Températures maximales des denrées — ${M.label}</h3>
  <table><thead><tr><th>Denrée</th><th class="tc" style="width:30%">Température</th></tr></thead><tbody>${tempRows}</tbody></table>
  ${pageFoot()}
</section>

<!-- II.6 (suite) enceintes -->
<section class="page">
  ${pageHead("II · Bonnes pratiques d'hygiène",logoUrl)}
  <h1>II.6 Températures <span class="sub">(suite)</span></h1>
  <h3>Enceintes réfrigérées de l'établissement</h3>
  <table><thead><tr><th>Zone / Meuble</th><th>Seuil min</th><th>Seuil max</th><th>Relevé</th></tr></thead><tbody>${zonesRows}</tbody></table>
  <div class="box info avoid"><span class="bt">Suivi</span> Relevés effectués 2×/jour et enregistrés dans HygiPro. En cas de non-conformité, fiche complétée et société de maintenance contactée.</div>
  ${pageFoot()}
</section>

<!-- III.1-2 HACCP : champ + dangers bio -->
<section class="page">
  ${pageHead('III · Procédures HACCP',logoUrl)}
  <h1>III. Procédures HACCP</h1>
  <h2>1. Champ d'application</h2>
  <p><strong>Produits fabriqués :</strong> ${M.produits}</p>
  <p><strong>Diagrammes de fabrication validés :</strong> simplifiés, ils reprennent les étapes sans détail des paramètres.</p>
  <ul>${diagList}</ul>
  <h2>2. Analyse des dangers — danger biologique (matière première)</h2>
  <table class="danger"><thead><tr><th>Dangers</th><th>Principales origines</th><th>Dangerosité / sévérité</th></tr></thead><tbody>${rows3(DANGERS_BIO_MP.slice(0,6))}</tbody></table>
  ${pageFoot()}
</section>

<!-- III dangers bio (suite) -->
<section class="page">
  ${pageHead('III · Procédures HACCP',logoUrl)}
  <h1>III. Dangers biologiques <span class="sub">(suite)</span></h1>
  <table class="danger"><thead><tr><th>Dangers</th><th>Principales origines</th><th>Dangerosité / sévérité</th></tr></thead><tbody>${rows3(DANGERS_BIO_MP.slice(6))}</tbody></table>
  <div class="box info avoid"><span class="bt">Lecture du tableau</span> La sévérité traduit la dangerosité potentielle du germe. Les mesures de maîtrise sont détaillées dans les fiches matières premières et la maîtrise des étapes.</div>
  ${pageFoot()}
</section>

<!-- III dangers chimiques -->
<section class="page">
  ${pageHead('III · Procédures HACCP',logoUrl)}
  <h1>III.2 Dangers chimiques</h1>
  <table class="danger"><thead><tr><th>Dangers</th><th>Principales origines</th><th>Sévérité</th></tr></thead><tbody>${rows3(DANGERS_CHIM)}</tbody></table>
  <div class="box info avoid"><span class="bt">Mesures de maîtrise</span> Référencement de fournisseurs connus ; certificat d'aptitude au contact alimentaire ; appel à un professionnel pour les nuisibles ; plan de nettoyage selon les préconisations du fabricant.</div>
  ${pageFoot()}
</section>

<!-- III dangers physiques + 5M -->
<section class="page">
  ${pageHead('III · Procédures HACCP',logoUrl)}
  <h1>III.2 Dangers physiques</h1>
  <table class="danger"><thead><tr><th>Matériau</th><th>Danger potentiel</th><th>Fréquence</th></tr></thead><tbody>${DANGERS_PHYS.map(d=>`<tr><td><strong>${d[0]}</strong></td><td>${d[1]}</td><td>${d[2]}</td></tr>`).join('')}</tbody></table>
  <h3>Analyse des dangers — méthode des 5M</h3>
  <div class="m5 avoid">
    <div class="r"><div class="k">Matière première</div><div class="v">Contamination en amont (conformité à réception, décontamination, traçabilité, chaîne du froid)</div></div>
    <div class="r"><div class="k">Milieu</div><div class="v">Agencement, environnement (locaux, nuisibles, nettoyage, désinfection)</div></div>
    <div class="r"><div class="k">Matériel</div><div class="v">Matériel et ustensiles (conformité, maintenance, nettoyage)</div></div>
    <div class="r"><div class="k">Main-d'œuvre</div><div class="v">Risques humains : maladies, mauvaise pratique d'hygiène, lavage des mains</div></div>
    <div class="r"><div class="k">Méthode</div><div class="v">Organisation du travail (stockage, traitement des denrées, cuisson)</div></div>
  </div>
  ${pageFoot()}
</section>

${fichesSections}

<!-- III maîtrise des étapes -->
<section class="page">
  ${pageHead('III · Maîtrise des étapes',logoUrl)}
  <h1>III.3 Maîtrise des étapes de fabrication</h1>
  <h3>Congélation / Décongélation</h3>
  <p>Congélation lente = altération (rupture des cellules). Décongélation à température ambiante = multiplication en surface. Congélation ventilée immédiate, produits protégés (film). Décongélation en enceinte réfrigérée (+4°C max) ou au micro-ondes. Ne jamais recongeler. Stockage FIFO.</p>
  <h3>Cuisson</h3>
  <p>Maîtriser le couple temps-température. Vérifier le thermostat. Exemples : crème pâtissière 1 min 30 après la première bulle (90°C à cœur) ; crème anglaise 8 min à 195°C four (85°C à cœur).</p>
  <h3>Refroidissement rapide</h3>
  <p>Franchir la zone +63°C à +10°C en moins de 2h (étalement sur plaque, cellule, immersion glace). Stocker ensuite au froid (+3°C max).</p>
  <h3>Déchets et poubelles</h3>
  <p>Évacuation rapide vers les poubelles du laboratoire. Sacs à usage unique. Poubelle à ouverture non manuelle. Lavage des mains après manipulation. Nettoyage quotidien.</p>
  <h3>Locaux, plan de travail et air</h3>
  <p>Nettoyer/désinfecter sols, murs, plafonds ; ne jamais balayer à sec près des denrées sensibles. Séparer les opérations souillantes. Ne jamais travailler sur un plan fissuré. Vérifier les filtres de ventilation/climatisation.</p>
  ${pageFoot()}
</section>

<!-- III.4 CCP/PrPo -->
<section class="page">
  ${pageHead('III · Points déterminants',logoUrl)}
  <h1>III.4 Points déterminants (CCP / PrPo)</h1>
  <h3>Objectifs et seuils de maîtrise</h3>
  <table><thead><tr><th>Point déterminant</th><th>Objectif</th><th class="tc">Seuil</th><th>Justification</th></tr></thead><tbody>${prpoRows}</tbody></table>
  <p style="font-size:8.5pt;color:var(--muted)">* BOF = Beurre, Œuf, Fromage</p>
  <h3>Procédures de surveillance</h3>
  <table><thead><tr><th>Qui</th><th>Quoi</th><th>Où</th><th>Quand</th><th>Comment</th></tr></thead><tbody>
    <tr><td>Réception</td><td>T° produits</td><td>Camion / réception</td><td>Chaque livraison</td><td>Sonde — HygiPro</td></tr>
    <tr><td>1<sup>re</sup> pers. matin</td><td>T° enceintes</td><td>Enceintes froides</td><td>Matin / après-midi</td><td>Relevé — HygiPro</td></tr>
  </tbody></table>
  <h3>Actions correctives</h3>
  <table><thead><tr><th>Point déterminant</th><th>Sur les produits</th><th>Sur le procédé</th></tr></thead><tbody>
    <tr><td>T° de réception</td><td>Si &gt; seuil : produit refusé</td><td>Informer le fournisseur</td></tr>
    <tr><td>T° de stockage</td><td>Si T° à cœur &gt; seuil : vérifier, jeter si &gt; limite</td><td>Faire intervenir un frigoriste</td></tr>
  </tbody></table>
  ${pageFoot()}
</section>

<!-- IV TRAÇABILITÉ -->
<section class="page">
  ${pageHead('IV · Traçabilité & non-conformes',logoUrl)}
  <h1>IV. Traçabilité & gestion des non-conformes</h1>
  <h2>Traçabilité interne</h2>
  <p>Numéro de lot des matières premières, DLC/DDM du fournisseur, numéro de lot du fournisseur, DLC, DDM. Archivage des bons de livraison : 6 mois.</p>
  <h2>Gestion des produits non conformes</h2>
  <p>Destruction au dépassement des valeurs : température des MP, température à cœur, critères organoleptiques. Retrait : empêcher la distribution. Rappel : obtenir le retour d'un produit dangereux mis à disposition.</p>
  <h2>Procédure TIAC</h2>
  <p><strong>Définition :</strong> maladie infectieuse à déclaration obligatoire survenant lorsqu'il existe au moins 2 cas groupés avec des manifestations similaires dues à une bactérie ou une toxine.</p>
  <div class="box crit avoid"><span class="bt">Conduite à tenir</span> Jeter tous les restes après prélèvements ; n'utiliser aucun aliment tant que les résultats ne sont pas connus ; nettoyer et désinfecter ; revoir la formation ; mettre à jour les procédures ; contacter la DDPP locale et l'ARS.</div>
  <h2>Allergènes (Règlement UE 1169/2011)</h2>
  <p>Gluten · Crustacés · Œufs · Poissons · Arachides · Soja · Lait · Fruits à coque · Céleri · Moutarde · Sésame · Sulfites · Lupin · Mollusques</p>
  ${pageFoot()}
</section>

${cerfaPage}

<!-- FICHES DE RELEVÉ (vierges) -->
<section class="page">
  ${pageHead('Fiches de relevé de température',logoUrl)}
  <h1>Fiches de relevé de température</h1>
  <p>Contrôler la température au moins une fois par jour, toujours au même moment. Inscrire la température relevée.</p>
  ${tempGrid('Chambre froide positive (°C)',[8,6,4,2,0])}
  <p class="gtitle" style="margin-top:4mm"><strong>Gestion des non-conformités (températures)</strong></p>
  <table><thead><tr><th>Date</th><th>Problème rencontré</th><th>Action corrective</th><th>Par qui ?</th></tr></thead><tbody>
    <tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr>
  </tbody></table>
  ${pageFoot()}
</section>

<section class="page">
  ${pageHead('Fiches de relevé de température',logoUrl)}
  <h1>Relevé — Chambre froide négative</h1>
  ${tempGrid('Chambre froide négative (°C)',[-18,-20,-22,-24])}
  ${pageFoot()}
</section>

<!-- V ANNEXES -->
<section class="page">
  ${pageHead('V · Annexes',logoUrl)}
  <h1>V. Annexes</h1>
  <p>Procédures détaillées et diagrammes de fabrication à joindre.</p>
  <ul style="line-height:1.9">
    <li>Annexe 1 : Plan de nettoyage et de désinfection</li>
    <li>Annexe 2 : Procédure « Tenue du personnel »</li>
    <li>Annexe 3 : Procédure « Lavage des mains »</li>
    <li>Annexe 4 : Procédure « Contrôle à réception »</li>
    <li>Annexe 5 : Procédure « Surveillance des températures »</li>
    <li>Annexe 6 : Procédure « Décartonnage »</li>
    <li>Annexe 7 : Procédure « Ouverture des boîtes de conserve »</li>
    <li>Annexe 8 : Procédure « Décontamination des légumes »</li>
    <li>Annexe 9 : Procédure « Gestion de la traçabilité »</li>
    <li>Annexe 10 : Procédure « Utilisation de la trancheuse »</li>
    <li>Annexe 11 : Procédure « Utilisation des torchons »</li>
    <li>Annexe 12 : Fiche de non-conformités</li>
    ${diagList}
  </ul>
  ${pageFoot()}
</section>

<!-- VALIDATION -->
<section class="page">
  ${pageHead('Validation',logoUrl)}
  <h1>Validation et engagement</h1>
  <table><thead><tr><th>Version</th><th>Date</th><th>Modification</th><th>Validé par</th></tr></thead><tbody>
    <tr><td>1.0</td><td>${dateGen}</td><td>Création initiale</td><td>${cfg.responsable||DOTS.slice(0,16)}</td></tr>
    <tr><td>${DOTS.slice(0,8)}</td><td>${DOTS.slice(0,12)}</td><td>${DOTS.slice(0,18)}</td><td>${DOTS.slice(0,16)}</td></tr>
  </tbody></table>
  <p style="margin-top:4mm">Le responsable certifie que ce Plan de Maîtrise Sanitaire correspond aux pratiques réelles de l'établissement et s'engage à le mettre à jour en cas de modification des procédés.</p>
  <div class="signline">Signature et cachet du responsable</div>
  ${pageFoot()}
</section>

<script>window.onload=function(){setTimeout(function(){window.print();},800);}<\/script>
</body></html>`;
}

// En-tête / pied de page réutilisables
function pageHead(bc,logoUrl){
  return `<div class="phead"><div class="pl"><span class="logo"></span><span class="pt">HygiPro — Plan de Maîtrise Sanitaire</span></div><div class="pr">${bc}</div></div>`;
}
function pageFoot(){
  return `<div class="pfoot"><span>Édité par SASU DarTech Solution</span><span>HACCP · Hygiène · Traçabilité</span></div>`;
}
