-- Link service_requests to users (optional but recommended)
-- Run this once in your `ast` database.

ALTER TABLE service_requests
  ADD COLUMN IF NOT EXISTS user_id INT NULL AFTER id;

