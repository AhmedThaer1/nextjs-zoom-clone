import Button, { buttonClasses } from "@/components/Button";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const MeetingLoginPage = () => {
  return (
    <div className="ms-auto w-fit space-y-3">
      <h1 className="text-center text-2xl font-bold">Join meeting</h1>
      <ClerkLoaded>
        <SignInButton>
          <Button className="w-44">Sign In</Button>
        </SignInButton>
        <Link
          href="?guest=true"
          className={cn(buttonClasses, "w-44 bg-gray-400 hover:bg-gray-500")}
        >
          Continue as Guest
        </Link>
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="mx-auto animate-spin" />
      </ClerkLoading>
    </div>
  );
};

export default MeetingLoginPage;
