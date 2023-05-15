import { useNotes } from "@crossbell/indexer";
import { useMemo } from "react";

export const useNotesByNote = (toCharacterId: number, toNoteId: number) => {
  const {
    data: notes,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotes({
    toNoteId,
    toCharacterId,
  });

  const data = useMemo(() => {
    if (notes?.pages.length) {
      const replies = notes.pages?.flatMap((page) => page);
      return replies;
    }
    return [];
  }, [notes?.pages]);

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
