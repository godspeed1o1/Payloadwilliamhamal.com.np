# William Hamal Gazette: a practical Payload tutorial

This guide teaches Payload by walking through this exact project. Read it with the website and code open beside you.

## 1. The mental model

Payload has two kinds of things you will work with:

- **Schema and behavior live in TypeScript files.** These files decide which collections and fields exist, who may access them, and what hooks run.
- **Content lives in the database.** Titles, descriptions, projects, posts, and contact messages are saved there and can be edited in `/admin` without changing code.

For example, `src/collections/Projects.ts` defines what a project looks like. The five actual projects live in the SQLite database.

The main data flow is:

```text
Payload Admin (/admin)
        │ edit content
        ▼
SQLite database (william-hamal-payload.db)
        │ Payload Local API
        ▼
Next.js page (src/app/(frontend)/page.tsx)
        │ renders
        ▼
Public website (/)
```

The contact form uses a slightly different path:

```text
Browser form
   │ POST /api/contact-messages
   ▼
Payload REST API
   │ validates fields and access
   ▼
Contact Messages collection
```

## 2. Start the project

Open PowerShell:

```powershell
cd "C:\Users\wilso\Downloads\payload test\william-hamal-payload"
npm run dev
```

Keep that PowerShell window open. Then visit:

- Website: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin>
- Projects REST API: <http://localhost:3000/api/projects>
- GraphQL playground: <http://localhost:3000/api/graphql-playground>

If port 3000 is already in use, a server is probably already running. Use the existing browser tab or stop the old process with `Ctrl+C` before starting another one.

## 3. Create your first administrator

Visit <http://localhost:3000/admin>. On the first visit, Payload asks you to create a user.

That user belongs to the `users` collection configured in `src/collections/Users/index.ts`. Payload automatically supplies the login screen, password hashing, authentication cookie, and user-management interface.

Do not commit the local `.env` or SQLite database. Both are ignored by Git.

## 4. The important project files

| File                                     | Purpose                              | Change it when…                                          |
| ---------------------------------------- | ------------------------------------ | -------------------------------------------------------- |
| `src/payload.config.ts`                  | Central Payload configuration        | Adding a collection, global, database adapter, or plugin |
| `src/globals/Portfolio.ts`               | Schema for the one portfolio profile | Adding a new profile-wide field                          |
| `src/collections/Projects.ts`            | Project schema and permissions       | Changing what each project stores                        |
| `src/collections/Experiences.ts`         | Work-history schema                  | Adding dates, logos, links, etc.                         |
| `src/collections/Services.ts`            | Service schema                       | Adding prices, detail pages, or icons                    |
| `src/collections/ContactMessages.ts`     | Contact inbox and access control     | Changing contact fields or permissions                   |
| `src/collections/Posts/index.ts`         | Blog schema, drafts, hooks, and SEO  | Changing article behavior                                |
| `src/collections/Media.ts`               | Uploaded-image schema                | Changing image sizes or upload behavior                  |
| `src/app/(frontend)/page.tsx`            | Homepage data query and React markup | Changing layout or deciding where content appears        |
| `src/app/(frontend)/globals.css`         | Exact Gazette design and local fonts | Changing colors, fonts, spacing, or responsiveness       |
| `src/components/Gazette/ContactForm.tsx` | Browser-side form submission         | Changing form behavior and feedback                      |
| `src/scripts/seedWilliam.ts`             | Repeatable starter-content import    | Updating imported defaults or migration logic            |
| `src/payload-types.ts`                   | Auto-generated TypeScript types      | Never edit this manually                                 |

## 5. Collections versus globals

### Collection

A collection contains multiple documents. Look at `src/collections/Projects.ts`:

```ts
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'summary', type: 'textarea', required: true },
  ],
}
```

The `slug` becomes the API name. Payload automatically creates:

- An Admin section named Projects
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- Update and delete endpoints
- Database tables and validation
- Generated TypeScript types

### Global

A global is one shared document. There is only one portfolio profile, so `src/globals/Portfolio.ts` is a global. Its fields include the masthead, introduction, statistics, tools, skills, contact details, and portrait.

Use a collection when you can say “many projects” or “many articles.” Use a global when you can say “the site settings” or “the portfolio profile.”

## 6. Edit content without writing code

Try this first:

1. Open `/admin`.
2. Select **Projects**.
3. Open **Gravitate Agency SEO Campaign**.
4. Change its summary.
5. Save.
6. Refresh the homepage.

Why it works:

1. Payload stores your edit in SQLite.
2. `page.tsx` calls `payload.find({ collection: 'projects' })`.
3. React maps `projects.docs` into the comic panels.

The relevant homepage code is:

```tsx
const projects = await payload.find({
  collection: 'projects',
  limit: 20,
  sort: 'order',
})

{
  projects.docs.map((project) => (
    <article key={project.id}>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
    </article>
  ))
}
```

This is Payload's **Local API**. It runs directly on the server and does not make a separate HTTP request to your own application.

## 7. Understand the homepage query

At the top of `src/app/(frontend)/page.tsx`, the page initializes Payload:

```tsx
const payload = await getPayload({ config: configPromise })
```

It loads all homepage data in parallel:

```tsx
const [portfolio, projects, experiences, services, posts] = await Promise.all([
  payload.findGlobal({ slug: 'portfolio', depth: 1 }),
  payload.find({ collection: 'projects', sort: 'order' }),
  payload.find({ collection: 'experiences', sort: 'order' }),
  payload.find({ collection: 'services', sort: 'order' }),
  payload.find({ collection: 'posts', sort: 'publishedAt' }),
])
```

`findGlobal` returns one object. `find` returns a paginated result with a `docs` array.

`depth: 1` tells Payload to populate the related Media document for the portrait rather than returning only its ID.

## 8. Change the design

The design tokens are at the top of `src/app/(frontend)/globals.css`:

```css
:root {
  --ink: #0d0d0d;
  --paper: #f5f0e8;
  --paper2: #ede8d8;
  --red: #cc1f1f;
  --yellow: #f5c842;
  --blue: #1a3a6b;
}
```

Change `--red` once and every red badge, button, and accent changes.

The five original font families are stored in `public/fonts` and registered with `@font-face` in `globals.css`. They are local, so the design does not depend on Google Fonts loading in the visitor's browser.

Useful selectors:

- `.masthead-title`: blackletter newspaper title
- `.hero-headline`: large SEO headline
- `.section-divider-label`: black section labels
- `.comic-grid` and `.comic-panel`: portfolio layout
- `.service-panel`: services
- `.contact-layout`: contact section
- Media queries at the bottom: tablet and phone layouts

## 9. Upload the portrait

1. Open `/admin`.
2. Select **Media** and upload the portrait.
3. Open **Portfolio**.
4. Select the **Identity** tab.
5. Choose the new image in **Profile image**.
6. Save and refresh the homepage.

The schema relationship is:

```ts
{
  name: 'profileImage',
  type: 'upload',
  relationTo: 'media',
}
```

On the frontend, `profile.profileImage` can be either an ID or a populated Media object. `getImageURL` checks the shape before rendering it.

## 10. How the contact form works

The collection config allows public creation but protects the inbox:

```ts
access: {
  create: () => true,
  read: authenticated,
  update: authenticated,
  delete: authenticated,
}
```

The browser submits JSON in `ContactForm.tsx`:

```ts
await fetch('/api/contact-messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message }),
})
```

Payload validates it using the fields in `ContactMessages.ts`, creates the database record, and shows it to authenticated users under **Contact Messages**.

For production, add rate limiting and Cloudflare Turnstile or another CAPTCHA. The current honeypot is useful but not sufficient for a heavily targeted public form.

## 11. Add a new field: project result

This exercise shows the full schema-to-frontend workflow.

### Step A: add the field

Open `src/collections/Projects.ts` and add this after `summary`:

```ts
{
  name: 'result',
  type: 'text',
  admin: {
    description: 'Example: Organic traffic increased by 300%',
  },
}
```

### Step B: regenerate types

```powershell
npm run generate:types
```

Payload updates `src/payload-types.ts`. Do not edit that generated file yourself.

### Step C: edit the content

Restart the development server if necessary, open a project in Admin, fill in **Result**, and save.

### Step D: render the field

Inside the project card in `page.tsx`:

```tsx
{
  project.result && <strong className="project-result">{project.result}</strong>
}
```

Then add its style to `globals.css`.

This is the normal Payload loop:

```text
Change schema → Generate types → Edit content → Render field → Style it
```

## 12. Access control

Projects use this pattern:

```ts
access: {
  create: authenticated,
  delete: authenticated,
  read: anyone,
  update: authenticated,
}
```

Visitors can read projects. Only logged-in users can change them.

One important security rule: the Local API bypasses access control by default because it is trusted server code. If you run a Local API operation on behalf of a particular user, pass both the user and `overrideAccess: false`:

```ts
await payload.find({
  collection: 'contact-messages',
  user,
  overrideAccess: false,
})
```

Without `overrideAccess: false`, passing `user` alone does not enforce that user's permissions.

## 13. Seed and migration script

Run:

```powershell
npm run seed:william
```

`src/scripts/seedWilliam.ts` updates the Portfolio global and upserts projects, experience, services, categories, and posts.

An **upsert** means:

- Update the document if the slug already exists.
- Create it if it does not exist.

That makes the script repeatable without creating duplicate projects every time.

The seed script is also the starting point for a complete WordPress migration. WordPress posts would be read from an export or REST API, mapped into Payload fields, and upserted by slug.

Be careful after you start making real edits in Admin: running this seed script again overwrites the fields included in the script.

## 14. Posts, drafts, and SEO

The starter's `Posts` collection demonstrates more advanced Payload features:

- Lexical rich-text editing
- Draft and published states
- Autosave
- Scheduled publishing
- Live preview
- Categories and authors as relationships
- SEO title, description, and image fields
- Revalidation hooks after publishing

When drafts are enabled, Payload adds `_status` automatically. Public queries should normally return published content, while Admin preview may request draft content.

The post hook in `src/collections/Posts/hooks/revalidatePost.ts` calls Next.js revalidation after a post changes. The seed script passes `context: { disableRevalidate: true }` because there is no browser page to revalidate during a standalone import.

## 15. Useful commands

```powershell
# Development server
npm run dev

# Regenerate types after schema changes
npm run generate:types

# Re-import starter content
npm run seed:william

# TypeScript check
npx tsc --noEmit

# Code-quality check
npm run lint

# Production verification
npm run build

# Run the completed production build
npm run start
```

## 16. Common problems

### Port 3000 is already in use

Another development server is running. Return to its PowerShell window and press `Ctrl+C`, or use the already-running server.

### A new field does not appear in TypeScript

Run `npm run generate:types` after changing the schema.

### A schema edit does not appear in Admin

Restart `npm run dev`. Payload normally reloads configuration automatically, but a restart is the quickest check.

### An image does not render

Confirm it exists in **Media**, is selected in **Portfolio**, and the Media document has a URL. Local uploads are written under `public/media`.

### The seed script triggers a revalidation error

Nested create/update operations that use post hooks should include the context flag used in `seedWilliam.ts`.

### The contact form works but no email arrives

The form currently stores messages in Payload. It does not send notification email until an email adapter and notification hook are configured.

## 17. Suggested learning path

Complete these in order:

1. Edit a project in Admin.
2. Upload and select the portrait.
3. Add a fourth service and choose order `4`.
4. Submit the contact form and inspect the saved message.
5. Complete the `project.result` field exercise.
6. Create and publish a real blog post.
7. Add a project detail route such as `/work/[slug]`.
8. Import the remaining WordPress posts and media.
9. Configure PostgreSQL and cloud media storage for deployment.

After these exercises, you will have touched Payload's schemas, Admin UI, Local API, REST API, relationships, uploads, access control, generated types, hooks, and migration scripts.
