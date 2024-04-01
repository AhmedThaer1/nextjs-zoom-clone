"use client";

import {
  DescriptionInputProps,
  ParticipantsInputProps,
  StartTimeInputProps,
} from "@/interfaces";
import { useUser } from "@clerk/nextjs";
import {
  Call,
  MemberRequest,
  Tooltip,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import { getUserIds } from "./actions";
import Button from "@/components/Button";
import Link from "next/link";
import { PiQuestionFill } from "react-icons/pi";
import ToolTip from "@/components/Tooltip";

const CreateMeetingPage = () => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [participantsInput, setParticipantsInput] = useState("");
  const [call, setCall] = useState<Call>();

  const client = useStreamVideoClient();

  const { user } = useUser();

  async function createMeeting() {
    if (!client || !user) {
      return;
    }

    try {
      // create a call with the current user as the host
      // and the participants as the members

      // createing a random id for the call
      const id = crypto.randomUUID();
      // setting the members of the call if the call was created by a user or is it joined by a guest
      const callType = participantsInput ? "private-meeting" : "default";
      const call = client.call(callType, id);

      // triming each email to remove any extra spaces and use it in the call creation
      const membersEmails = participantsInput
        .split(",")
        .map((email) => email.trim());
      // extracting the user ids from the email addresses
      const membersIds = await getUserIds(membersEmails);
      // creating the members array for the call
      // in the filter function ive (v, i, a) v for the value and i for the index and a for the array itself
      const members: MemberRequest[] = membersIds
        .map((id) => ({ user_id: id, role: "call_member" }))
        .concat({ user_id: user.id, role: "call_member" })
        .filter(
          (v, i, a) => a.findIndex((v2) => v2.user_id === v.user_id) === i,
        );

      const starts_at = new Date(startTimeInput || Date.now()).toISOString();

      await call.getOrCreate({
        data: {
          starts_at,
          members,
          custom: { description: descriptionInput },
        },
      });

      setCall(call);
    } catch (error) {
      console.error(error);
      alert("Failed to create meeting");
    }
  }

  if (!client || !user) {
    return <Loader2 className="mx-auto animate-spin" />;
  }
  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-center text-2xl font-bold">
        Welcome <span className="uppercase">{user.username}</span>
      </h1>
      <div className="mx-auto w-80 space-y-6 rounded-md bg-slate-100 p-5">
        <h2 className="text-xl font-bold uppercase">Create a new meeting</h2>
        <DescriptionInput
          value={descriptionInput}
          onChange={setDescriptionInput}
        />
        <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} />
        <ParticipantsInput
          value={participantsInput}
          onChange={setParticipantsInput}
        />
        <Button onClick={createMeeting} className="w-full">
          Create Meeting
        </Button>
      </div>
      {call && <MeetingLink call={call} />}
    </div>
  );
};

export default CreateMeetingPage;

function DescriptionInput({ value, onChange }: DescriptionInputProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting info:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            onChange("");
          }}
        />
        Add a description
      </label>
      {active && (
        <label className="block space-y-1">
          <span className="font-medium">Description</span>
          <textarea
            value={value}
            placeholder="Enter a description for the meeting"
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
            className="w-full rounded-md border border-gray-300 p-2"
          ></textarea>
        </label>
      )}
    </div>
  );
}

function StartTimeInput({ value, onChange }: StartTimeInputProps) {
  const [active, setActive] = useState(false);

  const dateTimeLocal = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000,
  )
    .toISOString()
    .slice(0, 16);

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting Start:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            onChange("");
          }}
        />
        Start Meeting Now
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={active}
          onChange={() => {
            setActive(true);
            onChange(dateTimeLocal);
          }}
        />
        Schedule a Meeting
      </label>
      {active && (
        <label className="block space-y-1">
          <span className="font-medium">Start Time</span>
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={dateTimeLocal}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </label>
      )}
    </div>
  );
}

function ParticipantsInput({ value, onChange }: ParticipantsInputProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Participants: </div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            onChange("");
          }}
        />
        Public
      </label>
      <label className="flex items-center gap-1.5">
        <input type="radio" checked={active} onChange={() => setActive(true)} />
        Private Saucy
      </label>
      {active && (
        <label className="block space-y-1">
          <div className="flex items-start justify-between">
            <span className="font-medium">Invite By Emails:</span>
            <ToolTip text="Please separate the emails with commas (,)">
              <PiQuestionFill className="text-2xl" />
            </ToolTip>
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter emails separated by commas"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </label>
      )}
    </div>
  );
}

interface MeetingLinkProps {
  call: Call;
}

function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-3">
        <span>
          Invitation Link:{" "}
          <Link target="_blank" href={meetingLink} className="font-medium">
            Join Now
          </Link>
        </span>
        <button
          title="Copy Invitation Link"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            // here render the link copied message/toast
          }}
        >
          <Copy />
        </button>
      </div>
      <a
        href={getMailsToLink(
          meetingLink,
          call.state.startsAt,
          call.state.custom.description,
        )}
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        Send Email Invitations
      </a>
    </div>
  );
}

// function to get the mailto link for the email invitations
function getMailsToLink(
  meetingLink: string,
  startsAt?: Date,
  description?: string,
) {
  const startDateFormatted = startsAt
    ? startsAt.toLocaleDateString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : undefined;

  const subject =
    "Join My Meeting" + (startDateFormatted ? ` at ${startDateFormatted}` : "");

  const body =
    `Hey, I'm inviting you to join my meeting. Here are the details: ${meetingLink}.` +
    (startDateFormatted
      ? `\n\nThe meeting starts at ${startDateFormatted}.`
      : "") +
    (description ? `\n\nDescription: ${description}` : "");

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
