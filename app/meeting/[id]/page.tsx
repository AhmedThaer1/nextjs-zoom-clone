import { Metadata } from "next";
import MeetingPage from "./MeetingPage";
import { MeetingProps } from "@/interfaces";

export function generateMetadata({ params: { id } }: MeetingProps): Metadata {
  return {
    title: `Meeting ${id}`,
  };
}

export default function Page({ params: { id } }: MeetingProps) {
  return <MeetingPage id={id} />;
}
