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
- [ ] Save teams to local storage
- [ ] Better mobile experience
- [ ] Supreme Arena layouts
- [ ] Remaining PvE layouts

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [simplejsoncms](https://simplejsoncms.com/)

## Contributing

Open a PR from your personal fork to the `main` branch.

### Running locally

```bash
git clone git@github.com:kmontag42/afk-journey-team-builder.git
cd afk-journey-team-builder
pnpm install
pnpm dev
```

### Updating Data in the CMS

Go to [simplejsoncms](https://simplejsoncms.com/mdb18slfe7).

Update data using their editor.

Input the password.

Hit save.

The `lib/cms-export.json` file is not mandatory to update, but it helps to have.

Be sure to pull in the data from the CMS into this file before making any edits.
