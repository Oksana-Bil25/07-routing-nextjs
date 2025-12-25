"use client";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Note</h1>
      <NoteForm onSubmit={() => router.push("/")} />
    </div>
  );
}
