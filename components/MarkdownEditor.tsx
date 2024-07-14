"use client";

import "@/app/guides/[slug]/guides.css";

import { ReactNode, useRef, useState } from "react";
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

const GuideTitle = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="guideTitle">{children}</div>;
};

const TableOfContents = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="tableOfContents">{children}</div>;
};

const TwoColumn = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="grid grid-cols-2  gap-8 pb-8">{children}</div>;
};

const ThreeColumn = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="grid grid-cols-3 gap-8 pb-8">{children}</div>;
};

const Column = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="">{children}</div>;
};

const CenteredText = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="text-center">{children}</div>;
};

const CenteredContent = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="flex justify-center py-4">{children}</div>;
};

const Space = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="py-4" />;
};

const Thumbnail = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-16">{children}</div>;
};

const MiniImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-40">{children}</div>;
};

const ExtraSmallImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-xs">{children}</div>;
};

const SmallImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-md">{children}</div>;
};

const MediumImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-xl">{children}</div>;
};

const LargeImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-3xl">{children}</div>;
};

const ExtraLargeImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-5xl">{children}</div>;
};

const Components = {
  "guide-title": GuideTitle,
  toc: TableOfContents,
  column: Column,
  "two-column": TwoColumn,
  "three-column": ThreeColumn,
  "centered-content": CenteredContent,
  "centered-text": CenteredText,
  space: Space,
  thumbnail: Thumbnail,
  "xxs-img": MiniImage,
  "xs-img": ExtraSmallImage,
  "sm-img": SmallImage,
  "md-img": MediumImage,
  "lg-img": LargeImage,
  "xl-img": ExtraLargeImage,
};

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
          navigator.clipboard.writeText(`${JSON.stringify(textareaRef.current?.value)}`);
          toast.success("Copied JSON String to Clipboard");
        }}
      >
        Copy JSON String
      </Button>
      <Markdown
        className="MarkdownExample"
        children={markdown}
        remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype, remarkRehype, rehypeSlug, remarkToc]}
        components={Components}
      />
    </div>
  );
}
