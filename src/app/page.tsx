"use client";

import Link from "next/link";
import { useUserStore } from "./store/user";
import { Button } from "@/components/ui/button";

export default function Home() {
  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logoutUser);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-2xl font-semibold text-center">
        {currentUser ? (
          `Welcome ${currentUser.email}`
        ) : (
          <>
            Please{" "}
            <Link href="/login" className="text-blue-600 underline">
              login
            </Link>{" "}
            to continue.
          </>
        )}
      </p>

      {currentUser && (
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      )}
    </main>
  );
}
