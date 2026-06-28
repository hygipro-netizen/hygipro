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

function rows3(arr){return arr.map(d=>`<tr><td><strong>${d[0]}</strong></td><td>${d[1]}</td><td>${d[2]}</td></tr>`).join('');}
function fichesHtml(fiches){
  return fiches.map(f=>`<div class="mp"><h3>${f.nom}</h3><p><strong>Contamination :</strong> ${f.contam}</p><p><strong>Multiplication :</strong> ${f.multi}</p><p><strong>Mesures de maîtrise :</strong></p><ul>${f.mesures.map(m=>`<li>${m}</li>`).join('')}</ul></div>`).join('');
}

function buildPMSHtml(cfg){
  const M=PMS_METIERS[cfg.metier]||PMS_METIERS.boulangerie;
  const dateGen=new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
  const logoUrl='https://hygipro.vercel.app/logo.png';

  const usersRows=(cfg.users||[]).map(u=>`<tr><td>${u.name}</td><td>${u.role||'—'}</td><td>${BLANK}</td><td>${BLANK}</td></tr>`).join('')
    ||`<tr><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td></tr><tr><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td></tr>`;
  const zonesRows=(cfg.zones||[]).map(z=>`<tr><td>${z.name}</td><td>${z.threshold_min!=null?z.threshold_min+'°C':BLANK}</td><td>${z.threshold_max!=null?z.threshold_max+'°C':BLANK}</td><td>2x/jour</td></tr>`).join('')
    ||`<tr><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td></tr>`;
  const nettRows=(cfg.nettoyage||[]).map(n=>`<tr><td>${n.zone||''}</td><td>${n.surface||''}</td><td>${n.frequence||''}</td><td>${n.produit||''}</td><td>${n.dilution||'PAE'}</td></tr>`).join('')
    ||`<tr><td colspan="5" style="text-align:center;color:#94a3b8">Plan de nettoyage à configurer dans HygiPro</td></tr>`;
  const tempRows=M.temperatures.map(t=>`<tr><td>${t[0]}</td><td>${t[1]}</td></tr>`).join('');
  const prpoRows=M.prpo.map(p=>`<tr><td><strong>${p[0]}</strong></td><td>${p[1]}</td><td>${p[2]}</td><td>${p[3]}</td></tr>`).join('');
  const diagList=M.diagrammes.map((d,i)=>`<li>Annexe ${13+i} : Diagramme de fabrication — ${d}</li>`).join('');

  const cerfaPage=cfg.cerfa?`
  <div class="page">
    <div class="phead"><div class="phead-title">Déclaration d'activité — CERFA</div><img src="${logoUrl}" class="phead-logo"></div>
    <h1>Déclaration d'activité (CERFA 13984 / 16243)</h1>
    <div class="info-box">Tout établissement manipulant des denrées d'origine animale doit déclarer son activité à la DDPP avant ouverture, et à chaque changement d'exploitant, d'adresse ou d'activité (Règlement CE 852/2004). Depuis le 1er janvier 2023, le formulaire commun est le CERFA n°16243 (mesdemarches.agriculture.gouv.fr).</div>
    <h2>Démarche</h2>
    <ol>
      <li>Télécharger / remplir le formulaire sur entreprendre.service-public.fr ou mesdemarches.agriculture.gouv.fr</li>
      <li>Renseigner l'identification de l'établissement (SIRET, adresse, responsable)</li>
      <li>Cocher les activités correspondantes</li>
      <li>Dater et signer</li>
      <li>Transmettre à la DDPP du département</li>
      <li>Conserver le récépissé (demandé lors des contrôles)</li>
    </ol>
    <h2>Coordonnées de la DDPP</h2>
    <table>
      <tr><td style="width:35%"><strong>Direction (DDPP)</strong></td><td>${cfg.ddppNom||BLANK}</td></tr>
      <tr><td><strong>Adresse</strong></td><td>${cfg.ddppAdresse||BLANK}</td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${cfg.ddppTel||BLANK}</td></tr>
      <tr><td><strong>Email</strong></td><td>${cfg.ddppEmail||BLANK}</td></tr>
    </table>
    <p style="margin-top:14px"><strong>Déclaration faite le :</strong> ${BLANK} &nbsp; <strong>N° récépissé :</strong> ${BLANK}</p>
    <div class="warn-box" style="margin-top:16px">📎 Joindre l'accusé de réception de la déclaration signée par la DDPP à cet endroit.</div>
    <div style="border:2px dashed #cbd5e1;border-radius:8px;height:170px;display:flex;align-items:center;justify-content:center;color:#cbd5e1;margin:12px 40px;font-size:13px">Espace récépissé</div>
  </div>`:'';

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>PMS — ${cfg.nom}</title>
<style>
*{box-sizing:border-box}
body{font-family:Arial,sans-serif;color:#1a1a2e;font-size:12.5px;line-height:1.5;margin:0}
.cover{display:flex;flex-direction:column;min-height:1120px;page-break-after:always;background:#060f1e;color:#fff;position:relative;overflow:hidden}
.cover-top{flex:0 0 42%;padding:50px;display:flex;flex-direction:column;justify-content:center;position:relative}
.cover-logo{position:absolute;top:40px;right:50px;text-align:center}
.cover-logo img{height:90px}
.cover-logo .txt{font-size:20px;font-weight:800;margin-top:6px}
.cover-logo .txt span{color:#2dd4a0}
.cover h1.big{font-size:50px;font-weight:800;line-height:1.05;margin:0}
.cover .sub{font-size:21px;color:#2dd4a0;font-weight:700;margin-top:16px}
.cover-divider{height:6px;background:#2dd4a0}
.cover-bottom{flex:1;background:#fff;color:#1a1a2e;padding:46px 50px}
.cover-field{font-size:16px;margin-bottom:15px;border-bottom:1px solid #e2e8f0;padding-bottom:9px}
.cover-field b{color:#475569}
.cover-badges{display:flex;gap:10px;margin-top:26px;flex-wrap:wrap}
.cover-badge{border:1.5px solid #94a3b8;border-radius:20px;padding:6px 16px;font-size:11px;font-weight:700;color:#475569}
.page{padding:0 0 40px;max-width:900px;margin:0 auto;page-break-after:always}
.phead{background:#060f1e;color:#fff;padding:16px 40px;display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.phead-title{font-size:16px;font-weight:700}
.phead-logo{height:40px}
.page>h1,.page>h2,.page>p,.page>ul,.page>ol,.page>table,.page>.mp,.page>.info-box,.page>.warn-box,.page>.ok-box,.page>div{margin-left:40px;margin-right:40px}
h1{font-size:21px;font-weight:800;color:#060f1e;border-bottom:3px solid #2dd4a0;padding-bottom:8px;margin-bottom:14px;margin-top:8px}
h2{font-size:15px;font-weight:700;color:#1e3a5f;background:#f1f5f9;padding:8px 12px;border-left:4px solid #2dd4a0;margin:16px 40px 9px}
h3{font-size:13.5px;font-weight:700;color:#2dd4a0;margin:11px 0 4px}
p{margin-bottom:7px;color:#374151}
ul,ol{margin:6px 0 10px;padding-left:22px}
li{margin-bottom:3px;color:#374151}
table{width:calc(100% - 80px);border-collapse:collapse;margin:10px 40px 16px;font-size:11.5px}
th{background:#1e3a5f;color:#fff;padding:7px 9px;text-align:left}
td{padding:6px 9px;border-bottom:1px solid #e2e8f0;vertical-align:top}
tr:nth-child(even) td{background:#f8fafc}
.danger th{background:#dc2626}
.two-col{display:grid;grid-template-columns:1fr 2fr;margin:10px 40px 16px;border:1px solid #e2e8f0;font-size:11.5px}
.two-col .c{padding:7px 9px;border-bottom:1px solid #e2e8f0}
.mp{background:#f8fafc;border-left:3px solid #2dd4a0;border-radius:0 6px 6px 0;padding:9px 14px;margin:8px 40px}
.mp h3{margin-top:0}
.mp p{font-size:11.5px;margin-bottom:3px}
.mp ul{font-size:11.5px;margin-top:2px}
.info-box{background:#dbeafe;border:1px solid #60a5fa;border-radius:6px;padding:9px 14px;margin:8px 40px;font-size:11.5px}
.warn-box{background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;padding:9px 14px;margin:8px 40px;font-size:11.5px}
.ok-box{background:#d1fae5;border:1px solid #2dd4a0;border-radius:6px;padding:9px 14px;margin:8px 40px;font-size:11.5px}
.fill{color:#1e3a5f;font-weight:600}
.footer{text-align:center;font-size:10px;color:#94a3b8;margin:26px 40px 0;padding-top:12px;border-top:1px solid #e2e8f0}
.toc-line{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px dotted #e2e8f0;font-size:12.5px}
@media print{.page{page-break-after:always}}
</style></head><body>

<div class="cover">
  <div class="cover-top">
    <div class="cover-logo"><img src="${logoUrl}"><div class="txt">HYGI<span>PRO</span></div></div>
    <h1 class="big">Plan de<br>Maîtrise<br>Sanitaire</h1>
    <div class="sub">${M.sousTitre}</div>
  </div>
  <div class="cover-divider"></div>
  <div class="cover-bottom">
    <div class="cover-field"><b>Établissement :</b> ${cfg.nom}</div>
    ${cfg.raisonSociale?`<div class="cover-field"><b>Raison sociale :</b> ${cfg.raisonSociale}${cfg.formeJuridique?' ('+cfg.formeJuridique+')':''}</div>`:''}
    <div class="cover-field"><b>Adresse :</b> ${cfg.adresse||'—'}</div>
    <div class="cover-field"><b>Responsable :</b> ${cfg.responsable||'—'}</div>
    <div class="cover-field"><b>SIRET :</b> ${cfg.siret||'—'}</div>
    <div class="cover-field"><b>Date :</b> ${dateGen} &nbsp;·&nbsp; <b>Version :</b> 1.0</div>
    <div class="cover-badges"><div class="cover-badge">CE 852/2004</div><div class="cover-badge">DGAL/SDSSA 2022-349</div><div class="cover-badge">HACCP</div></div>
  </div>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">Sommaire</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>Sommaire</h1>
  <p style="font-size:11.5px;color:#64748b">Le plan de maîtrise sanitaire présenté reprend la structure proposée par l'annexe II de la note de service DGAL/SDSSA 2022-349 relative à la procédure d'agrément sanitaire.</p>
  <div style="margin:0 40px">
    <div class="toc-line"><span>I. Description des activités</span><span>3</span></div>
    <div class="toc-line"><span>II. Bonnes pratiques d'hygiène</span><span>4</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;1. Le personnel</span><span>4</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;2. Maintenance des locaux, équipements et matériel</span><span>5</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;3. Mesures d'hygiène avant, pendant et après la production</span><span>6</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;4. Plan de lutte contre les nuisibles</span><span>7</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;5. Approvisionnement en eau</span><span>7</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;6. La maîtrise des températures</span><span>8</span></div>
    <div class="toc-line"><span>III. Procédures basées sur les principes HACCP</span><span>10</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;1. Champ d'application</span><span>10</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;2. Analyse des dangers (bio / chimiques / physiques)</span><span>11</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;3. Fiches matières premières & étapes</span><span>13</span></div>
    <div class="toc-line"><span>&nbsp;&nbsp;4. Points déterminants (CCP / PrPo)</span><span>18</span></div>
    <div class="toc-line"><span>IV. Traçabilité & gestion des non-conformes (TIAC)</span><span>20</span></div>
    <div class="toc-line"><span>V. Annexes</span><span>22</span></div>
  </div>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">I. Description des activités</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>I. Description des activités</h1>
  <h2>1. Organisation générale</h2>
  <table>
    <tr><th colspan="2">ÉTABLISSEMENT</th></tr>
    <tr><td style="width:38%"><strong>Nom commercial</strong></td><td>${cfg.nom}</td></tr>
    ${cfg.raisonSociale?`<tr><td><strong>Raison sociale</strong></td><td>${cfg.raisonSociale}</td></tr>`:''}
    ${cfg.formeJuridique?`<tr><td><strong>Forme juridique</strong></td><td>${cfg.formeJuridique}</td></tr>`:''}
    <tr><td><strong>Adresse</strong></td><td>${cfg.adresse||BLANK}</td></tr>
    <tr><td><strong>N° SIRET</strong></td><td>${cfg.siret||BLANK}</td></tr>
    <tr><td><strong>Téléphone</strong></td><td>${[cfg.tel?'Port. '+cfg.tel:'',cfg.telFixe?'Fixe '+cfg.telFixe:''].filter(Boolean).join(' · ')||BLANK}</td></tr>
    <tr><td><strong>Courriel</strong></td><td>${cfg.email||BLANK}</td></tr>
    <tr><td><strong>Date d'ouverture de l'établissement</strong></td><td>${BLANK}</td></tr>
    <tr><td><strong>Responsable légal</strong></td><td>${cfg.responsable||BLANK}</td></tr>
    <tr><td><strong>Horaires de travail</strong></td><td>${BLANK}</td></tr>
    <tr><td><strong>Activité</strong></td><td>${M.label}</td></tr>
  </table>
  <p><strong>Déclaration d'activité CERFA faite le :</strong> <span class="fill">${BLANK}</span></p>
  <p style="font-size:11px;color:#94a3b8">(Mettre l'accusé de réception de la déclaration signée par la DDPP en annexe.)</p>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">II. Bonnes pratiques d'hygiène</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>II. Bonnes pratiques d'hygiène</h1>
  <h2>1. Le personnel</h2>
  <h3>Plan de formation</h3>
  <p>Conformément au décret n°2011-731, au moins une personne peut justifier d'une formation en matière d'hygiène alimentaire adaptée à l'activité (stage effectué par <span class="fill">${BLANK}</span> le <span class="fill">${BLANK}</span>). Lors de l'arrivée d'un nouveau membre, une formation orale est dispensée par le gérant. En cas de nécessité, les employés suivront une formation externe.</p>
  <table><tr><th>Nom</th><th>Poste</th><th>Formation hygiène</th><th>Date / À jour</th></tr>${usersRows}</table>
  <h3>Tenue du personnel</h3>
  <p>La tenue se compose : veste ou tee-shirt, pantalon, charlotte ou toque, chaussures de sécurité blanches adaptées au travail agro-alimentaire. Changée tous les jours. Port de bijoux strictement interdit (tolérance alliance lisse sans pierre). Interdiction de fumer/vapoter dans les locaux. Interdiction de manger et boire en production.</p>
  <h3>Lavage des mains</h3>
  <p>Obligatoire à l'eau et au savon, systématiquement : prise de poste, après WC, après les pauses, avant de manipuler les denrées, après toute interruption ou opération salissante.</p>
  <table><tr><th>Étape</th><th>Méthode</th></tr>
    <tr><td>1</td><td>Mouiller les mains et les avant-bras</td></tr>
    <tr><td>2</td><td>Prendre une dose de savon liquide bactéricide</td></tr>
    <tr><td>3</td><td>Frotter mains et avant-bras, vérifier les ongles, 30 secondes minimum</td></tr>
    <tr><td>4</td><td>Rincer abondamment</td></tr>
    <tr><td>5</td><td>Sécher avec un essuie-main à usage unique</td></tr>
  </table>
  <h3>État de santé du personnel</h3>
  <p>Préalablement à l'embauche et tous les deux ans (Code du Travail), visite médicale auprès de la Médecine du travail attestant l'aptitude à la manipulation des denrées.</p>
  <h3>Traitement des plaies et blessures</h3>
  <p>Nettoyer et désinfecter immédiatement. Pansement + gant jetable renouvelé. Consulter un médecin si la plaie est profonde.</p>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">II. Bonnes pratiques d'hygiène</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>II.2 Maintenance des locaux, équipements et matériel</h1>
  <p>La maintenance curative peut être gérée de deux manières : en interne par le responsable (travaux simples) ; en externe par un prestataire (matériel de production, système frigorifique).</p>
  <p>Maintenance préventive pour les équipements suivants (à compléter avec les équipements présents et les sociétés prestataires) :</p>
  <table><tr><th>Équipements</th><th>Organisme de révision</th><th>Téléphone</th><th>Fréquence</th></tr>
    <tr><td>Installation frigorifique</td><td>${BLANK}</td><td>${BLANK}</td><td>1 fois par an</td></tr>
    <tr><td>Hotte d'extraction</td><td>${BLANK}</td><td>${BLANK}</td><td>2 fois par an</td></tr>
    <tr><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td></tr>
  </table>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">II. Bonnes pratiques d'hygiène</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>II.3 Mesures d'hygiène avant, pendant et après la production</h1>
  <p>Le plan de nettoyage et de désinfection comprend 3 phases : <strong>pré-opérationnel</strong> (désinfection avant utilisation), <strong>opérationnel</strong> (surface, produit, matériel, mode opératoire, temps d'action), <strong>post-opérationnel</strong> (vérification visuelle et renouvellement si nécessaire).</p>
  <table><tr><th>Zone</th><th>Surface</th><th>Fréquence</th><th>Produit</th><th>Dilution</th></tr>${nettRows}</table>
  <div class="ok-box">✓ Méthode TACT — cercle de Sinner : Température, Action mécanique, Concentration, Temps. 4 facteurs indissociables.</div>
  <p><strong>Méthode :</strong> 1) Débarrasser les souillures visibles. 2) Appliquer le nettoyant/désinfectant, brosser/frotter. 3) Laisser agir. 4) Rincer abondamment. 5) Racler/sécher (papier à usage unique).</p>
  <div class="info-box">ℹ️ Les validations de nettoyage sont enregistrées avec signature dans HygiPro. Fiches techniques et de sécurité consultables sur site.</div>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">II. Bonnes pratiques d'hygiène</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>II.4 Plan de lutte contre les nuisibles</h1>
  <p>La société prestataire <span class="fill">${cfg.deratisation||BLANK}</span> est en charge de la lutte contre les nuisibles (rongeurs et blattes). Il est prévu <span class="fill">${cfg.deratFreq||BLANK}</span> passage(s) par an. Les fiches techniques et le plan d'appâtage sont tenus à disposition. En cas d'infestation, appel immédiat au prestataire et fiche de non-conformité. Bons d'intervention archivés.</p>
  <div class="warn-box">⚠️ En cas de présence avérée d'insectes volants, un DEIV (destructeur électrique d'insectes volants) sera installé.</div>
  <h1 style="margin-top:24px">II.5 Approvisionnement en eau</h1>
  <p>L'établissement est raccordé au réseau d'eau public. Le gérant atteste ne pas utiliser d'eau d'une autre origine. Eau contrôlée par les services de la commune.</p>
  <ul><li>Ne jamais utiliser d'eaux non contrôlées (forage non analysé)</li><li>Limiter la condensation par calorifugeage des tuyauteries</li><li>Ne jamais laisser d'eau stagner</li></ul>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">II. Bonnes pratiques d'hygiène</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>II.6 La maîtrise des températures</h1>
  <p>Pendant toutes les étapes, la chaîne du froid doit être respectée (pas de rupture au-delà de 30 min hors froid).</p>
  <h3>Contrôle à réception</h3>
  <table><tr><th>Points de contrôle</th><th>Action en cas de non-conformité</th></tr>
    <tr><td>Produit : aspect, odeur, couleur</td><td>Refuser si la qualité n'est pas conforme</td></tr>
    <tr><td>Emballage : aspect</td><td>Refuser (conserve cabossée, rouillée, emballage percé)</td></tr>
    <tr><td>Étiquetage : DLC/DDM, n° lot</td><td>Refuser sans étiquette de traçabilité ou information manquante</td></tr>
    <tr><td>Température</td><td>Refuser si la température est non conforme</td></tr>
  </table>
  <h3>Températures maximales des denrées (${M.label})</h3>
  <table><tr><th>Denrée</th><th>Température</th></tr>${tempRows}</table>
  <h3>Enceintes réfrigérées de l'établissement</h3>
  <table><tr><th>Zone / Meuble</th><th>Seuil min</th><th>Seuil max</th><th>Relevé</th></tr>${zonesRows}</table>
  <div class="info-box">ℹ️ Relevés effectués 2x/jour et enregistrés dans HygiPro. En cas de non-conformité, fiche complétée et société de maintenance contactée.</div>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">III. Procédures HACCP</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>III. Procédures basées sur les principes HACCP</h1>
  <h2>1. Le champ d'application</h2>
  <p><strong>Descriptif des produits fabriqués :</strong> ${M.produits}</p>
  <p><strong>Diagrammes de fabrication validés :</strong> simplifiés, reprennent les étapes de fabrication sans détail des paramètres (détaillés dans l'analyse des dangers).</p>
  <ul>${diagList}</ul>
  <h2>2. Analyse des dangers</h2>
  <p>Trois types de dangers : (micro)biologiques, chimiques, physiques.</p>
  <h3>Le danger biologique — sur la matière première</h3>
  <table class="danger"><tr><th>Dangers</th><th>Principales origines</th><th>Dangerosité / sévérité</th></tr>${rows3(DANGERS_BIO_MP)}</table>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">III. Procédures HACCP</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>III.2 Dangers chimiques et physiques</h1>
  <h3>Les dangers chimiques</h3>
  <table class="danger"><tr><th>Dangers</th><th>Principales origines</th><th>Sévérité</th></tr>${rows3(DANGERS_CHIM)}</table>
  <p style="font-size:11.5px"><strong>Mesures de maîtrise :</strong> référencement de fournisseurs connus ; certificat d'aptitude au contact alimentaire ; appel à un professionnel pour la lutte contre les nuisibles ; plan de nettoyage selon les préconisations du fabricant.</p>
  <h3>Les dangers physiques</h3>
  <table class="danger"><tr><th>Matériau</th><th>Danger potentiel</th><th>Fréquence</th></tr>${DANGERS_PHYS.map(d=>`<tr><td><strong>${d[0]}</strong></td><td>${d[1]}</td><td>${d[2]}</td></tr>`).join('')}</table>
  <h3>L'analyse des dangers — méthode des 5M</h3>
  <div class="two-col">
    <div class="c"><strong>Matière première</strong></div><div class="c">Contamination en amont (conformité à réception, décontamination, traçabilité, chaîne du froid)</div>
    <div class="c"><strong>Milieu</strong></div><div class="c">Risques liés à l'agencement, l'environnement (locaux, nuisibles, nettoyage, désinfection)</div>
    <div class="c"><strong>Matériel</strong></div><div class="c">Contaminations dues au matériel et ustensiles (conformité, maintenance, nettoyage)</div>
    <div class="c"><strong>Main-d'œuvre</strong></div><div class="c">Risques humains : maladies, mauvaise pratique d'hygiène, lavage des mains</div>
    <div class="c"><strong>Méthode</strong></div><div class="c">Organisation du travail (stockage, traitement des denrées, cuisson)</div>
  </div>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">III. Fiches matières premières</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>III.3 Fiches matières premières — Dangers & mesures</h1>
  ${fichesHtml(M.fiches)}
</div>

<div class="page">
  <div class="phead"><div class="phead-title">III. Maîtrise des étapes</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>III.3 Maîtrise des étapes de fabrication</h1>
  <h3>Congélation / Décongélation</h3>
  <p>Congélation lente = altération (rupture des cellules). Décongélation à température ambiante = multiplication en surface. Congélation ventilée immédiate, produits protégés (film). Décongélation en enceinte réfrigérée (+4°C max) ou au micro-ondes. Ne jamais recongeler. Stockage FIFO.</p>
  <h3>Cuisson</h3>
  <p>Maîtriser le couple temps-température. Vérifier le thermostat. Exemples : crème pâtissière 1 min 30 après la première bulle (90°C à cœur) ; crème anglaise 8 min à 195°C four (85°C à cœur).</p>
  <h3>Refroidissement rapide</h3>
  <p>Franchir la zone +63°C à +10°C en moins de 2h (étalement sur plaque, cellule de refroidissement, immersion glace). Stocker ensuite au froid (+3°C max).</p>
  <h3>Gestion des déchets et des poubelles</h3>
  <p>Évacuation rapide vers les poubelles du laboratoire. Sacs à usage unique. Poubelle à ouverture non manuelle. Se laver les mains après manipulation. Nettoyage quotidien. Éloigner des sources de chaleur (>20°C) et des denrées sensibles.</p>
  <h3>Locaux de fabrication</h3>
  <p>Nettoyer/désinfecter sols, murs, plafonds. Ne jamais balayer à sec en présence de denrées sensibles. Protéger les ouvertures (grilles, moustiquaires). Sols en pente vers les évacuations. Calorifuger les gaines.</p>
  <h3>Plan de travail et ustensiles</h3>
  <p>Plans de travail des produits sensibles à l'abri des courants d'air. Séparer les opérations souillantes (épluchage, cassage des œufs). Nettoyer/désinfecter avant usage. Ne jamais travailler sur un plan fissuré.</p>
  <h3>Air</h3>
  <p>Nettoyer sols, plans, matériel. Limiter les allers-venues dans les zones sales. Stocker les bases protégées de l'air (film/couvercle). Vérifier les filtres de ventilation/climatisation.</p>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">III. Points déterminants</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>III.4 Points déterminants (CCP / PrPo)</h1>
  <p>Chaque étape donne lieu à une évaluation (arbre de décision) pour déterminer si un CCP ou un PrPo est présent.</p>
  <h3>Objectifs et seuils de maîtrise</h3>
  <table><tr><th>Point déterminant</th><th>Objectif</th><th>Seuil de maîtrise</th><th>Justification</th></tr>${prpoRows}</table>
  <p style="font-size:11px;color:#64748b">* BOF = Beurre, Œuf, Fromage</p>
  <h3>Procédures de surveillance</h3>
  <table><tr><th>Qui</th><th>Quoi</th><th>Où</th><th>Quand</th><th>Comment</th></tr>
    <tr><td>Personnel de réception</td><td>Température des produits</td><td>Camion / réception</td><td>Chaque livraison</td><td>Thermomètre / sonde — HygiPro</td></tr>
    <tr><td>Première personne le matin</td><td>Température des enceintes</td><td>Chaque enceinte froide</td><td>Matin et après-midi</td><td>Relevé — HygiPro</td></tr>
  </table>
  <h3>Actions correctives</h3>
  <table><tr><th>Point déterminant</th><th>Sur les produits</th><th>Sur le procédé</th></tr>
    <tr><td>Température de réception</td><td>Si &gt; seuil : produit refusé</td><td>Informer le fournisseur, actions correctives</td></tr>
    <tr><td>Température de stockage</td><td>Si température à cœur &gt; seuil : vérifier, changer, jeter si &gt; limite</td><td>Faire intervenir un frigoriste</td></tr>
  </table>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">IV. Traçabilité & non-conformes</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>IV. Traçabilité & gestion des produits non-conformes</h1>
  <h3>Traçabilité interne</h3>
  <p>Numéro de lot des matières premières, DLC/DDM du fournisseur, numéro de lot du fournisseur, DLC, DDM. Archivage des bons de livraison : 6 mois.</p>
  <h3>Gestion des produits non conformes</h3>
  <p>Destruction lors du dépassement des valeurs : température des MP, température à cœur, critères organoleptiques. Retrait : empêcher la distribution. Rappel : obtenir le retour d'un produit dangereux mis à disposition.</p>
  <h3>Procédure TIAC (Toxi-Infection Alimentaire Collective)</h3>
  <p><strong>Définition :</strong> maladie infectieuse à déclaration obligatoire survenant lorsqu'il existe au moins 2 cas groupés avec manifestations similaires dues à une bactérie ou une toxine.</p>
  <div class="warn-box">Que faire : jeter tous les restes après prélèvements ; n'utiliser aucun aliment tant que les résultats ne sont pas connus ; nettoyer et désinfecter ; revoir la formation ; mettre à jour les procédures ; contacter la DDPP locale et l'ARS.</div>
  <h3>Allergènes (Règlement UE 1169/2011)</h3>
  <p style="font-size:11.5px">Gluten · Crustacés · Œufs · Poissons · Arachides · Soja · Lait · Fruits à coque · Céleri · Moutarde · Sésame · Sulfites · Lupin · Mollusques</p>
</div>

${cerfaPage}

<div class="page">
  <div class="phead"><div class="phead-title">V. Annexes</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>V. Annexes</h1>
  <p style="font-size:11.5px;color:#64748b">Procédures détaillées et diagrammes de fabrication à joindre.</p>
  <ul style="font-size:12px;line-height:1.9">
    <li>Annexe 1 : Plan de nettoyage et de désinfection</li>
    <li>Annexe 2 : Procédure « Tenue du personnel »</li>
    <li>Annexe 3 : Procédure « Lavage des mains »</li>
    <li>Annexe 4 : Procédure « Contrôle à réception »</li>
    <li>Annexe 5 : Procédure « Surveillance des températures des enceintes »</li>
    <li>Annexe 6 : Procédure « Décartonnage »</li>
    <li>Annexe 7 : Procédure « Ouverture des boîtes de conserve »</li>
    <li>Annexe 8 : Procédure « Décontamination des légumes »</li>
    <li>Annexe 9 : Procédure « Gestion de la traçabilité »</li>
    <li>Annexe 10 : Procédure « Utilisation de la trancheuse »</li>
    <li>Annexe 11 : Procédure « Utilisation des torchons »</li>
    <li>Annexe 12 : Fiche de non-conformités</li>
    ${M.diagrammes.map((d,i)=>`<li>Annexe ${13+i} : Diagramme de fabrication — ${d}</li>`).join('')}
  </ul>
</div>

<div class="page" style="page-break-after:auto">
  <div class="phead"><div class="phead-title">Validation</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>Validation et engagement</h1>
  <table><tr><th>Version</th><th>Date</th><th>Modification</th><th>Validé par</th></tr>
    <tr><td>1.0</td><td>${dateGen}</td><td>Création initiale</td><td>${cfg.responsable||BLANK}</td></tr>
    <tr><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td><td>${BLANK}</td></tr>
  </table>
  <p style="margin-top:24px">Le responsable certifie que ce Plan de Maîtrise Sanitaire correspond aux pratiques réelles de l'établissement et s'engage à le mettre à jour en cas de modification des procédés.</p>
  <div style="margin-top:46px;border-top:1px solid #94a3b8;width:280px;padding-top:8px;font-size:12px;color:#64748b">Signature et cachet du responsable</div>
  <div class="footer">${cfg.nom} — Plan de Maîtrise Sanitaire v1.0 — ${dateGen}<br>Généré par HygiPro · hygi-pro.fr · Conforme CE 852/2004 · DGAL/SDSSA 2022-349</div>
</div>

<script>window.onload=function(){setTimeout(function(){window.print();},800);}<\/script>
</body></html>`;
}
