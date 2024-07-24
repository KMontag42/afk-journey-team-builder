"use client";

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

export default function MarkdownEditor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const example = `:::guide-title
Example Guide Title
:::

:::toc
# Contents
* [History](#history)
* [Discovery](#discovery)
* [Name and symbol](#name-and-symbol)
* [Planet X disproved](#planet-x-disproved)
* [Orbit](#orbit)
:::

## Horizontal Rule
---

::::two-column
:::column
### Unordered List
* List Item 1
* List Item 2
  * Indented Item
* List Item 3
:::
:::column
### Ordered List
1. List Item 1
2. List Item 2
3. List Item 3
4. List Item 4
:::
::::

### Small text (Image captions?)
###### baby text

:::centered-text
_This is centered text_

### Centered content
:::

:::centered-content
| col a | col b |
| - | - |
| 1 | 2 |
:::

## Two Column Layout
::::two-column
:::column
Column A  
this is an example  
of a line break with two spaces
:::
:::column
column B  
this is an example
::space
of a line break with a "::space"
:::
:::column
column C  
this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column this is the third column
:::
:::column
column D  
No content
:::
::::

## Space (break, gap between content)
::space

## History

### Discovery

In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the
position of…

### Name and symbol

The name Pluto is for the Roman god of the underworld, from a Greek epithet for
Hades…

### Planet X disproved

Once Pluto was found, its faintness and lack of a viewable disc cast doubt…

## Orbit

Pluto’s orbital period is about 248 years…
more test
`;

  const [markdown, setMarkdown] = useState(example);

  function onTextareaChange() {
    setMarkdown(textareaRef.current?.value!);
  }

  return (
    <div className="flex flex-col items-center w-[min(100%,1100px)] pb-12 px-8 markdownArea">
      <div className="flex flex-row"></div>
      <Textarea
        ref={textareaRef}
        onInput={onTextareaChange}
        className="my-4 h-60"
        placeholder="Put your markdown here"
        defaultValue={example}
      ></Textarea>
      <Button
        variant="secondary"
        onClick={() => {
          navigator.clipboard.writeText(
            `${JSON.stringify(textareaRef.current?.value)}`,
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
