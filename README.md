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
- Like teams
- Search for teams
- Guides written in markdown

## Roadmap

Check out the [dev tracker](https://analytica.gg/dev-tracker)

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

### Setting up Your Turso Database

1. **Create a Group on Turso**
   - Go to [Turso](https://turso.tech) and log in or sign up.
   - Create a new group for your project. When prompted to choose a provider, select **Fly.io**.

2. **Create a Database in the Group**
   - Within the group, set up a new database.
   - Note down the database name for future reference.

3. **Generate a Token for Your Database**
   - Navigate to the database settings and press create token.
   - After generating the token, you will receive the following:
     - **TURSO_AUTH_TOKEN**: Your authentication token.
     - **TURSO_DATABASE_URL**: The URL for your database.

4. **Add Credentials to `.env.local`**
   - Open the `.env.local` file in your project directory.
   - At the following lines, add your Turso credentials:
     ```bash
     TURSO_AUTH_TOKEN=
     TURSO_DATABASE_URL=
     ```

5. **Run Drizzle Migrations**
   - Run the following command in your terminal to apply the Drizzle migrations to your database:
     ```bash
     npm run drizzle migrate
     ```

6. **Verify the Database Setup**
   - Confirm that the migrations ran successfully and the database is populated with the required tables.

7. **Troubleshooting**
   - Double-check your credentials in `.env.local` for typos.
   - Refer to the [Turso documentation](https://docs.turso.tech) for additional help if needed.

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
