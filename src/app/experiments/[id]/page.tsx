"use client";

import { experiments } from "@/components/experiment/experiment";
import { NotFound } from "@/components/NotFound";
import { useRouter } from "next/navigation";
import { use } from "react";

type ExpByIdProps = {
  params: Promise<{ id: string }>;
};

const ExpById = ({ params }: ExpByIdProps) => {
  const { id } = use(params);
  const experimentId = Number(id);
  const experiment = experiments.find((e) => e.id === experimentId);
  const router = useRouter();
  const handleClose = () => {
    router.push(`/`);
  };
  if (!experiment) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="absolute left-6 top-6 z-10">
        <button
          onClick={handleClose}
          className="cursor-pointer rounded-xl p-6 bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/20 transition-all"
        >
          <div className="text-sm font-medium">← BACK TO ALL PROJECTS</div>
        </button>
      </div>
      {experiment.content}
    </div>
  );
};

export default ExpById;
