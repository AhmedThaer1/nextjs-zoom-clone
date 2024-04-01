"use client";

import { buttonClasses } from "@/components/Button";
import useLoadCall from "@/hooks/useLoadCall";
import useStreamCall from "@/hooks/useStreamCall";
import { MeetingPageProps } from "@/interfaces";
import { useUser } from "@clerk/nextjs";
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const MeetingPage = ({ id }: MeetingPageProps) => {
  const { user, isLoaded: userLoaded } = useUser();

  const { call, callLoading } = useLoadCall(id);

  if (!userLoaded || callLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!call) {
    return <p className="text-center font-bold ">Call Not Found</p>;
  }

  const notAllowedToJoinCall =
    call.type === "private-meeting" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowedToJoinCall) {
    return (
      <p className="text-center font-bold">
        You are not allowed to join this call. Please contact the host for
        access.
      </p>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        <MeetingScreen />
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingPage;

function MeetingScreen() {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();

  const callIsInFuture = callStartsAt && new Date(callStartsAt) > new Date();

  const callHasEnded = !!callEndedAt;

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }

  if (callIsInFuture) {
    return <UpcomingMeetingScreen />;
  }

  return <div>Call UI</div>;
}

function UpcomingMeetingScreen() {
  const call = useStreamCall();

  return (
    <div className="flex flex-col items-center gap-6">
      <p>
        This Meeting Has Not Started Yet. it will start at{" "}
        <span className="font-bold">
          {call.state.startsAt?.toLocaleDateString()}
        </span>
      </p>
      {call.state.custom.description && (
        <p>
          Description:{" "}
          <span className="font-bold">{call.state.custom.description}</span>
        </p>
      )}
      <Link className={buttonClasses} href="/">
        Back Home
      </Link>
    </div>
  );
}

function MeetingEndedScreen() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This Meeting Has Ended</p>
      <Link className={buttonClasses} href="/">
        Back Home
      </Link>
    </div>
  );
}
