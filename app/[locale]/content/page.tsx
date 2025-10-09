import { redirect } from "next/navigation";

export default function DocsPage() {
  // Redirect to the index page or getting started
  redirect("/docs/getting-started");
}
