"use server";

import "./guides.css";

import { ReactNode } from "react";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

import { getGuideContent, getGuidePages } from "@/lib/server/cms-data";
import NavMenu from "@/components/NavMenu";

const TwoColumn = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="flex">{children}</div>;
};

const ColumnContent = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="column">{children}</div>;
};

const markdown = `
# Markdown Guide
| col a | col b |
| - | - |
| 1 | 2 |

::::two-column

:::column-content
## Column 1
This is the first column
:::

:::column-content
## Column 2
This is the second column
:::

::::
`;

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
      })

      sections.push({ name: section.charAt(0).toUpperCase() + section.slice(1), items: listItems });
    });
    return sections;
  }

  return (
    <>
      <div className="mx-48">
        <NavMenu sections={getSections()}></NavMenu>
      </div>
      <div className="flex flex-col items-center">
        <Markdown
          className="MarkdownExample"
          children={guideContent}
          remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
        />
      </div>
    </>
  );
}
