"use server";

import "@/app/guides/[section]/[slug]/guides.css";

import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import Markdown from "react-markdown";

import { getGuideContent, getGuidePages } from "@/lib/server/cms-data";
import { getSections } from "@/lib/nav-menu-builder";
import { MarkdownComponents } from "@/components/MarkdownComponents";
import NavMenu from "@/components/NavMenu";

const Components = MarkdownComponents as any;

export default async function Guides({
  params,
}: {
  params: { section: string; slug: string };
}) {
  const guideContent = await getGuideContent(params.section, params.slug);
  const guidePages = await getGuidePages();

  return (
    <>
      <div className="progressBar"></div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-start w-[min(100%)] 2xl:w-[min(100%,800px)] pl-2 sm:pl-0">
          <NavMenu sections={getSections("/guides", guidePages)}></NavMenu>
        </div>
        <div className="flex flex-col items-center w-[min(100%,1100px)] pb-12 px-8 2xl:ml-60 markdownArea">
          <Markdown
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
            {guideContent}
          </Markdown>
        </div>
      </div>
    </>
  );
}
