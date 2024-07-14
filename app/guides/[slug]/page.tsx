"use server";

import "@/app/guides/[slug]/guides.css";

import { ReactNode } from "react";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import Markdown from "react-markdown";

import { getGuideContent, getGuidePages } from "@/lib/server/cms-data";
import { MarkdownComponents } from "@/lib/markdown-components";
import NavMenu from "@/components/NavMenu";

const GuideTitle = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="guideTitle">{children}</div>;
};

const TableOfContents = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="pb-8 tableOfContents">{children}</div>;
};

const TwoColumn = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">{children}</div>;
};

const ThreeColumn = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">{children}</div>;
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

// use markdown-components.ts if possible? Like this:
// import { MarkdownComponents } from "@/lib/markdown-components";
const Components = {
  "guide-title": GuideTitle,
  "toc": TableOfContents,
  "column": Column,
  "two-column": TwoColumn,
  "three-column": ThreeColumn,
  "centered-content": CenteredContent,
  "centered-text": CenteredText,
  "space": Space,
  "thumbnail": Thumbnail,
  "xxs-img": MiniImage,
  "xs-img": ExtraSmallImage,
  "sm-img": SmallImage,
  "md-img": MediumImage,
  "lg-img": LargeImage,
  "xl-img": ExtraLargeImage,
};

export default async function Guides({ params }: { params: { slug: string } }) {
  const guideContent = await getGuideContent(params.slug);
  const guidePages = await getGuidePages();

  function getSections(): any[] {
    let sections: { name: string; items: { title: string; href: string; description: string }[] }[] = [];
    let listItems: { title: string; href: string; description: string }[] = [];
    let baseUrl = "/guides/";

    Object.keys(guidePages).forEach((section) => {
      listItems = [];
      Object.keys(guidePages[section]).forEach((guide) => {
        let guideTitle = guide.charAt(0).toUpperCase() + guide.slice(1);
        listItems.push({ title: guideTitle, href: baseUrl + guide, description: guidePages[section][guide].details });
      });

      sections.push({ name: section.charAt(0).toUpperCase() + section.slice(1), items: listItems });
    });
    return sections;
  }

  return (
    <>
      <div className="progressBar"></div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-start w-[min(100%)] 2xl:w-[min(100%,800px)] pl-2 sm:pl-0">
          <NavMenu sections={getSections()}></NavMenu>
        </div>
        <div className="flex flex-col items-center w-[min(100%,1100px)] pb-12 px-8 2xl:ml-60 markdownArea">
          <Markdown
            children={guideContent}
            remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype, remarkRehype, rehypeSlug, remarkToc]}
            components={Components}
          />
        </div>
      </div>
    </>
  );
}
