import React from "react";
import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { Banner } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const pageMap = await getPageMap();

  const banner = <Banner storageKey="nextra-banner">Welcome to our documentation! 📚</Banner>;

  const navbar = <Navbar logo={<b>Next.js Starter</b>} />;

  const footer = (
    <Footer>MIT {new Date().getFullYear()} © Next.js Tailwind TypeScript Starter.</Footer>
  );

  return (
    <Layout
      banner={banner}
      navbar={navbar}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/yourusername/next-tailwind-ts-starter/tree/main"
      footer={footer}
    >
      {children}
    </Layout>
  );
}
