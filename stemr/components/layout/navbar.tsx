"use client";

import React from "react";
import Link from "next/link";
import {
  GitHubLogoIcon,
  QuestionMarkCircledIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { Button } from "../ui/button";
import { AudioLines } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full ">
      <nav
        className="flex items-center justify-between px-3 py-3"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <Link href="/" className="flex items-center space-x-2">
            <AudioLines className="h-5 w-5 text-foreground" />
            <span className="overflow-auto font-semibold leading-tight tracking-tight">
              stemr
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <QuestionMarkCircledIcon className="w-[1.2rem] h-[1.2rem]" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About Stemr</DialogTitle>
                <DialogDescription>
                  Stemr is a web based implementation of the Stem Player,
                  inspired by{" "}
                  <Link href="https://stem.tech/" className="underline">
                    STEM.TECH
                  </Link>
                  <br />
                  <br />
                  <span className="font-bold">Tech Used:</span>
                  <br />
                  <Link
                    href="https://replicate.com/cjwbw/demucs"
                    className="hover:underline"
                  >
                    - Replicate + Demucs Model
                  </Link>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Socials />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

function Socials() {
  return (
    <>
      <Link
        href="https://www.github.com/ChrisAbdo/Stemmer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="icon">
          <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">GitHub</span>
        </Button>
      </Link>
      <Link
        href="https://twitter.com/chrisjabdo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="icon">
          <TwitterLogoIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">GitHub</span>
        </Button>
      </Link>
    </>
  );
}
