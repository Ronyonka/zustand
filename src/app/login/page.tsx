"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../store/user";

import Link from "next/link";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const loginUser = useUserStore((state) => state.loginUser);

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await loginUser(email, password);
      if (!response) {
        throw new Error("Invalid email or password.");
      }
      return response;
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: any) => {
      setError(error.message || "An error occurred.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate({ email, password });
  };

  return (
    <div className="mt-20 flex flex-1 flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Card>
          <CardHeader className="mb-4">
            <CardTitle className="text-center text-3xl">Login</CardTitle>
          </CardHeader>

          <CardContent className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Logging in..." : "Login"}
            </Button>
            <p>
              Don't have an account yet? <Link href="/sign-up">Sign Up</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default LoginPage;
