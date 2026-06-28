# 📋 HYGIPRO — Cahier des charges (à jour)

> **Document de reprise de projet.** À transmettre à toute personne ou IA pour continuer le développement sans perdre le contexte. Dernière mise à jour : 28 juin 2026.

---

## 1. VISION DU PROJET

**HygiPro** est une application web (PWA) de conformité HACCP et d'hygiène alimentaire, doublée d'un back-office SaaS. Double objectif :
1. **Outil opérationnel** pour des établissements alimentaires (gestion quotidienne hygiène/traçabilité).
2. **Produit SaaS commercial** vendu en abonnement aux commerces de bouche en France.

**Marché cible** : boulangeries-pâtisseries, restaurants, boucheries-charcuteries (~33 000 boulangeries en France + extension autres métiers).

**Langue/locale** : 100% français.

**Concurrent identifié** : Octopus HACCP (~80-150€/mois).

---

## 2. ACCÈS & INFRASTRUCTURE

### Dépôt de code
- **GitHub** : `https://github.com/hygipro-netizen/hygipro`
- **Workflow** : modifier les fichiers → `git add` → `git commit` → `git push origin main`
- Vercel auto-déploie depuis `main` (délai 30-60s).

### Déploiement
- **App principale** : `hygipro.vercel.app`
- **Back-office SaaS** : `hygipro.vercel.app/admin-saas.html`
- **Domaine acheté (OVH)** : `hygi-pro.fr` (DNS vérifié pour les emails ; reste à connecter à Vercel pour le site vitrine).

### Stack technique
- **Frontend** : fichiers HTML autonomes (pas de framework), PWA installable.
- **Backend** : Supabase — URL `https://mzyrffxosabnmkcqduvc.supabase.co`
- **Hébergement** : Vercel (fonctions serverless pour les emails).
- **Emails** : Resend, expéditeur `contact@hygi-pro.fr` (domaine vérifié). Route serveur `/api/send-email.js`.
- **Autres** : OCR.space (lecture étiquettes), html5-qrcode (scan QR), api.qrserver.com (génération QR), Chart.js (graphiques), html2pdf.js (génération PDF du PMS).

---

## 3. FICHIERS DU DÉPÔT

| Fichier | Rôle |
|---|---|
| `index.html` | Application principale (~3500 lignes) : login, modules HACCP, etc. |
| `admin-saas.html` | Back-office SaaS (~1200 lignes) : gestion clients, factures, générateur PMS. |
| `pms-builder.js` | Moteur de génération du PMS multi-métiers (boulangerie/restaurant/boucherie). |
| `pms.html` | Ancien générateur PMS autonome (déprécié, remplacé par le back-office). |
| `api/send-email.js` | Fonction serverless Vercel pour envoyer des emails via Resend. |
| `manifest.json` | Manifeste PWA (icônes, couleurs). |
| `logo.png`, `icon.png`, `icon-192.png`, `icon-512.png` | Logo et icônes (bouclier QR code + « H » mint). |
| `migration-multiclient.sql` | Script SQL : ajout `client_slug` à toutes les tables. |
| `migration-client-fields.sql` | Script SQL : champs fiche client (SIRET, adresse, etc.). |

---

## 4. BASE DE DONNÉES (SUPABASE)

**⚠️ Toutes les tables ont une RLS policy "allow all"** (sécurité minimale — voir section Sécurité).

### Tables principales
- `users` : comptes de connexion. Champs : `name`, `role` (admin/responsable/patissier/boulanger/vendeuse), `pin` (6 chiffres), `email`, `active`, `permissions` (JSON), **`client_slug`**.
- `saas_clients` : clients SaaS. Champs : `nom`, `slug` (UNIQUE), `responsable`, `email`, `tel`, `tel_fixe`, `ville`, `adresse`, `code_postal`, `raison_sociale`, `forme_juridique`, `siret`, `metier`, `plan`, `statut` (actif/suspendu/resilié), `paiement`, `date_debut`, `renouvellement`, `notes`.
- `saas_factures` : factures. Champs : `numero`, `client_id`, `client_nom`, `mois`, `montant_ht`, `tva`, `montant_ttc`, `description`, `statut`.

### Tables métier (toutes avec `client_slug`)
`zones`, `temperature_readings`, `plan_nettoyage`, `nettoyage_completions`, `haccp_tasks`, `haccp_completions`, `labels`, `documents`, `receptions`, `incidents`, `etiquettes_gen`, `cuisson_tracabilite`, `jours_fermeture`.

Aussi présentes : `stock_movements`, `orders` (référencent `users`).

### Storage
- Bucket `hygipro-photos` : photos, documents, PDF des PMS.

### Notes SQL utiles
- Ajouter une colonne : `ALTER TABLE x ADD COLUMN IF NOT EXISTS col text;`
- Supprimer des données liées aux users : supprimer d'abord les tables enfants (temperature_readings, etc.) AVANT users (contraintes de clés étrangères).

---

## 5. ARCHITECTURE MULTI-CLIENTS (CŒUR DU SAAS)

**Principe** : chaque donnée appartient à un client via la colonne `client_slug`.

- L'app s'ouvre via `hygipro.vercel.app?client=SLUG`.
- Au chargement, `currentClientSlug` est lu depuis l'URL.
- Un **wrapper Supabase** (`db` dans `index.html`) filtre AUTOMATIQUEMENT toutes les lectures (`.eq('client_slug', slug)`) et enrichit toutes les écritures (ajout du `client_slug`). Tables concernées listées dans `SCOPED_TABLES`.
- `saas_clients` et `saas_factures` ne sont PAS filtrées (gestion globale).
- `checkClientStatus()` vérifie le statut du client : si `suspendu`/`resilié` → écran de blocage (#suspendedScreen).

---

## 6. AUTHENTIFICATION (2 MODES — type caisse enregistreuse)

1. **Niveau back-office** : l'admin crée un client → un compte `responsable` est créé automatiquement dans `users` (PIN aléatoire 6 chiffres + email envoyé).
2. **Mode Responsable** (app) : email + PIN → accès complet (admin). Vérifié dans `users` (role admin/responsable + email + pin).
3. **Mode Salarié** (app) : cards style Netflix (avatars colorés) + PIN → accès limité aux tâches. Le responsable crée les salariés depuis Admin → Salariés.

L'app a un **splash screen animé** au lancement (logo + "HygiPro" + tagline).

---

## 7. FONCTIONNALITÉS DE L'APP (index.html) — COMPLÉTÉES

- **Login** : splash animé, choix mode responsable/salarié.
- **Accueil** : dashboard, scan QR (→ relevé température meuble ou validation nettoyage).
- **Hygiène HACCP** : tâches + signature.
- **Températures** : relevés 14h/21h, graphique, notifications (respectent les jours de fermeture).
- **Traçabilité** : étiquettes, scan code-barre, OCR.
- **Étiquettes** : 4 types, DLC automatique.
- **Documents** : lecteur PDF intégré, catégories dont **PMS**, filigrane. Permissions par rôle.
- **Réception livraisons** (CE 852/2004).
- **Incidents** : 7 catégories HACCP.
- **Plan de nettoyage** : 16 tâches METRO, signature, progression, filtres par zone.
- **Traçabilité cuisson** : température à cœur ≥63°C obligatoire, alerte si <63°C.
- **Admin** : Dashboard (KPIs, MRR) | Salariés | Zones | Fermetures | Rapports.
- **Jours de fermeture** : suppression des notifications les jours non travaillés.
- **QR Codes** : génération meubles + tâches.
- **Export PDF DDPP** : rapport 7 jours (Admin → Rapports).

---

## 8. BACK-OFFICE SAAS (admin-saas.html) — COMPLÉTÉ

- **Mot de passe admin** : `HygiPro2025!` (à changer).
- **Sidebar** : Dashboard | Tous les clients | Impayés | Factures | Abonnements | **Générateur PMS**.
- **Dashboard** : MRR, clients actifs, impayés, suspendus, breakdown par plan, renouvellements J-7.
- **Clients** : recherche, filtres, copie du lien client en 1 clic, suspendre/résilier/réactiver (avec emails auto). **Formulaire complet** : nom commercial, slug, raison sociale, forme juridique, SIRET, type d'activité, adresse, CP, ville, responsable, tél portable + fixe, email, plan, date.
- **Création client** : crée le client + le compte responsable (PIN aléatoire) + envoie l'email de bienvenue avec identifiants.
- **Impayés** : relance email, marquer payé.
- **Factures** : génération PDF (TVA 20%), envoi email, marquer payée.
- **Générateur PMS** : voir section 9.

---

## 9. GÉNÉRATEUR PMS (le gros morceau récent)

**Où** : back-office → onglet "Générateur PMS". (Décision : généré par l'admin, PAS par le client.)

**Flux** :
1. Admin sélectionne un client → infos pré-remplies (SIRET, adresse, raison sociale, métier, téléphones).
2. Choisit le métier : **Boulangerie-Pâtisserie / Restaurant / Boucherie-Charcuterie**.
3. Remplit : SIRET, surface labo, **DDPP** (nom/adresse/tél/email — champs vides car varient selon le département), fournisseurs, dératisation.
4. Options : inclure CERFA, sauvegarder dans Documents du client.
5. Clic "Générer" → le PMS est produit en **PDF** (via html2pdf.js), stocké dans Supabase Storage, et inséré dans la table `documents` (catégorie PMS, `client_slug` du client).
6. Le client voit son PMS dans l'app → onglet Documents → PMS → lecteur PDF.

**Contenu du PMS** (`pms-builder.js`) : structure conforme **annexe II note de service DGAL/SDSSA 2022-349**. ~22 pages :
- Couverture premium (logo HygiPro, design noir/mint).
- Sommaire.
- I. Description des activités (tableau ÉTABLISSEMENT, champs vierges pour horaires/date/CERFA).
- II. Bonnes pratiques : personnel (formation, tenue, lavage mains, santé, plaies), maintenance locaux/équipements (tableau prestataires vierge), nettoyage (méthode TACT/cercle de Sinner), nuisibles, eau, températures.
- III. HACCP : champ d'application, dangers biologiques (tableau complet : Bacillus, Clostridium, Listeria, Salmonella, E. coli, etc.), dangers chimiques, physiques, méthode 5M, fiches matières premières détaillées, étapes (congélation, cuisson, refroidissement, déchets, locaux, plan de travail, air), CCP/PrPo.
- IV. Traçabilité, non-conformes, TIAC, allergènes.
- V. Annexes (15 procédures listées).
- Page de validation/signature.

**Contenu adapté par métier** : chaque métier a ses propres températures, fiches matières premières spécifiques (volailles/poissons pour resto ; carcasses/hachage/charcuterie pour boucherie), et CCP/PrPo.

**Champs "à remplir à la main"** : marqués par des pointillés (formations, équipements, prestataires, dates, DDPP, récépissé). Décision validée : version complète mais avec zones vierges.

---

## 10. BRANDING

- **Logo** : bouclier texture QR code + lettre "H" mint au centre. Fond transparent (PNG). Généré par Gemini, traité avec Pillow (fond rendu transparent, recadré sur le bouclier).
- **Couleurs** : navy `#060f1e`, vert mint `#2dd4a0`, blanc. Texte logo : "HYGI" blanc + "PRO" mint. Tagline : "HACCP · Hygiène · Traçabilité".
- **Assets Gemini validés** (dans les uploads, à réutiliser) : logo transparent, page de garde PMS, page intérieure PMS, template email, **landing page hero (avec mockup app iPhone)**, carte de visite recto/verso, screenshot App Store (conformité 98%).

---

## 11. DÉCISIONS BUSINESS

- **Tarifs** : Starter 39€/mois · Pro 69€/mois · Premium 99€/mois.
- **Coûts** : Vercel + Supabase gratuits pour 1 client ; ~135€/mois pour 10 clients. Rentable dès 2 clients.
- **Architecture multi-clients** via `?client=slug` (sous-domaines reportés tant que pas de clients, pour éviter Vercel Pro 20€/mois).
- **INPI** : enregistrer la marque "HygiPro" (~250€) — à faire.

---

## 12. SÉCURITÉ (IMPORTANT À SAVOIR)

⚠️ **État actuel** : clé anon Supabase exposée côté client + RLS "allow all" = techniquement, quelqu'un de motivé peut lire les données via la console navigateur. Acceptable au stade pré-lancement (0-1 client), à durcir avant de scaler.

**Plan de durcissement (validé)** :
- **Étape 1 (fait)** : système PIN + 2 modes responsable/salarié.
- **Étape 2 (à 2-3 clients)** : migrer vers Supabase Auth (mots de passe chiffrés bcrypt, tokens sécurisés).
- **Étape 3 (10+ clients)** : sous-domaines, RLS stricte par client.

Principe directeur : **ne pas sur-investir en sécurité avant d'avoir des clients payants**.

---

## 13. CE QUI RESTE À FAIRE

### Court terme
- [ ] **Tester** le PMS PDF généré pour les 3 métiers (vérifier rendu, pagination).
- [ ] Vérifier le flux complet : création client back-office → email reçu → connexion responsable → création salariés → connexion salarié.

### Moyen terme
- [ ] **Landing page** `hygi-pro.fr` (site vitrine) — hero Gemini déjà prêt. **Prévu à la fin.**
- [ ] Connecter le domaine `hygi-pro.fr` à Vercel (remplacer hygipro.vercel.app).
- [ ] Styliser le template email Resend avec le design Gemini.
- [ ] INPI : enregistrer la marque.

### Long terme (idées, inspirées d'Octopus)
- [ ] Alertes intelligentes (temp non relevée, incident critique >24h, nettoyage incomplet, DLC J-1, score hygiène).
- [ ] Mode hors ligne (Service Worker).
- [ ] Assistant IA intégré (Claude API).
- [ ] Migration Supabase Auth (sécurité).
- [ ] Paiement Stripe (abonnements automatiques).
- [ ] Scan d'étiquettes par IA.

---

## 14. POINTS DE VIGILANCE TECHNIQUES

- **Pattern Supabase v2** : utiliser `const r = await db.from(...); r.data` (pas de `.catch()` directement sur la query).
- **PMS = PDF** (pas HTML brut) car Supabase sert le HTML en text/plain → s'affichait comme du code. Résolu avec html2pdf.js.
- **PWA** : si le logo ne se met pas à jour, désinstaller/réinstaller l'app depuis le téléphone.
- **SQL Editor Supabase** parfois capricieux : recharger la page + New query si bloqué.
- **Resend gratuit** : domaine `hygi-pro.fr` vérifié, donc envoi vers n'importe quel destinataire OK.

---

*Fin du cahier des charges. Pour reprendre : cloner le repo GitHub, lire ce document, et continuer depuis "Ce qui reste à faire".*
