import { Card, Flex, SimpleGrid, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { IconArrowLeft } from "@tabler/icons-react";
import { useFeedsByTag } from "@/lib/useFeedsByTag";
import { FeedNote } from "@/components/FeedNode";
import { EventNote } from "@/components/EventNote";
import { Avatar } from "@/components/Avatar";

const TagPage = () => {
    const router = useRouter();
    const tag = router.query.tag || "event";

    const { data: feeds } = useFeedsByTag(tag as string);

    return (
        <Card
            padding="lg"
            radius="lg"
            className="max-h-[calc(100vh-1rem*2)]"
            withBorder
        >
            <Card.Section p="lg" className="pb-0">
                <IconArrowLeft
                    className="h-8 w-8 text-gray-500 cursor-pointer"
                    onClick={() => router.back()}
                />
            </Card.Section>

            <Card.Section p="lg">
                <Flex gap="1.2rem" align="center">
                    <Avatar size="lg" />
                    <Flex direction="column">
                        <Title
                            weight={500}
                            size="2rem"
                            className="text-gray-900"
                        >
                            {tag}
                        </Title>
                    </Flex>
                </Flex>
            </Card.Section>

            <SimpleGrid
                cols={3}
                className="overflow-scroll h-[85vh] no-scrollbar"
            >
                {feeds.map(
                    (note) =>
                        !!note &&
                        (note.metadata?.content?.tags?.includes("event") ? (
                            // TODO: change to graphql so that sort by event time
                            <EventNote
                                // @ts-expect-error Address typing
                                note={note}
                                key={`${note.characterId}-${note.noteId}`}
                            />
                        ) : (
                            <FeedNote
                                // @ts-expect-error Address typing
                                note={note}
                                key={`${note.characterId}-${note.noteId}`}
                            />
                        ))
                )}
            </SimpleGrid>
        </Card>
    );
};

export default TagPage;
