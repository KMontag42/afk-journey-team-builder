# ATEK aka AFK Journey Team Builder

A team builder for the game AFK Journey.

Also known as ATEK.

Brought to you by AFK Analytica.

## Live Site

[https://analytica.gg](https://analytica.gg)

## Features

- Build your team
- Share your team
- Download your team as an image

## Roadmap

- [x] Migrate Google Sites guides
- [x] Better mobile experience
- [ ] Tag formations
- [ ] More sharing features
- [ ] Better "my formation" organization

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [simplejsoncms](https://simplejsoncms.com/)
- [turso](https://turso.tech)
- [clerk](https://clerk.com)

## Guide Markdown Stack

- [reactMarkdown](https://github.com/remarkjs/react-markdown)
- [remarkGfm](https://github.com/remarkjs/remark-gfm)
- [remarkDirective](https://github.com/remarkjs/remark-directive)
- [remarkDirectiveRehype](https://github.com/IGassmann/remark-directive-rehype)
- [remarkToc](https://github.com/remarkjs/remark-toc)
- [remarkRehype](https://github.com/remarkjs/remark-rehype)
- [rehypeSlug](https://github.com/rehypejs/rehype-slug)

## Contributing

Open a PR from your personal fork to the `main` branch.

### Running locally

```bash
git clone git@github.com:kmontag42/afk-journey-team-builder.git
cd afk-journey-team-builder
cp .env.example .env.local
npm install
npm run dev
```

#### environment variables

```bash
#this one is optional, helpful to override if you are doing development on the data model itself
CHARACTERS_SIMPLEJSONCMS_ID=
# get your clerk development keys after signing up
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
# get your turso keys after signing up
TURSO_AUTH_TOKEN=
TURSO_DATABASE_URL=
```

#### setting up your turso database

```sql
CREATE TABLE
  formations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    formation VARCHAR(255),
    artifact VARCHAR(255),
    layout INTEGER,
    user_id VARCHAR(255),
    name VARCHAR(255)
  );

CREATE TABLE
  votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    formation_id INTEGER,
    user_id VARCHAR(255),
    UNIQUE(formation_id, user_id),
    FOREIGN KEY(formation_id) REFERENCES formations(id) ON DELETE CASCADE
  );
```

#### setting up your clerk instance

- just add discord as your login provider for the development environment
- no need to use a production environment or do anything else more complicated

### Updating Data in the CMS

Go to [simplejsoncms](https://simplejsoncms.com/mdb18slfe7).

Update data using their editor, recommended method is to copy paste the contents of a file into the text editor.

Input the password. If you don't have it, reach out to `0xKRM` on discord and we can talk.

Hit save.

The `lib/cms-export.json` file is not mandatory to update, but it helps to have.

Be sure to pull in the data from the CMS into this file before making any edits.
