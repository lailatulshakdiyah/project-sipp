"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import favicon from "@/assets/img/sipp-favicon.png";
import { Button } from "../ui/button";
import { TbLogin2 } from "react-icons/tb";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/authStore";

export default function HeaderLog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await login({ username, password });
    console.log("Login Response:", response);

    if (response.success && response.token) {
      setAuth({
        token: response.token,
        user: response.user,
        detail: response.user,
        isLoggedIn: true,
      });

      document.cookie = `authToken=${response.token}; path=/; max-age=3600 secure; sameSite=stric`; // 1 jam
      localStorage.setItem("authToken", response.token);

      setOpen(false);
      setIsSubmitting(false);
      router.push("/");
    } else {
      setError(response.error || "Login Gagal, Pengguna Tidak Terdaftar");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full shadow-md xl:p-4 flex justify-between items-center text-accent bg-[#AFE2F8] z-[50]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={favicon} alt="sipp-favicon" width={40} height={40} />
          <h1 className="text-2xl font-semibold text-accent">SIPP Karhutla</h1>
        </Link>
      </div>

      {/* Login Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-[#00CCFF] text-accent rounded-xl hover:bg-[#AFE2F8]"
          >
            <TbLogin2 className="text-xl" />
            <span className="text-md">Login</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-accent text-xl">Login</DialogTitle>
            <DialogDescription>
              Masukkan Email dan Password Anda !
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-accent">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@mail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 text-accent">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full rounded-xl bg-[#0099CC] text-white text-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
