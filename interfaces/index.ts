// CreatingMeetingPage Interfaces \\
export interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface StartTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface ParticipantsInputProps {
  value: string;
  onChange: (value: string) => void;
}

// End \\

// MeetingPage Interfaces meeting/[id]/MeetingPage \\
export interface MeetingPageProps {
  id: string;
}

// meeting main Page Interfaces meeting/[id]/Page \\
export interface MeetingProps {
  params: { id: string };
}
