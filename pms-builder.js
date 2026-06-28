// ============================================
// HYGIPRO — Constructeur de PMS multi-métiers
// Métiers : boulangerie, restaurant, boucherie
// ============================================

const PMS_METIERS={
  boulangerie:{
    label:'Boulangerie-Pâtisserie',
    sousTitre:'Boulangerie · Pâtisserie · Viennoiserie',
    matieres:[
      {nom:'Farines, fécules, sucres',risques:'Insectes, rongeurs, humidité, corps étrangers',mesures:'Stockage hors sol sur palette. Ne pas balayer à sec. Bacs fermés. Lutte anti-nuisibles. Contrôle DLUO.'},
      {nom:'Œufs coquille',risques:'Salmonelles en surface de coquille',mesures:'Jamais d\'œufs fêlés (sauf pâtes cuites). Ne pas laver les œufs. Réfrigération +4°C. Mains propres avant/après cassage. Désinfecter la clarifieuse.'},
      {nom:'Laits, crèmes, fromages blancs',risques:'Germes pathogènes, multiplication >+4°C',mesures:'Froid positif +4°C max. Refermer après usage. Respecter DLC. Pasteuriser crèmes sensibles (72°C, 4 min).'},
      {nom:'Beurre',risques:'Sensible aux odeurs',mesures:'Ne pas stocker emballage ouvert. À l\'abri des odeurs. Vérifier conditionnement.'},
      {nom:'Ovoproduits (œufs liquides pasteurisés)',risques:'Multiplication si stockage incorrect',mesures:'+4°C max. Utiliser dans les 3 jours après ouverture. Ne pas utiliser pour fabrications non recuites.'},
      {nom:'Chocolats, cacao',risques:'Insectes, moisissures si humidité',mesures:'Réserve sèche, à l\'abri humidité et lumière. Refermer après usage.'},
      {nom:'Fruits, garnitures',risques:'Germes telluriques, contamination',mesures:'Lavage eau potable. Éliminer emballages hors zone fabrication. Froid +4°C. Éliminer parties abîmées.'},
    ],
    dangersBio:[
      {etape:'Réception matières premières',type:'C, CS',mesures:'Contrôle DLC, températures, intégrité emballages. Refus si non conforme. Enregistrement HygiPro.'},
      {etape:'Stockage réserve sèche',type:'C, CS',mesures:'Hors sol, lutte nuisibles, rotation FIFO, contrôle DLUO.'},
      {etape:'Stockage réfrigéré',type:'CS',mesures:'Relevés 2x/jour HygiPro. Séparation crus/cuits. Fermer les portes.'},
      {etape:'Pétrissage / Façonnage',type:'C, CS',mesures:'Hygiène des mains, tenue propre, ustensiles désinfectés.'},
      {etape:'Fermentation / Pousse',type:'CS',mesures:'Chambre de pousse à température contrôlée. Durée maîtrisée.'},
      {etape:'Cuisson',type:'S',mesures:'Cuisson à cœur suffisante. Température four contrôlée. Enregistrement HygiPro.'},
      {etape:'Garnissage crèmes (pâtisserie)',type:'C, CS',mesures:'Crèmes maintenues +4°C. Garnissage rapide. Vitrine réfrigérée immédiate.'},
      {etape:'Vente',type:'C, CS',mesures:'Vitrine réfrigérée surveillée. Étiquetage DLC. Protection produits.'},
    ],
    temperatures:[
      ['Crèmes pâtissières, chantilly','≤ +4°C'],
      ['Entremets, gâteaux à la crème','≤ +4°C'],
      ['Ovoproduits','≤ +4°C'],
      ['Beurre, matières grasses','≤ +8°C'],
      ['Produits surgelés','≤ -18°C'],
      ['Pain, viennoiserie sèche','Ambiante'],
    ],
  },
  restaurant:{
    label:'Restaurant / Restauration',
    sousTitre:'Restauration commerciale · Préparation et service de repas',
    matieres:[
      {nom:'Viandes fraîches',risques:'Contamination origine, multiplication rapide',mesures:'Vérifier fraîcheur et DLC. Éliminer emballage avant chambre froide. Froid +4°C max (hachées +2°C). Désinfecter couteaux.'},
      {nom:'Volailles',risques:'Salmonelles, Campylobacter',mesures:'Stockage séparé +4°C max. Jamais laver (projections). Cuisson à cœur ≥74°C. Planche dédiée.'},
      {nom:'Poissons et fruits de mer',risques:'Histamine, parasites (Anisakis)',mesures:'Réception sous glace 0-+2°C. Congélation -20°C 24h si consommé cru. Contrôle fraîcheur (œil, odeur).'},
      {nom:'Légumes et crudités',risques:'Germes telluriques, terre, pesticides',mesures:'Lavage + désinfection (eau de javel alimentaire diluée puis rinçage). Légumerie séparée. Froid +4°C.'},
      {nom:'Produits laitiers, œufs',risques:'Multiplication germes, salmonelles',mesures:'Froid +4°C. DLC respectées. Ovoproduits pasteurisés pour préparations froides (mayonnaise, mousse).'},
      {nom:'Produits surgelés',risques:'Rupture chaîne du froid',mesures:'-18°C. Décongélation en enceinte réfrigérée uniquement. Jamais recongeler.'},
      {nom:'Épicerie, sauces, condiments',risques:'Altération après ouverture',mesures:'DLUO contrôlées. Refermer et dater à l\'ouverture. Stockage sec propre.'},
    ],
    dangersBio:[
      {etape:'Réception',type:'C, CS',mesures:'Contrôle températures camion/produit, DLC, emballages. Refus si non conforme. Enregistrement HygiPro.'},
      {etape:'Stockage froid (séparation crus/cuits)',type:'CS',mesures:'Relevés 2x/jour. Crus en bas, cuits en haut. Filmer et dater. Respecter DLC secondaires.'},
      {etape:'Décongélation',type:'CS',mesures:'En enceinte réfrigérée +4°C. Jamais à température ambiante. DLC 24h. Jamais recongeler.'},
      {etape:'Préparation froide',type:'C, CS',mesures:'Limiter le temps hors froid (<30 min). Mains et plans désinfectés. Ovoproduits pasteurisés.'},
      {etape:'Cuisson',type:'S',mesures:'Température à cœur ≥63°C (volaille ≥74°C, haché ≥70°C). Enregistrement HygiPro.'},
      {etape:'Refroidissement rapide',type:'CS',mesures:'+63°C → +10°C en moins de 2h (cellule). Stockage +3°C. Étiquetage J+3 max.'},
      {etape:'Maintien au chaud',type:'CS',mesures:'≥+63°C en permanence. Jamais de remise en température répétée.'},
      {etape:'Remise en température',type:'S',mesures:'≥+63°C à cœur en moins d\'1h. Une seule fois.'},
      {etape:'Service',type:'C, CS',mesures:'Service rapide. Protection des plats. Respect marche en avant.'},
    ],
    temperatures:[
      ['Viandes hachées','≤ +2°C'],
      ['Abats','≤ +3°C'],
      ['Viandes, volailles, charcuterie','≤ +4°C'],
      ['Poissons (sous glace)','0 à +2°C'],
      ['Préparations froides, crudités','≤ +4°C'],
      ['Plats cuisinés réfrigérés','≤ +3°C'],
      ['Produits surgelés','≤ -18°C'],
      ['Maintien au chaud','≥ +63°C'],
      ['Cuisson à cœur (général)','≥ +63°C'],
      ['Cuisson volaille','≥ +74°C'],
    ],
  },
  boucherie:{
    label:'Boucherie-Charcuterie',
    sousTitre:'Boucherie · Charcuterie · Préparations de viande',
    matieres:[
      {nom:'Carcasses et viandes fraîches',risques:'Contamination de surface, multiplication rapide',mesures:'Réception ≤+7°C (carcasses), +4°C (découpe). Crochets et rails propres. Désinfection quotidienne du laboratoire.'},
      {nom:'Viandes hachées et préparations',risques:'Multiplication intense (surface développée)',mesures:'Hachage extemporané. +2°C max. DLC très courte. Traçabilité du lot d\'origine obligatoire.'},
      {nom:'Abats',risques:'Charge microbienne élevée',mesures:'Stockage séparé +3°C max. Manipulation et nettoyage rigoureux. DLC courte.'},
      {nom:'Volailles',risques:'Salmonelles, Campylobacter',mesures:'Stockage séparé +4°C. Planche et couteaux dédiés. Éviter contamination croisée.'},
      {nom:'Charcuterie maison (pâtés, terrines, saucisses)',risques:'Listeria, Salmonelles, botulisme (conserves)',mesures:'Cuisson à cœur ≥70°C. Refroidissement rapide. Nitrites dosés précisément. Conserves : barème stérilisation respecté.'},
      {nom:'Produits saumurés / fumés',risques:'Listeria, développement si mauvaise maîtrise',mesures:'Saumure contrôlée. Température fumaison maîtrisée. Stockage +4°C. DLC adaptée.'},
      {nom:'Boyaux',risques:'Contamination microbienne',mesures:'Conservation au sel ou réfrigérée. Rinçage abondant avant usage.'},
    ],
    dangersBio:[
      {etape:'Réception viandes',type:'C, CS',mesures:'Contrôle température (≤+7°C carcasse / +4°C découpe), estampille sanitaire, DLC, traçabilité lot. Enregistrement HygiPro.'},
      {etape:'Stockage chambre froide',type:'CS',mesures:'Relevés 2x/jour. Séparation espèces. Crochets propres. Pas de contact sol. Rotation FIFO.'},
      {etape:'Découpe / Désossage',type:'C, CS',mesures:'Local +12°C max. Couteaux désinfectés (stérilisateur 82°C). Planches par espèce. Hygiène des mains stricte.'},
      {etape:'Hachage',type:'CS',mesures:'Hachoir nettoyé/désinfecté avant usage. Hachage extemporané. Produit fini +2°C immédiat. Traçabilité lot.'},
      {etape:'Fabrication charcuterie',type:'C, CS, S',mesures:'Dosage nitrites contrôlé. Cuisson à cœur ≥70°C. Refroidissement rapide +63→+10°C en <2h.'},
      {etape:'Conserves / Semi-conserves',type:'S',mesures:'Barème de stérilisation respecté et enregistré. Contrôle sertissage. DLUO. Risque botulique maîtrisé.'},
      {etape:'Vitrine / Vente',type:'C, CS',mesures:'Vitrine +4°C surveillée. Séparation produits crus/élaborés. Étiquetage DLC. Trancheuse désinfectée entre produits.'},
    ],
    temperatures:[
      ['Viandes hachées','≤ +2°C'],
      ['Préparations de viande','≤ +4°C'],
      ['Abats','≤ +3°C'],
      ['Carcasses (réception)','≤ +7°C'],
      ['Viandes de découpe','≤ +4°C'],
      ['Volailles','≤ +4°C'],
      ['Charcuterie cuite','≤ +4°C'],
      ['Produits surgelés','≤ -18°C'],
      ['Cuisson charcuterie à cœur','≥ +70°C'],
      ['Refroidissement rapide','+63°C → +10°C en < 2h'],
    ],
  },
};

function buildPMSHtml(cfg){
  const M=PMS_METIERS[cfg.metier]||PMS_METIERS.boulangerie;
  const dateGen=new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
  const logoUrl='https://hygipro.vercel.app/logo.png';

  const usersRows=(cfg.users||[]).map(u=>`<tr><td>${u.name}</td><td>${u.role||'—'}</td><td>Attestation HACCP</td><td>✓</td></tr>`).join('')||'<tr><td colspan="4" style="text-align:center;color:#94a3b8">À compléter</td></tr>';
  const zonesRows=(cfg.zones||[]).map(z=>`<tr><td>${z.name}</td><td>${z.threshold_min!=null?z.threshold_min+'°C':'—'}</td><td>${z.threshold_max!=null?z.threshold_max+'°C':'—'}</td><td>2x/jour</td></tr>`).join('')||'<tr><td colspan="4" style="text-align:center;color:#94a3b8">À compléter dans HygiPro</td></tr>';
  const nettRows=(cfg.nettoyage||[]).map(n=>`<tr><td>${n.zone||''}</td><td>${n.surface||''}</td><td>${n.frequence||''}</td><td>${n.produit||''}</td><td>${n.dilution||'PAE'}</td></tr>`).join('')||'<tr><td colspan="5" style="text-align:center;color:#94a3b8">À compléter dans HygiPro</td></tr>';
  const matieresHtml=M.matieres.map(m=>`<div class="mp"><h3>${m.nom}</h3><p><strong>Risques :</strong> ${m.risques}</p><p><strong>Mesures :</strong> ${m.mesures}</p></div>`).join('');
  const bioRows=M.dangersBio.map(d=>`<tr><td><strong>${d.etape}</strong></td><td>${d.type}</td><td>${d.mesures}</td></tr>`).join('');
  const tempRows=M.temperatures.map(t=>`<tr><td>${t[0]}</td><td>${t[1]}</td></tr>`).join('');

  const cerfaPage=cfg.cerfa?`
  <div class="page page-break">
    <div class="phead"><div class="phead-title">Déclaration d'activité — CERFA 13984</div><img src="${logoUrl}" class="phead-logo"></div>
    <h1>Déclaration obligatoire à la DDPP</h1>
    <div class="info-box">Tout établissement manipulant des denrées d'origine animale doit effectuer une déclaration via le formulaire CERFA n°13984 avant ouverture, et à chaque changement d'exploitant, d'adresse ou d'activité (Règlement CE 852/2004).</div>
    <h2>Comment déclarer</h2>
    <ol style="font-size:13px;line-height:1.8">
      <li>Téléchargez le formulaire : <strong>entreprendre.service-public.fr</strong> (recherche "CERFA 13984")</li>
      <li>Ou déclarez en ligne : <strong>mesdemarches.agriculture.gouv.fr</strong></li>
      <li>Remplissez l'identification de l'établissement (SIRET, adresse, responsable)</li>
      <li>Cochez les activités correspondantes</li>
      <li>Datez et signez</li>
      <li>Transmettez à votre DDPP départementale</li>
      <li>Conservez le récépissé (demandé lors des contrôles)</li>
    </ol>
    <h2>Votre DDPP</h2>
    <table>
      <tr><td style="width:35%"><strong>Direction</strong></td><td>${cfg.ddppNom||'_______________________________'}</td></tr>
      <tr><td><strong>Adresse</strong></td><td>${cfg.ddppAdresse||'_______________________________'}</td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${cfg.ddppTel||'_______________________________'}</td></tr>
      <tr><td><strong>Email</strong></td><td>${cfg.ddppEmail||'_______________________________'}</td></tr>
    </table>
    <div class="warn-box" style="margin-top:20px">📎 Collez ici une copie de votre récépissé de déclaration DDPP</div>
    <div style="border:2px dashed #cbd5e1;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;color:#cbd5e1;margin-top:12px;font-size:13px">Espace récépissé CERFA 13984</div>
  </div>`:'';

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>PMS — ${cfg.nom}</title>
<style>
*{box-sizing:border-box}
body{font-family:Arial,sans-serif;color:#1a1a2e;font-size:13px;line-height:1.5;margin:0}
.cover{display:flex;flex-direction:column;min-height:100vh;page-break-after:always;background:#060f1e;color:#fff;position:relative;overflow:hidden}
.cover-top{flex:0 0 42%;padding:50px;display:flex;flex-direction:column;justify-content:center;position:relative}
.cover-logo{position:absolute;top:40px;right:50px;text-align:center}
.cover-logo img{height:90px}
.cover-logo .txt{font-size:20px;font-weight:800;margin-top:6px}
.cover-logo .txt span{color:#2dd4a0}
.cover h1.big{font-size:54px;font-weight:800;line-height:1.05;margin:0}
.cover .sub{font-size:22px;color:#2dd4a0;font-weight:700;margin-top:16px}
.cover-divider{height:6px;background:#2dd4a0}
.cover-bottom{flex:1;background:#fff;color:#1a1a2e;padding:50px}
.cover-field{font-size:17px;margin-bottom:18px;border-bottom:1px solid #e2e8f0;padding-bottom:10px}
.cover-field b{color:#475569}
.cover-badges{display:flex;gap:10px;margin-top:30px;flex-wrap:wrap}
.cover-badge{border:1.5px solid #94a3b8;border-radius:20px;padding:6px 16px;font-size:11px;font-weight:700;color:#475569}
.page{padding:0 0 40px;max-width:900px;margin:0 auto;page-break-after:always}
.phead{background:#060f1e;color:#fff;padding:18px 40px;display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.phead-title{font-size:17px;font-weight:700}
.phead-logo{height:42px}
.page>h1,.page>h2,.page>p,.page>ul,.page>ol,.page>table,.page>.mp,.page>.info-box,.page>.warn-box,.page>.ok-box,.page>div{margin-left:40px;margin-right:40px}
h1{font-size:22px;font-weight:800;color:#060f1e;border-bottom:3px solid #2dd4a0;padding-bottom:8px;margin-bottom:16px;margin-top:10px}
h2{font-size:16px;font-weight:700;color:#1e3a5f;background:#f1f5f9;padding:8px 12px;border-left:4px solid #2dd4a0;margin:18px 0 10px}
h3{font-size:14px;font-weight:700;color:#2dd4a0;margin:12px 0 4px}
p{margin-bottom:8px;color:#374151}
table{width:calc(100% - 80px);border-collapse:collapse;margin:10px 40px 16px;font-size:12px}
th{background:#1e3a5f;color:#fff;padding:8px 10px;text-align:left}
td{padding:7px 10px;border-bottom:1px solid #e2e8f0}
tr:nth-child(even) td{background:#f8fafc}
.danger th{background:#dc2626}
.mp{background:#f8fafc;border-left:3px solid #2dd4a0;border-radius:0 6px 6px 0;padding:10px 14px;margin:8px 40px}
.mp h3{margin-top:0}
.mp p{font-size:12px;margin-bottom:4px}
.info-box{background:#dbeafe;border:1px solid #60a5fa;border-radius:6px;padding:10px 14px;margin:8px 40px;font-size:12px}
.warn-box{background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;padding:10px 14px;margin:8px 40px;font-size:12px}
.ok-box{background:#d1fae5;border:1px solid #2dd4a0;border-radius:6px;padding:10px 14px;margin:8px 40px;font-size:12px}
.footer{text-align:center;font-size:10px;color:#94a3b8;margin:30px 40px 0;padding-top:12px;border-top:1px solid #e2e8f0}
ol{margin-left:60px}
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
    <div class="cover-badges">
      <div class="cover-badge">CE 852/2004</div>
      <div class="cover-badge">DGAL/SDSSA 2022-349</div>
      <div class="cover-badge">HACCP</div>
    </div>
  </div>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">I. Présentation & Organisation</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>I. Description de l'établissement</h1>
  <table>
    <tr><td style="width:35%"><strong>Nom commercial</strong></td><td>${cfg.nom}</td></tr>
    ${cfg.raisonSociale?`<tr><td><strong>Raison sociale</strong></td><td>${cfg.raisonSociale}</td></tr>`:''}
    ${cfg.formeJuridique?`<tr><td><strong>Forme juridique</strong></td><td>${cfg.formeJuridique}</td></tr>`:''}
    <tr><td><strong>Activité</strong></td><td>${M.label}</td></tr>
    <tr><td><strong>Adresse</strong></td><td>${cfg.adresse||'—'}</td></tr>
    <tr><td><strong>Responsable</strong></td><td>${cfg.responsable||'—'}</td></tr>
    <tr><td><strong>SIRET</strong></td><td>${cfg.siret||'—'}</td></tr>
    <tr><td><strong>Surface laboratoire</strong></td><td>${cfg.surface?cfg.surface+' m²':'—'}</td></tr>
  </table>
  <h2>Organisation du personnel</h2>
  <table><tr><th>Nom</th><th>Poste</th><th>Formation hygiène</th><th>À jour</th></tr>${usersRows}</table>
  ${cfg.fournisseurs?`<h2>Fournisseurs principaux</h2><p>${cfg.fournisseurs}</p>`:''}
</div>

<div class="page">
  <div class="phead"><div class="phead-title">II. Bonnes pratiques d'hygiène</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>II. Bonnes pratiques d'hygiène</h1>
  <h2>1. Hygiène du personnel</h2>
  <ul>
    <li>Lavage et désinfection des mains : prise de poste, après manipulation souillante, après WC, après déchets</li>
    <li>Tenue propre complète : chaussures, pantalon, veste, tablier, coiffe enveloppant les cheveux</li>
    <li>Blessures protégées par pansement étanche + gant</li>
    <li>Pas de bijoux ni montre. Ne pas tousser/éternuer au-dessus des denrées</li>
    <li>Arrêt de travail en cas d'affection digestive ou de panaris</li>
  </ul>
  <h2>2. Lavage des mains</h2>
  <table><tr><th>Étape</th><th>Action</th></tr>
    <tr><td>1</td><td>Mouiller à l'eau tiède</td></tr><tr><td>2</td><td>Savon bactéricide</td></tr>
    <tr><td>3</td><td>Frotter 20 secondes (mains, poignets, avant-bras, ongles)</td></tr>
    <tr><td>4</td><td>Rincer abondamment</td></tr><tr><td>5</td><td>Sécher par tamponnement (papier jetable)</td></tr>
  </table>
  <h2>3. Lutte contre les nuisibles</h2>
  <table><tr><th>Prestataire</th><th>Fréquence</th></tr><tr><td>${cfg.deratisation||'À renseigner'}</td><td>${cfg.deratFreq||'Trimestrielle'}</td></tr></table>
  <div class="warn-box">⚠️ Conserver les contrats et rapports de passage dans ce classeur</div>
  <h2>4. Approvisionnement en eau</h2>
  <p>Eau du réseau public contrôlée. Aucune eau non contrôlée. Ne pas laisser stagner. Calorifuger pour limiter la condensation.</p>
  <h2>5. Gestion des déchets</h2>
  <ul><li>Poubelles à commande non manuelle, sacs changés régulièrement</li><li>Éloignées des plans de travail des denrées sensibles</li><li>Local déchets nettoyé et désinfecté</li><li>Tri et évacuation réguliers</li></ul>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">III. Maîtrise des températures</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>III. Maîtrise des températures</h1>
  <h2>Températures réglementaires — ${M.label}</h2>
  <table><tr><th>Denrée</th><th>Température</th></tr>${tempRows}</table>
  <h2>Enceintes réfrigérées de l'établissement</h2>
  <table><tr><th>Zone / Meuble</th><th>Seuil min</th><th>Seuil max</th><th>Relevé</th></tr>${zonesRows}</table>
  <div class="info-box">ℹ️ Relevés effectués 2x/jour et enregistrés dans HygiPro. Disponibles sur demande de l'inspection.</div>
  <h2>Plan de nettoyage et désinfection</h2>
  <table><tr><th>Zone</th><th>Surface</th><th>Fréquence</th><th>Produit</th><th>Dilution</th></tr>${nettRows}</table>
  <div class="info-box">ℹ️ Validations de nettoyage enregistrées avec signature dans HygiPro.</div>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">IV. Analyse des dangers (HACCP)</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>IV. Analyse des dangers — ${M.label}</h1>
  <h2>1. Dangers biologiques par étape</h2>
  <p style="font-size:11px;color:#64748b;margin-left:40px">C = Contamination · CS = Multiplication · S = Survie</p>
  <table class="danger"><tr><th>Étape / Danger</th><th>Type</th><th>Mesures de maîtrise</th></tr>${bioRows}</table>
  <h2>2. Dangers chimiques</h2>
  <table class="danger"><tr><th>Danger</th><th>Mesures</th></tr>
    <tr><td>Résidus produits de nettoyage</td><td>Rinçage soigné. Stockage séparé des denrées.</td></tr>
    <tr><td>Allergènes</td><td>Information clients sur 14 allergènes. Nettoyage entre préparations.</td></tr>
    <tr><td>Migration matériaux</td><td>Matériel apte au contact alimentaire uniquement.</td></tr>
  </table>
  <h2>3. Dangers physiques</h2>
  <table class="danger"><tr><th>Corps étranger</th><th>Maîtrise</th></tr>
    <tr><td>Verre</td><td>Protéger les éclairages. Jeter tout produit exposé.</td></tr>
    <tr><td>Métal</td><td>Maintenance du matériel. Vérification avant usage.</td></tr>
    <tr><td>Cheveux</td><td>Coiffe obligatoire.</td></tr>
    <tr><td>Nuisibles</td><td>Plan de lutte. Protection des ouvertures.</td></tr>
  </table>
</div>

<div class="page">
  <div class="phead"><div class="phead-title">V. Fiches matières premières</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>V. Fiches matières premières</h1>
  ${matieresHtml}
</div>

<div class="page">
  <div class="phead"><div class="phead-title">VI. Traçabilité & non-conformes</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>VI. Traçabilité & gestion des non-conformes</h1>
  <h2>Traçabilité</h2>
  <p>Réceptions, productions et températures enregistrées dans HygiPro avec fournisseur, lot, DLC, températures, contrôles et signature.</p>
  <h2>Gestion des produits non conformes</h2>
  <table><tr><th>Situation</th><th>Action</th></tr>
    <tr><td>Produit reçu non conforme</td><td>Refus / retour fournisseur. Pas de mise en vente.</td></tr>
    <tr><td>DLC dépassée</td><td>Destruction. Jamais modifier les dates.</td></tr>
    <tr><td>Température hors seuil</td><td>Vérifier matériel, évaluer dangerosité, alerter responsable.</td></tr>
    <tr><td>Corps étranger</td><td>Retirer le lot, identifier l'origine, alerter.</td></tr>
  </table>
  <h2>Procédure TIAC</h2>
  <div class="warn-box">⚠️ En cas de toxi-infection alimentaire collective (≥2 cas similaires) : appeler l'ARS (0 800 059 059), conserver les aliments suspects au froid, conserver la traçabilité HygiPro, coopérer avec les autorités.</div>
  <h2>Allergènes (Règlement UE 1169/2011)</h2>
  <p style="font-size:11px">Gluten · Crustacés · Œufs · Poissons · Arachides · Soja · Lait · Fruits à coque · Céleri · Moutarde · Sésame · Sulfites · Lupin · Mollusques</p>
</div>

${cerfaPage}

<div class="page" style="page-break-after:auto">
  <div class="phead"><div class="phead-title">Validation</div><img src="${logoUrl}" class="phead-logo"></div>
  <h1>Validation et engagement</h1>
  <table><tr><th>Version</th><th>Date</th><th>Modification</th><th>Validé par</th></tr>
    <tr><td>1.0</td><td>${dateGen}</td><td>Création initiale</td><td>${cfg.responsable||''}</td></tr>
    <tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr>
  </table>
  <p style="margin-top:30px">Le responsable certifie que ce Plan de Maîtrise Sanitaire correspond aux pratiques réelles de l'établissement et s'engage à le mettre à jour en cas de modification des procédés.</p>
  <div style="margin-top:50px;border-top:1px solid #94a3b8;width:280px;padding-top:8px;font-size:12px;color:#64748b">Signature et cachet du responsable</div>
  <div class="footer">${cfg.nom} — Plan de Maîtrise Sanitaire v1.0 — ${dateGen}<br>Généré par HygiPro · hygi-pro.fr · Conforme CE 852/2004 · DGAL/SDSSA 2022-349</div>
</div>

<script>window.onload=function(){setTimeout(function(){window.print();},800);}<\/script>
</body></html>`;
}
