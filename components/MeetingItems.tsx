import { Call } from "@stream-io/video-react-sdk";
import Link from "next/link";

interface MeetingItemsProps {
  call: Call;
}

const MeetingItems = ({ call }: MeetingItemsProps) => {
  const meetingLink = `/meeting/${call.id}`;

  const isInFuture =
    call.state.startsAt && new Date(call.state.startsAt) > new Date();

  const hasEnded = !!call.state.endedAt;

  return (
    <li>
      <Link href={meetingLink} className="hover:underline">
        {call.state.startsAt?.toLocaleString()}
        {isInFuture && " (upcoming)"}
        {hasEnded && " (ended)"}
      </Link>
      <p className="ml-6 text-gray-500">{call.state.custom.description}</p>
    </li>
  );
};

export default MeetingItems;
