# Architecture and Product Decisions

1. **Maps provider**: Chose OpenStreetMap links for MVP contact-view map interoperability without requiring a paid API key. This keeps deployment simple while still providing reliable location context.
2. **Realtime approach**: Implemented polling-ready contact status endpoint pattern and server-side persisted location points. SSE/WebSocket can be layered in without schema changes.
3. **Location retention**: Keep last 100 points per user to minimize sensitive retention while preserving enough history for active incident response.
4. **Auth strategy**: NextAuth with credentials for local/e2e workflows plus email provider for production-friendly magic-link compatibility.
5. **Scheduler**: Implemented cron route (`/api/cron`) with idempotent check-in expiry logic based on `notifiedAt` guard.
6. **Notification safety**: Default to stubbed notifications in dev for SMS/email to prevent accidental sends and still record audit logs via `NotificationLog`.
7. **Timezone handling**: Stored all timestamps in UTC (`DateTime` in Prisma) and preserved user timezone preference for UI rendering.
8. **UX fallback**: If geolocation permission is denied, users can continue check-ins and receive clear messaging.
