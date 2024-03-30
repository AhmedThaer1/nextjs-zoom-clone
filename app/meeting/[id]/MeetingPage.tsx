"use client";

import { MeetingPageProps } from "@/interfaces";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const MeetingPage = ({ id }: MeetingPageProps) => {
  const [call, setCall] = useState<Call>();

  const client = useStreamVideoClient();

  if (!client) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  // const handleCall = async () => {
  //   const call = client.call("default", id);
  //   await call.join();
  //   setCall(call);
  // };

  if (!call) {
    return (
      <button
        onClick={async () => {
          const call = client.call("default", id);
          await call.join();
          setCall(call);
        }}
      >
        Join Meeting
      </button>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme className="space-y-3">
        <SpeakerLayout />
        <CallControls />
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingPage;
