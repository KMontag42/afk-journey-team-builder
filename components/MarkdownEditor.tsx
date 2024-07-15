// TODO: This is what I used to build the first guide, we could repurpose this for an admin page in the future.
"use client";

import "@/app/guides/[slug]/guides.css";

import { useRef, useState } from "react";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import Markdown from "react-markdown";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MarkdownComponents } from "@/components/MarkdownComponents";

const Components = MarkdownComponents as any;

export default function MarkdownEditor({ content }: { content: string }) {
  const textareaRef = useRef(null);

  const [markdown, setMarkdown] = useState("");

  function onTextareaChange() {
    setMarkdown(textareaRef.current?.value);
  }

  return (
    <div className="flex flex-col items-center w-[min(100%,1100px)] pb-12 px-8 markdownArea">
      <Textarea
        ref={textareaRef}
        onInput={onTextareaChange}
        className="my-4"
        placeholder="Put your markdown here"
        defaultValue={content}
      ></Textarea>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(
            `${JSON.stringify(textareaRef.current?.value)}`
          );
          toast.success("Copied JSON String to Clipboard");
        }}
      >
        Copy JSON String
      </Button>
      <Markdown
        className="MarkdownExample"
        remarkPlugins={[
          remarkGfm,
          remarkDirective,
          remarkDirectiveRehype,
          remarkRehype,
          rehypeSlug,
          remarkToc,
        ]}
        components={Components}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
