import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { ReactNode } from "react";

const TwoColumn = ({ id, children }: { id: string, children: ReactNode}) => {
  return <div className="flex">{children}</div>;
}

const ColumnContent = ({ id, children }: { id: string, children: ReactNode}) => {
  return <div className="column">{children}</div>;
}

const markdown = `
# Markdown Guide

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

export default async function Guides() {
  return (
    <div className="mx-48">
      <Markdown
        className="MarkdownExample"
        remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
        components={{ "column-content": ColumnContent, "two-column": TwoColumn }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
