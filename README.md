This is a Mini App sample project.

## Getting Started

<!-- First, run the development server: -->

This project is a Mini App sample project. It is based on [Next.js](https://nextjs.org/), which is a React framework and styled with [Tailwind CSS](https://tailwindcss.com/).

First, before running the Mini App sample, you need to install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, you can run the Mini App sample:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<!-- You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font. -->

<!-- ## Learn More

To learn more about Mini App, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome! -->

## Develop on Ngrok

When you develop a Mini App on Paotang app, if your want to test your Mini App in real-time, you need to expose your local server to the internet.

You can use [Ngrok](https://ngrok.com/) to expose your local server to the internet. 

First, you need to install Ngrok:

```bash
npm install -g ngrok
# or
yarn global add ngrok
# or
pnpm install -g ngrok
# or
bun install -g ngrok
```

Then, you can run the Mini App sample:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

And expose your local server to the internet:

```bash
ngrok http 3000
```



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
