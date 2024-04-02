import useStreamCall from "@/hooks/useStreamCall";
import {
  Call,
  CallControls,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";
import EndCallButtons from "./EndCallButtons";
import { useRouter } from "next/navigation";

type CallLayout = "speaker-vertical" | "speaker-horizontal" | "grid";
interface CallLayoutViewProps {
  layout: CallLayout;
}
interface CallLayoutButtonsProps {
  layout: CallLayout;
  setLayout: (layout: CallLayout) => void;
}

export default function DynamicCallLayout() {
  const [layout, setLayout] = useState<CallLayout>("speaker-vertical");

  const call = useStreamCall();

  const router = useRouter();

  return (
    <div className="space-y-3">
      <CallLayoutButtons layout={layout} setLayout={setLayout} />
      <CallViewLayout layout={layout} />
      <CallControls onLeave={() => router.push(`/meeting/${call.id}/left`)} />
      <EndCallButtons />
    </div>
  );
}

const CallLayoutButtons = ({ layout, setLayout }: CallLayoutButtonsProps) => {
  return (
    <div className="mx-auto w-fit space-x-6">
      <button onClick={() => setLayout("speaker-vertical")}>
        <BetweenVerticalEnd
          className={layout !== "speaker-vertical" ? "text-gray-400" : ""}
        />
      </button>

      <button onClick={() => setLayout("speaker-horizontal")}>
        <BetweenHorizonalEnd
          className={layout !== "speaker-horizontal" ? "text-gray-400" : ""}
        />
      </button>

      <button onClick={() => setLayout("grid")}>
        <LayoutGrid className={layout !== "grid" ? "text-gray-400" : ""} />
      </button>
    </div>
  );
};

function CallViewLayout({ layout }: CallLayoutViewProps) {
  if (layout === "speaker-vertical") {
    return <SpeakerLayout />;
  }

  if (layout === "speaker-horizontal") {
    return <SpeakerLayout participantsBarPosition="right" />;
  }

  if (layout === "grid") {
    return <PaginatedGridLayout />;
  }

  return null;
}
