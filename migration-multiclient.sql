-- ============================================
-- HYGIPRO — Migration multi-clients
-- Ajoute client_slug à toutes les tables
-- ============================================

-- Table users (email pour responsable + client_slug)
ALTER TABLE users ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS client_slug text;

-- Toutes les tables de données métier
ALTER TABLE zones ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE temperature_readings ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE plan_nettoyage ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE nettoyage_completions ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE haccp_tasks ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE haccp_completions ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE labels ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE receptions ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE incidents ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE etiquettes_gen ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE cuisson_tracabilite ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE jours_fermeture ADD COLUMN IF NOT EXISTS client_slug text;

-- Index pour accélérer les requêtes filtrées par client
CREATE INDEX IF NOT EXISTS idx_users_client ON users(client_slug);
CREATE INDEX IF NOT EXISTS idx_zones_client ON zones(client_slug);
CREATE INDEX IF NOT EXISTS idx_temp_client ON temperature_readings(client_slug);
CREATE INDEX IF NOT EXISTS idx_nettoyage_client ON plan_nettoyage(client_slug);
CREATE INDEX IF NOT EXISTS idx_nettcomp_client ON nettoyage_completions(client_slug);
CREATE INDEX IF NOT EXISTS idx_haccp_client ON haccp_tasks(client_slug);
CREATE INDEX IF NOT EXISTS idx_haccpcomp_client ON haccp_completions(client_slug);
CREATE INDEX IF NOT EXISTS idx_labels_client ON labels(client_slug);
CREATE INDEX IF NOT EXISTS idx_docs_client ON documents(client_slug);
CREATE INDEX IF NOT EXISTS idx_recept_client ON receptions(client_slug);
CREATE INDEX IF NOT EXISTS idx_incid_client ON incidents(client_slug);
CREATE INDEX IF NOT EXISTS idx_etiq_client ON etiquettes_gen(client_slug);
CREATE INDEX IF NOT EXISTS idx_cuisson_client ON cuisson_tracabilite(client_slug);
CREATE INDEX IF NOT EXISTS idx_jours_client ON jours_fermeture(client_slug);

-- ============================================
-- Affecte les données existantes à un client de démo
-- ⚠️ REMPLACE 'mon-etablissement' par le slug de TON client principal
-- (laisse tel quel si tu veux que tes données actuelles soient ce client)
-- ============================================
UPDATE users SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE zones SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE temperature_readings SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE plan_nettoyage SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE nettoyage_completions SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE haccp_tasks SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE haccp_completions SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE labels SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE documents SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE receptions SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE incidents SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE etiquettes_gen SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE cuisson_tracabilite SET client_slug='mon-etablissement' WHERE client_slug IS NULL;
UPDATE jours_fermeture SET client_slug='mon-etablissement' WHERE client_slug IS NULL;

-- Crée aussi l'entrée client dans saas_clients si pas déjà fait
INSERT INTO saas_clients (nom, slug, responsable, email, plan, statut, paiement, date_debut)
VALUES ('Mon Établissement', 'mon-etablissement', 'Responsable', 'responsable@monetablissement.fr', 'pro', 'actif', 'ok', CURRENT_DATE)
ON CONFLICT (slug) DO NOTHING;
