import useStreamCall from "@/hooks/useStreamCall";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";

const EndCallButtons = () => {
  const call = useStreamCall();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const participantIsChannelOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!participantIsChannelOwner) {
    return null;
  }

  return (
    <button
      onClick={call.endCall}
      className="mx-auto block rounded-md bg-red-500 p-4 font-medium text-white hover:underline"
    >
      End Call For Everone
    </button>
  );
};

export default EndCallButtons;
