import { Metadata } from "next";
import MyMeetingPage from "./MyMeetingPage";

export const metadata: Metadata = {
  title: "My Meetings",
};

export default function Page() {
  return <MyMeetingPage />;
}
