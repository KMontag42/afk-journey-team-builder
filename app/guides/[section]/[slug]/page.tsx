"use server";

import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import Markdown from "react-markdown";

import { getGuideContent } from "@/lib/server/cms-data";
import { MarkdownComponents } from "@/components/MarkdownComponents";

const Components = MarkdownComponents as any;

export default async function GuidePage({
  params,
}: {
  params: { section: string; slug: string };
}) {
  const guideContent = await getGuideContent(params.section, params.slug);

  return (
    <>
      <div className="progressBar"></div>
      <div className="pb-12 markdownArea">
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
    </>
  );
}
