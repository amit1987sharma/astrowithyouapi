-- Optional migration helpers for service_requests table
-- Run this only if your table does not yet have these columns.

ALTER TABLE service_requests
  ADD COLUMN IF NOT EXISTS pdf_path VARCHAR(255) NULL AFTER status,
  ADD COLUMN IF NOT EXISTS error TEXT NULL AFTER pdf_path;

