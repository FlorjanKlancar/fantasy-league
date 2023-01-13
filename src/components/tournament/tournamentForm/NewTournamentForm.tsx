import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import StepWizard from "react-step-wizard";
import Nav from "./Nav";
import TournamentDetailsForm from "./TournamentDetailsForm";

type Props = {
  userId: string;
};

export default function NewTournamentForm({ userId }: Props) {
  const [steps, setSteps] = useState([
    { id: 1, name: "Tournament Details", href: "#", status: "upcoming" },
    { id: 2, name: "Application form", href: "#", status: "upcoming" },
    { id: 3, name: "Preview", href: "#", status: "upcoming" },
  ]);

  return (
    <>
      <StepWizard nav={<Nav steps={steps} />}>
        <TournamentDetailsForm setSteps={setSteps} steps={steps} />
        <div>invite</div>
        <div>preview</div>
      </StepWizard>
    </>
  );
}
