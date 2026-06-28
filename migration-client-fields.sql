-- ============================================
-- HYGIPRO — Champs complets fiche client
-- ============================================
ALTER TABLE saas_clients ADD COLUMN IF NOT EXISTS raison_sociale text;
ALTER TABLE saas_clients ADD COLUMN IF NOT EXISTS forme_juridique text;
ALTER TABLE saas_clients ADD COLUMN IF NOT EXISTS siret text;
ALTER TABLE saas_clients ADD COLUMN IF NOT EXISTS metier text;
ALTER TABLE saas_clients ADD COLUMN IF NOT EXISTS adresse text;
ALTER TABLE saas_clients ADD COLUMN IF NOT EXISTS code_postal text;
ALTER TABLE saas_clients ADD COLUMN IF NOT EXISTS tel_fixe text;
