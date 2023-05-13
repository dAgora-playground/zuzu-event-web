import { PropsWithChildren, useMemo, useState } from "react"
import {
  Blockquote,
  Button,
  Code,
  Divider,
  List,
  Mark,
  Table,
  Text,
  Title,
  clsx,
} from "@mantine/core"
import ReactMarkdown from "react-markdown"
import { ipfsLinkToHttpLink } from "@/lib/ipfs"
import { useElementSize } from "@mantine/hooks"

import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import remarkEmoji from "remark-emoji"
import remarkFrontmatter from "remark-frontmatter"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import { useCharacterHandleExists } from "@crossbell/indexer"

export function MarkdownRenderer({
  children,
  collapsible = false,
  displayMode = "normal",
}: PropsWithChildren<{
  children: string
  collapsible?: boolean
  displayMode?: "normal" | "main"
}>) {
  const { ref, height } = useElementSize()

  const isExceeded = height >= 80

  const [collapsed, setCollapsed] = useState(collapsible)

  const fontSize = displayMode === "main" ? 17 : 15
  const lineHeight =
    displayMode === "main" ? "leading-1.5rem" : "leading-1.25rem"

  const showReadMoreButton = collapsed && isExceeded

  let source = children
  if (typeof source === "string") {
    if (collapsible) {
      source = collapseText(source)
    }
    source = transformMentions(source)
  }

  const Memoed = useMemo(() => {
    return (
      <div className="relative">
        <article
          ref={ref}
          className={clsx(
            "markdown-renderer overflow-hidden transition-all-200 break-all",
            {
              "max-h-[80px]": collapsed,
              "max-h-none": !collapsed,
            },
          )}
          style={{
            WebkitMaskImage: showReadMoreButton
              ? "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 70%, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 100%)"
              : undefined,
          }}
        >
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <Title order={1} {...props} />,
              h2: ({ node, ...props }) => <Title order={2} {...props} />,
              h3: ({ node, ...props }) => <Title order={3} {...props} />,
              h4: ({ node, ...props }) => <Title order={4} {...props} />,
              h5: ({ node, ...props }) => <Title order={5} {...props} />,
              h6: ({ node, ...props }) => <Title order={6} {...props} />,
              p: ({ node, ...props }) => {
                return (
                  <Text
                    component="p"
                    size={fontSize}
                    className={clsx("my-2 break-words", lineHeight)}
                    style={{ wordBreak: "break-word" }}
                    {...props}
                  />
                )
              },
              img: ({ node, src, ...props }) => {
                return (
                  <img
                    className="max-w-full"
                    src={ipfsLinkToHttpLink(src!)}
                    {...props}
                    onClick={(e) => e.stopPropagation()}
                    data-original-src={src}
                  />
                )
              },
              a: function Link({ node, ...props }) {
                return (
                  <Text
                    variant="link"
                    component="a"
                    size={fontSize}
                    href={props.href!}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e: any) => e.stopPropagation()}
                    underline
                    inline
                  >
                    {props.children}
                  </Text>
                )
              },
              video: ({ node, src, ...props }) => {
                return (
                  <div
                    className="flex justify-center items-center w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* <VideoPlayer url={src} controls /> */}
                  </div>
                )
              },
              table: ({ node, ...props }) => {
                return (
                  <Table striped highlightOnHover>
                    {props.children}
                  </Table>
                )
              },
              blockquote: ({ node, ...props }) => {
                return <Blockquote>{props.children}</Blockquote>
              },
              code: ({ node, ...props }) => {
                return <Code>{props.children}</Code>
              },
              pre: function Pre({ node, ...props }) {
                return (
                  <Code block className="overflow-auto">
                    {props.children}
                  </Code>
                )
              },
              ol: ({ node, ...props }) => {
                return (
                  <List
                    type="ordered"
                    withPadding
                    className="list-outside"
                    classNames={{ itemWrapper: "block break-normal" }}
                  >
                    {props.children}
                  </List>
                )
              },
              ul: ({ node, ...props }) => {
                return (
                  <List
                    type="unordered"
                    withPadding
                    className="list-outside"
                    classNames={{ itemWrapper: "block break-normal" }}
                  >
                    {props.children}
                  </List>
                )
              },
              li: ({ node, ...props }) => {
                return <List.Item>{props.children}</List.Item>
              },
              mark: ({ node, ...props }) => {
                return <Mark>{props.children}</Mark>
              },
              hr: ({ node, ...props }) => {
                return <Divider />
              },
              iframe: ({ node, src, ...props }) => {
                if (
                  src?.startsWith("https://www.youtube.com") ||
                  src?.startsWith("https://youtu.be")
                ) {
                  return (
                    <div
                      className="flex justify-center items-center w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* <VideoPlayer url={src} controls /> */}
                    </div>
                  )
                }
                return (
                  <iframe
                    src={src}
                    {...props}
                    onClick={(e) => e.stopPropagation()}
                  />
                )
              },
              // @ts-ignore
              "at-mention": function AtMention({ node, ...props }) {
                const { data, isLoading } = useCharacterHandleExists(
                  props.handle,
                )
                const noHandle = !isLoading && !data
                return isLoading || noHandle ? (
                  <>
                    <span>@{props.handle}</span>{" "}
                  </>
                ) : (
                  <>
                    {/* <CharacterHandle handle={props.handle} showHoverCard />{" "} */}
                  </>
                )
              },
            }}
            rehypePlugins={[
              rehypeRaw,
              [
                rehypeSanitize,
                {
                  ...defaultSchema,
                  protocols: {
                    ...defaultSchema.protocols,
                    src: ["http", "https", "ipfs"],
                  },
                  tagNames: [
                    ...(defaultSchema.tagNames || []),
                    "video",
                    "iframe",
                    "at-mention",
                  ],
                  attributes: {
                    ...defaultSchema.attributes,
                    div: [
                      ...(defaultSchema.attributes?.div || []),
                      ["className"],
                    ],
                    code: [["className"]],
                    video: [
                      ["className"],
                      ["src"],
                      ["controls"],
                      ["loop"],
                      ["muted"],
                      ["playsinline"],
                    ],
                    iframe: [
                      ["className"],
                      ["src"],
                      ["allowfullscreen"],
                      ["frameborder"],
                      ["width"],
                      ["height"],
                      ["allow"],
                    ],
                    "at-mention": [["handle"]],
                  },
                },
              ],
            ]}
            remarkPlugins={[
              remarkGfm,
              remarkEmoji,
              remarkBreaks,
              [remarkFrontmatter, ["yaml", "toml"]],
            ]}
          >
            {source}
          </ReactMarkdown>
        </article>

        {showReadMoreButton && (
          <div className="absolute left-0 right-0 bottom-0 z-10 flex items-center justify-center pt-2">
            <Button
              radius="xl"
              color="gray"
              variant="light"
              className="bg-gray-100"
              onClick={() => setCollapsed((x) => !x)}
            >
              Read More
            </Button>
          </div>
        )}
      </div>
    )
  }, [children, collapsible, showReadMoreButton])

  return Memoed
}

function collapseText(text: string, maxLength = 1000) {
  if (text.length <= maxLength) {
    return text
  }

  const ellipsis = "&hellip;"

  const startingText = text.substring(0, maxLength)
  const endingText = text.substring(maxLength)
  const separatorIndex = maxLength + endingText.indexOf(" ")
  const appendingText = text.substring(maxLength, separatorIndex)

  const collapsedText = startingText + appendingText + ellipsis

  return collapsedText
}

function transformMentions(text: string) {
  const mentionRegex = /@([a-zA-Z0-9_\-]+)\s/g
  const mentionReplacer = (match: string, handle: string) => {
    return `<at-mention handle="${handle}">${match}</at-mention>`
  }
  return text.replace(mentionRegex, mentionReplacer)
}
