import DiscoverPanelContent from "@/components/DiscoverPanelContent";
import { Search } from "@/components/Search";
import { useFeedsByTag } from "@/lib/useFeedsByTag";
import { Card, Title, Tabs, clsx, Text } from "@mantine/core";
import { useState } from "react";
import TagPage from "./tag/[tag]";

export default function Home() {
    const [activeTab, setActiveTab] = useState<string | null>("event");
    const feedsProps = useFeedsByTag();

    return (
        <Card padding="lg" radius="lg" className="max-h-[calc(100vh-1rem*2)]">
            <Card.Section
                p="lg"
                className="flex gap-4 items-center justify-between"
            >
                <Title weight={500}>Home</Title>
                <Search className="max-w-lg" disabled />
            </Card.Section>

            <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List className="border-b-0 gap-3">
                    <Tabs.Tab
                        value="event"
                        className={clsx("px-1 py-2 mb-4 font-medium")}
                    >
                        <Text
                            color={activeTab === "event" ? "blue" : "black"}
                            size="md"
                        >
                            Event
                        </Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="discover"
                        className={clsx("px-1 py-2 mb-4 font-medium")}
                    >
                        <Text
                            color={activeTab === "discover" ? "blue" : "black"}
                            size="md"
                        >
                            Discover
                        </Text>
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel
                    value="discover"
                    pt="xs"
                    className="overflow-scroll no-scrollbar h-[82vh] pb-4"
                >
                    <DiscoverPanelContent {...feedsProps} />
                </Tabs.Panel>
                <Tabs.Panel
                    value="event"
                    pt="xs"
                    className="overflow-scroll no-scrollbar h-[82vh] pb-4"
                >
                    <TagPage></TagPage>
                </Tabs.Panel>
            </Tabs>
        </Card>
    );
}
