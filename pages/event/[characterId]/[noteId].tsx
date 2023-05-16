import { useRouter } from "next/router"
import { useNotesByNote } from "@/lib/useNotesByNote"
import { useNote } from "@crossbell/indexer"
import { FeedNote } from "@/components/FeedNode"

type CommonProps = {
  characterId: string
  noteId: string
}

const NoteBlock = ({ characterId, noteId }: CommonProps) => {
  const note = useNote(+characterId, +noteId).data

  if (!note) {
    return null
  }

  return (
    <FeedNote
      // @ts-expect-error Address typing
      note={note}
      key={`${characterId}-${noteId}`}
    />
  )
}

const NoteList = ({ characterId, noteId }: CommonProps) => {
  const replies = useNotesByNote(+characterId, +noteId)

  if (!replies?.data[0]?.list) {
    return <></>
  }

  return (
    <>
      {replies.data[0].list.map((reply) => (
        <div key={`${reply.characterId}-${reply.noteId}`}>
          <FeedNote
            // @ts-expect-error Address typing
            note={reply}
          />
        </div>
      ))}
    </>
  )
}

export default function EventPage() {
  const router = useRouter()
  const characterId = router.query.characterId as string
  const noteId = router.query.noteId as string

  if (!characterId || !noteId) {
    return <div>Event is not existed.</div>
  }

  return (
    <div>
      <NoteBlock noteId={noteId} characterId={characterId} />
      <br></br>
      <hr></hr>
      <br></br>
      <NoteList characterId={characterId as string} noteId={noteId as string} />
    </div>
  )
}
