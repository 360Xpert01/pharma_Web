import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

// This is the correct way to export MDX components in Nextra 4.0
export function useMDXComponents(components) {
  return {
    ...components,
  };
}

const banner = <Banner storageKey="nextra-banner">Welcome to our documentation! 📚</Banner>;
const navbar = <Navbar logo={<b>Next.js Starter</b>} />;
const footer = (
  <Footer>MIT {new Date().getFullYear()} © Next.js Tailwind TypeScript Starter.</Footer>
);

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <title>Next.js Tailwind TypeScript Starter - Documentation</title>
        <meta name="description" content="Documentation for Next.js Tailwind TypeScript Starter" />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/yourusername/next-tailwind-ts-starter/tree/main"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
