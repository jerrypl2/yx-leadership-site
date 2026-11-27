CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY NOT NULL,
  payload TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  notification_state TEXT NOT NULL DEFAULT 'pending',
  first_attempt_at INTEGER,
  next_attempt_at INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  provider_id TEXT
);
--> statement-breakpoint
CREATE INDEX contact_outbox ON contact_messages(notification_state, next_attempt_at);
