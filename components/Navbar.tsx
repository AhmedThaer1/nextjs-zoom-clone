import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <header className="shadow">
      <div className="max-w-5xl mx-auto h-14 p-3 flex items-center justify-between font-medium">
        <Link href={"/"}>New meeting</Link>
        <SignedIn>
          <div className="flex items-center gap-5">
            <Link href={"/meetings"}>Meetings</Link>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default Navbar;
