"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import favicon from "@/assets/img/sipp-favicon.png";
import { Button } from "../ui/button";
import { TbLogin2 } from "react-icons/tb";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReCAPTCHA from "react-google-recaptcha";

const HeaderLog = () => {
  const [open, setOpen] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaValue) {
      console.log("Captcha valid, lanjutkan proses login!");
    } else {
      console.log("Captcha tidak valid, coba lagi!");
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
          <Button size="lg" className="bg-[#00CCFF] text-accent rounded-xl hover:bg-[#AFE2F8]">
            <TbLogin2 className="text-xl" />
            <span className="text-md">Login</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className='text-accent text-xl'>Login</DialogTitle>
            <DialogDescription>Masukkan Email dan Password Anda !</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-accent">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@mail.com" required />
            </div>
            <div className="space-y-2 text-accent">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="******" required />
            </div>

            {/* Google reCAPTCHA */}
            <div className="space-y-2">
              <ReCAPTCHA
                sitekey="6LdR8s4qAAAAAPNMRE7aO9aXoMgsvPD4Re7EAC6P"
                onChange={handleCaptchaChange}
                className="rounded-xl"
              />
            </div>

            <Button type="submit" className="w-full rounded-xl bg-[#0099CC] text-white text-md">Login</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderLog;