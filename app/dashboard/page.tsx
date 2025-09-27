"use client";
import { useAppSelector } from "@/store/hooks";
// import { selectIsAuthenticated } from "@/store/slices/auth-slice"
import Link from "next/link";
import { Button } from "@/components/common/button";

export default function DashboardPage() {
  // const isAuthed = useAppSelector(selectIsAuthenticated)

  // if (!isAuthed) {
  //   return (
  //     <div className="max-w-xl mx-auto py-16 text-center space-y-4">
  //       <h2 className="text-2xl font-semibold">Authentication required</h2>
  //       <p className="text-muted-foreground">Please login to access the dashboard.</p>
  //       <Button asChild>
  //         <Link href="/auth/login" aria-label="Go to login">
  //           Go to Login
  //         </Link>
  //       </Button>
  //     </div>
  //   )
  // }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        You are logged in. This page demonstrates a protected route.
      </p>
    </div>
  );
}
