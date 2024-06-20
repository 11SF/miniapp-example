# Mini App Sample Project

## Getting Started

This project is a Mini App sample project. It is based on [Next.js](https://nextjs.org/), and styled with [Tailwind CSS](https://tailwindcss.com/).

### Prerequisites

Before running the Mini App sample, ensure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)

### Setting Up the Development Environment

1. **Clone the Sample Repository**

   ```bash
   git clone https://github.com/paotang-miniapp/miniapp-example
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

### Using Ngrok with Your Mini App

During development, if you need to debug your application within the Mini App webview, you can use Ngrok to make your local server accessible over the internet. This enables real-time testing and debugging of your Mini App.

#### Step-by-Step Guide

1. **Run the Mini App Sample**

   Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

2. **Expose Your Local Server with Ngrok**

   Open a new terminal window and run Ngrok to expose your local server:

   ```bash
   ngrok http 3000
   ```

   Ngrok will provide you with a public URL that tunnels to your local server. This URL can be used to access your Mini App from any device.

   > **Note:** If you haven't installed Ngrok yet, please refer to the [Ngrok documentation](https://ngrok.com/docs) for installation instructions.

3. **Update Your Mini App Configuration**

   - **Mini App Redirect URL:** Update the Mini App Redirect URL in the Mini App Portal with the public URL provided by Ngrok.
   - **Paotang Pass Callback URL:** Include the Ngrok URL as the callback URL in your Paotang Pass clientId configuration.

By following these steps, you can effectively test your Mini App in a real-time environment, ensuring that it works as expected when deployed.

<!-- ### Mini App JSBridge

Mini App JSBridge facilitates seamless communication between web views and native applications within mobile development. It acts as a vital intermediary, enabling JavaScript running in a web view to interact with native device functionalities. This bridge enhances the Mini App's capabilities by integrating web-based features with native device features.

For detailed documentation on each function provided by Mini App JSBridge, visit the [Mini App JSBridge Documentation](https://example-jsbridge-docs.com).

#### Usage in Sample Project -->

### Mini App JSBridge

In this sample project, we use the `initAuth` function as an example. This function is initiate the process to authenticate the user with the Paotang PASS and authorize your app.

The integration of `initAuth` showcases a common use case where your Mini App require user authentication to access some personalized features or protected route within the app.

```javascript
initAuth(
      //callback function for success
      (authorizationCode: string) => {
        /*
          Logic to handle the authorization code received from the native app
          after successful authentication
        */
        
      },
      //callback function for error
      (errorCode, errorDescription) => {
        /*
          Logic to handle the error received from the native app 
          after failed authentication
        */
      }
    )
```

For more information on available JSBridge functions and specifications, please refer to the [Mini App JSBridge Documentation](https://ktbinnovation.atlassian.net/wiki/spaces/MA/pages/3498704972/JSBridge+Specifications).
