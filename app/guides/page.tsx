"use client";

import React, { useRef, useState } from "react";
import {micromark} from 'micromark'
import {gfm, gfmHtml} from 'micromark-extension-gfm'
import {directive, directiveHtml} from 'micromark-extension-directive'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import {Textarea} from "@/components/ui/textarea";

export default function Guides() {
  const textareaRef = useRef(null);
  const [markdown, setMarkdown] = useState("");

  function onTextareaChange() {
    setMarkdown(textareaRef.current?.value);
  }

  let micromarkHtml = micromark(markdown, {
    allowDangerousHtml: true,
    extensions: [gfm(), directive()],
    htmlExtensions: [gfmHtml(), directiveHtml()]
  });

  return (
    <div className="flex flex-col items-center mx-48">
      <Textarea ref={textareaRef} onInput={onTextareaChange} placeholder="Add your markdown here" />
      <div className="MarkdownExample mt-4">
        <div dangerouslySetInnerHTML={{ __html: micromarkHtml }} />
      </div>
      <br/>
      <Markdown className="MarkdownExample" remarkPlugins={[remarkGfm, remarkDirective]}>{markdown}</Markdown>
    </div>
  );
}
