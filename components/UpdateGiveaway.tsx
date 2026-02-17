"use client";
import GiveawayForm from "./GivewayForm";

interface UpdateGiveawayFormProps {
  giveawayId?: string | null;
}

export default function UpdateGiveawayForm({ giveawayId }: UpdateGiveawayFormProps) {
  return <GiveawayForm mode="update" giveawayId={giveawayId || undefined} />;
}
