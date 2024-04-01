import { Mic, Webcam } from "lucide-react";
import React from "react";

const PermissionPrompt = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <Webcam size={40} />
        <Mic size={40} />
      </div>
      <p className="text-center">
        Please Allow Access to Your Camera and Microphone to join the call.
      </p>
    </div>
  );
};

export default PermissionPrompt;
