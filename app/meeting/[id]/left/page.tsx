import { buttonClasses } from "@/components/Button";
import { PageProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const page = ({ params: { id } }: PageProps) => {
  return (
    <div className="flex flex-col items-center gap-3 text-white">
      <p className="font-bold">You left this meeting.</p>
      <Link
        href={`/meeting/${id}`}
        className={cn(buttonClasses, "bg-gray-500 hover:bg-gray-600")}
      >
        Rejoin
      </Link>
    </div>
  );
};

export default page;
