# Learning Payload through the William Hamal migration

This project is a working migration of the content and visual direction from `williamhamal.com.np`. It uses Payload 3, Next.js and SQLite.

## Run it

```bash
npm run dev
```

- Website: <http://localhost:3000>
- Payload admin: <http://localhost:3000/admin>
- REST example: <http://localhost:3000/api/projects>
- GraphQL playground: <http://localhost:3000/api/graphql-playground>

The first visit to `/admin` asks you to create the first administrator. This account is stored only in your local SQLite database.

## Lesson 1: collections and globals

A **collection** contains many documents. Open `src/collections/Projects.ts`: every project follows the same schema and gets its own ID, timestamps, REST routes and Admin screens.

The custom collections are:

- `projects`: portfolio case studies
- `experiences`: career timeline entries
- `services`: offerings
- `contact-messages`: submissions from the public form
- `posts`: long-form articles supplied by the official starter

A **global** is a single document. `src/globals/Portfolio.ts` holds the one site identity: masthead, introduction, stats, skills and contact details.

## Lesson 2: access control

In a collection config, `access` decides who can perform each operation. Projects are publicly readable but only authenticated editors may create, update or delete them. Contact messages reverse that pattern: the public may create a message, but only an authenticated editor may read it.

Important: Payload's Local API is trusted server-side code and bypasses access control by default. When using it on behalf of a user, pass `overrideAccess: false`.

## Lesson 3: fetching content

`src/app/(frontend)/page.tsx` is a React Server Component. It calls `getPayload`, then loads the global and four collections in parallel. This is Payload's Local API: it talks directly to SQLite without making an HTTP request.

The browser contact form is different. `src/components/Gazette/ContactForm.tsx` sends a POST request to `/api/contact-messages`. Payload generated this REST endpoint automatically from the collection config.

## Lesson 4: generated types

Payload converts the schemas into `src/payload-types.ts`:

```bash
npm run generate:types
```

Run this after changing fields. The frontend imports `Portfolio` and `Media` from that generated file, so a schema change can produce a useful TypeScript error wherever old field shapes are still used.

## Lesson 5: content import

`src/scripts/seedWilliam.ts` is an idempotent import: running it again updates matching documents instead of duplicating them.

```bash
npm run seed:william
```

This is the same basic pattern used for a full WordPress migration:

1. Export or query WordPress posts and media.
2. Map WordPress fields to Payload fields.
3. Upsert records using a stable key such as `slug`.
4. Upload media and replace old URLs with Payload media relationships.
5. Compare URLs, metadata and rendered content before changing DNS.

## Try these exercises

1. Create the first admin account and change the masthead in **Portfolio**.
2. Add a new **Service** and set its order to `4`.
3. Submit the contact form and find the result under **Contact Messages**.
4. Add a field such as `result` to `Projects`, regenerate types and render it on the project card.
5. Upload the real portrait in **Media**, then select it in **Portfolio → Identity → Profile image**.

## Before production

- Move from local SQLite to the database supported by the chosen host, commonly PostgreSQL.
- Configure cloud object storage for uploaded media.
- Add rate limiting and CAPTCHA/Turnstile to the public contact endpoint.
- Configure an email adapter if a new-message notification is required.
- Export all real WordPress posts and media, then preserve old slugs with redirects.
- Generate and run database migrations in CI.
