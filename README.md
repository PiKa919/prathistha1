This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

The project is organized into the following main directories:

### `/app`
Contains the main application components and pages. This is where you will find the entry point of the application and the routing logic.

### `/components`
Contains reusable React components used throughout the application. Each component is typically placed in its own file.

### `/public`
Contains static assets such as images, fonts, and other files that are served directly by the server.

### `/styles`
Contains global styles and CSS modules used in the application.

### `/utils`
Contains utility functions and helper modules that are used across the application.

### `/api`
Contains API route handlers for server-side functionality.

## Using the Project

### Adding a New Component

To add a new component, create a new file in the `/components` directory. For example, to add a new `Button` component:

```bash
touch src/components/Button.tsx
```

Then, define your component in the new file:

```tsx
import React from 'react';

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

export default Button;
```

### Adding a New Page

To add a new page, create a new file in the `/app` directory. For example, to add a new `About` page:

```bash
touch src/app/about.tsx
```

Then, define your page in the new file:

```tsx
import React from 'react';

const About = () => (
  <div>
    <h1>About Us</h1>
    <p>This is the about page.</p>
  </div>
);

export default About;
```

### Adding Static Assets

To add static assets, place them in the `/public` directory. For example, to add a new image:

```bash
cp path/to/image.png public/images/
```

Then, you can reference the image in your components:

```tsx
import React from 'react';

const ImageComponent = () => (
  <img src="/images/image.png" alt="Description" />
);

export default ImageComponent;
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Team

- Ankit Das
- Deep
- Dilip
- Shlok
- Harshil
- Dhruv
