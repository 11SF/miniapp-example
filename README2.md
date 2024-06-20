## Mini App Sample Project

### Getting Started

This project is a Mini App sample project. It is based on [Next.js](https://nextjs.org/), a React framework, and styled with [Tailwind CSS](https://tailwindcss.com/).

### Prerequisites

Before running the Mini App sample, ensure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)

### Setting Up the Development Environment

1. **Clone the Sample Repository**

   ```bash
   git clone https://github.com/paotang-miniapp/miniapp-example &&
   cd miniapp-sample-repo
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the Mini App Sample**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open Your Browser**

   Open [http://localhost:3000](http://localhost:3000) to see the result.


### Develop on Ngrok

When developing a Mini App on the Paotang app, you can test your Mini App in real-time by exposing your local server to the internet using Ngrok.

1. **Install Ngrok**

   ```bash
   npm install -g ngrok
   # or
   yarn global add ngrok
   # or
   pnpm install -g ngrok
   # or
   bun install -g ngrok
   ```

2. **Run the Mini App Sample**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. **Expose Your Local Server**

   ```bash
   ngrok http 3000
   ```

   After executing this command, Ngrok will provide you with a public URL. Use this URL to test your Mini App in real-time. Remember to update the Mini App Redirect URL in the Mini App Portal with this Ngrok URL, and also include it as the callback URL for your Paotang Pass clientId configulation.

   ```bash


### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


---

With these instructions, you can set up, run, and develop your Mini App project using both Vercel and Ngrok, ensuring a seamless development and deployment experience.