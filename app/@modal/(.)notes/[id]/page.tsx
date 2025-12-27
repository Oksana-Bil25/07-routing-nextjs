import NotePreviewClient from "./NotePreview.client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: Props) {
  const resolvedParams = await params;

  return (
    <div className="modal-overlay">
      {/* Використовуємо саме той компонент, який імпортували вище */}
      <NotePreviewClient noteId={resolvedParams.id} />
    </div>
  );
}
