"use server";

import "@/app/guides/[slug]/guides.css";

import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import Markdown from "react-markdown";

import { getGuideContent, getGuidePages } from "@/lib/server/cms-data";
import { MarkdownComponents } from "@/components/MarkdownComponents";
import NavMenu from "@/components/NavMenu";

const Components = MarkdownComponents;

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
            remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype, remarkRehype, rehypeSlug, remarkToc]}
            components={Components}
          >
            {guideContent}
          </Markdown>
        </div>
      </div>
    </>
  );
}
