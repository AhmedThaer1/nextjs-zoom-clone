import { Metadata } from "next";
import MeetingPage from "./MeetingPage";
import { MeetingProps } from "@/interfaces";
import { currentUser } from "@clerk/nextjs";
import MeetingLoginPage from "./MeetingLoginPage";

export function generateMetadata({ params: { id } }: MeetingProps): Metadata {
  return {
    title: `Meeting ${id}`,
  };
}

export default async function Page({
  params: { id },
  searchParams: { guest },
}: MeetingProps) {
  const user = await currentUser();

  const guestMode = guest === "true";

  if (!user && !guestMode) {
    return <MeetingLoginPage />;
  }

  return <MeetingPage id={id} />;
}
