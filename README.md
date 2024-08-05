# ATEK aka AFK Journey Team Builder

A team builder for the game AFK Journey.

Also known as ATEK.

Brought to you by AFK Analytica.

## Live Site

[https://atek.afkanalytica.com/](https://atek.afkanalytica.com/)

## Features

- Build your team
- Share your team
- Download your team as an image

## Roadmap

- [x] Migrate characters and images to CMS
- [x] Save teams to turso database
- [ ] Migrate Google Sites guides
- [ ] Better mobile experience
- [ ] Supreme Arena layouts
- [ ] Remaining PvE layouts

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [simplejsoncms](https://simplejsoncms.com/)
- [turso](https://turso.tech)
- [clerk](https://clerk.com)
- [Prisma](https://www.prisma.io/docs/getting-started)

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
pnpm install
npx prisma generate
pnpm dev
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

CREATE TABLE
  roster (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    last_update TEXT,
    user_id VARCHAR(255),
    UNIQUE (id, user_id)
  );

CREATE TABLE
  equipment (
    roster_id INTEGER,
    seasonal BIT,
    equipment_class VARCHAR(255),
    equipment_level VARCHAR(255),
    PRIMARY KEY (roster_id, seasonal, equipment_class) FOREIGN KEY (roster_id) REFERENCES roster (id) ON DELETE CASCADE
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
