import NotesClient from "./Notes.client";

type Props = {
  params: {
    slug?: string[];
  };
};

export default function FilteredNotesPage({ params }: Props) {
  const category =
    params.slug && params.slug.length > 0 && params.slug[0] !== "all"
      ? params.slug[0]
      : undefined;

  return <NotesClient category={category} />;
}
