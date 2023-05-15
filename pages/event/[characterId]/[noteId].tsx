import { useRouter } from "next/router";
import { useNotesByNote } from "@/lib/useNotesByNote";
import { useNote } from "@crossbell/indexer";
import { FeedNote } from "@/components/FeedNode";

export default function EventPage() {
    const router = useRouter();
    const characterId = router.query.characterId;
    const noteId = router.query.noteId;
    if (!characterId || !noteId) {
        return <div>Event is not existed.</div>;
    }
    const replies = useNotesByNote(+characterId, +noteId);
    const note = useNote(+characterId, +noteId).data;
    if (!note) {
        return <div>Event is not existed.</div>;
    }
    return (
        <div>
            <FeedNote
                // @ts-expect-error Address typing
                note={note}
                key={`${characterId}-${noteId}`}
            ></FeedNote>
            <br></br>
            <hr></hr>
            <br></br>
            {replies &&
                replies.data[0].list.map((reply) => (
                    <div>
                        <FeedNote
                            // @ts-expect-error Address typing
                            note={reply}
                            key={`${reply.characterId}-${reply.noteId}`}
                        ></FeedNote>
                    </div>
                ))}
        </div>
    );
}
