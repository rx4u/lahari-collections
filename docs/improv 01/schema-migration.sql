-- Migration: Add template-hub fields to web_agency_pipeline
-- Run in Supabase SQL Editor after existing schema is in place

-- Replace legacy build_mode default
ALTER TABLE web_agency_pipeline
  ALTER COLUMN build_mode SET DEFAULT 'template-hub';

-- Template Hub specific columns
ALTER TABLE web_agency_pipeline
  ADD COLUMN IF NOT EXISTS business_type TEXT,           -- template-hub BusinessType (doctor, restaurant, salon, etc.)
  ADD COLUMN IF NOT EXISTS preset_id TEXT,               -- designdotmd theme applied (coffee-roast, atelier-noir, etc.)
  ADD COLUMN IF NOT EXISTS hero_variant TEXT,             -- hero layout used (split-screen, centered, full-bleed, etc.)
  ADD COLUMN IF NOT EXISTS animation_tier TEXT,           -- subtle, standard, premium
  ADD COLUMN IF NOT EXISTS design_brief JSONB,           -- full design-brief.json from Design Director
  ADD COLUMN IF NOT EXISTS site_config JSONB,            -- generated site.config.ts as JSON (for rebuild/remix)
  ADD COLUMN IF NOT EXISTS remix_count INTEGER DEFAULT 0, -- how many times remix was run
  ADD COLUMN IF NOT EXISTS last_remix_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS lighthouse_score INTEGER,      -- post-deploy Lighthouse performance score
  ADD COLUMN IF NOT EXISTS repo_path TEXT;                -- local path e.g. ~/claude-code/clients/spice-garden

-- Index for common lookups
CREATE INDEX IF NOT EXISTS idx_pipeline_business_type ON web_agency_pipeline(business_type);
CREATE INDEX IF NOT EXISTS idx_pipeline_status ON web_agency_pipeline(status);
CREATE INDEX IF NOT EXISTS idx_pipeline_preset ON web_agency_pipeline(preset_id);

-- Updated MRR view with template-hub metrics
CREATE OR REPLACE VIEW web_agency_mrr AS
SELECT
  COUNT(*) FILTER (WHERE status = 'live') as active_clients,
  COALESCE(SUM(monthly_rate) FILTER (WHERE status = 'live'), 0) as mrr,
  COALESCE(SUM(monthly_rate) FILTER (WHERE status = 'live'), 0) * 12 as arr,
  COALESCE(SUM(setup_fee) FILTER (WHERE status IN ('won','building','delivered','live')), 0) as total_setup_collected,
  COUNT(*) FILTER (WHERE status = 'new') as new_leads,
  COUNT(*) FILTER (WHERE status = 'contacted') as contacted,
  COUNT(*) FILTER (WHERE status = 'quoted') as quoted,
  COUNT(*) as total_pipeline,
  -- Template Hub metrics
  COUNT(*) FILTER (WHERE build_mode = 'template-hub') as template_hub_builds,
  SUM(remix_count) as total_remixes,
  AVG(lighthouse_score) FILTER (WHERE lighthouse_score IS NOT NULL) as avg_lighthouse_score,
  -- Breakdown by business type
  jsonb_object_agg(
    COALESCE(business_type, 'unknown'),
    (SELECT COUNT(*) FROM web_agency_pipeline p2 WHERE p2.business_type = web_agency_pipeline.business_type)
  ) FILTER (WHERE business_type IS NOT NULL) as type_distribution
FROM web_agency_pipeline;

-- Preset performance view (which themes produce the best outcomes)
CREATE OR REPLACE VIEW web_agency_preset_stats AS
SELECT
  preset_id,
  business_type,
  COUNT(*) as times_used,
  AVG(lighthouse_score) FILTER (WHERE lighthouse_score IS NOT NULL) as avg_lighthouse,
  COUNT(*) FILTER (WHERE status IN ('won', 'building', 'delivered', 'live')) as conversions,
  COUNT(*) FILTER (WHERE status = 'live') as active_sites,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE status IN ('won', 'building', 'delivered', 'live'))
    / NULLIF(COUNT(*), 0),
    1
  ) as conversion_rate_pct
FROM web_agency_pipeline
WHERE preset_id IS NOT NULL
GROUP BY preset_id, business_type
ORDER BY times_used DESC;
