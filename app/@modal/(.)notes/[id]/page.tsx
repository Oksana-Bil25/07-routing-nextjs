import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: {
    id: string;
  };
};

export default function NoteModalPage({ params }: Props) {
  return <NotePreviewClient noteId={params.id} />;
}
