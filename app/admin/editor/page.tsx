"use server";

import MarkdownEditor from "@/components/MarkdownEditor";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export default async function GuideEditor() {
  return (
    <div className="container flex flex-col items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">?</Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto max-h-[75vh] overflow-y-scroll">
          <div className="flex flex-col items-center gap-y-2">
            <div className="font-bold text-lg">How to use</div>
            <Link
              className="underline"
              href="https://commonmark.org/help/"
              target="_blank"
            >
              Markdown Basics
            </Link>
            <div>Our Custom Components:</div>
            <table className="m-4 border-collapse">
              <thead>
                <tr>
                  <th className="border-y px-4 py-2">Component Name</th>
                  <th className="border-y px-4 py-2">Example</th>
                  <th className="border-y px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-y px-4 py-2">GuideTitle</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      :::guide-title
                      <br />
                      Guide Title Here
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    Creates a large gold text for the title of the guide
                  </td>
                </tr>
                <tr>
                  <td className="border-y px-4 py-2">TableOfContents</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      :::toc
                      <br /># Table of Contents
                      <br />* [Link Display Text](#headerid)
                      <br />* [First 24 Hours](#first-24-hours)
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    Styling for the table of contents to give the correct list
                    styling
                  </td>
                </tr>
                <tr>
                  <td className="border-y px-4 py-2">Column</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      :::column
                      <br />
                      Column content goes here
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    Individual column designators for column layout
                  </td>
                </tr>
                <tr>
                  <td className="border-y px-4 py-2">TwoColumn</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      ::::two-column
                      <br />
                      :::column
                      <br />
                      Column A Content
                      <br />
                      :::
                      <br />
                      :::column
                      <br />
                      Column B Content
                      <br />
                      :::
                      <br />
                      ::::
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    A two column layout example.
                    <br />
                    Three column is the same, use <b>::::three-column</b>{" "}
                    instead
                  </td>
                </tr>
                <tr>
                  <td className="border-y px-4 py-2">CenteredContent</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      :::centered-content
                      <br />
                      Centered content will go here
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    Center content of any type (images, columns, etc)
                  </td>
                </tr>
                <tr>
                  <td className="border-y px-4 py-2">CenteredText</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      :::centered-text
                      <br />
                      Centers text within container
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    Center text within current container
                  </td>
                </tr>
                <tr>
                  <td className="border-y px-4 py-2">Space</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      ::space
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    Simulates an html break. Use for adding gap between content
                  </td>
                </tr>
                <tr>
                  <td className="border-y px-4 py-2">Images</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      :::md-img
                      <br />
                      ![Image](https://i.imgur.com/9UIUCsW.png)
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    Sets the size of an image. Variations available:
                    <blockquote className="p-2 bg-slate-900">
                      :::thumbnail
                      <br />
                      :::xxs-img
                      <br />
                      :::xs-img
                      <br />
                      :::sm-img
                      <br />
                      :::md-img
                      <br />
                      :::lg-img
                      <br />
                      :::xl-img
                    </blockquote>
                  </td>
                </tr>
                <tr>
                  <td className="border-y px-4 py-2">Inline Content</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      ::::inline-content
                      <br />
                      :::inline-img
                      <br />
                      ![Image](https://i.imgur.com/9UIUCsW.png)
                      <br />
                      :::
                      <br />
                      Text goes here
                      <br />
                      ::::
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    Allows for images and content (text) to be in the same line.
                  </td>
                </tr>
                <tr>
                  <td className="border-y px-4 py-2">Tier List Building</td>
                  <td className="border-y px-4 py-2">
                    <blockquote className="p-2 bg-slate-900">
                      :::tier-list (is a 7 column grid)
                      <br />
                      :::tier-list-column (used for factions)
                      <br />
                      :::tier-list-hero-tier (used for separating S vs A tier)
                    </blockquote>
                  </td>
                  <td className="border-y px-4 py-2">
                    Use this for building tier lists.
                    <blockquote className="p-2 bg-slate-900">
                      ::::::tier-list
                      <br />
                      :::::tier-list-column
                      <br />
                      ## EX (tier)
                      <br />
                      :::::
                      <br />
                      :::::tier-list-column
                      <br />
                      ::::tier-list-hero-tier
                      <br />
                      :::thumbnail
                      <br />
                      ![Image](url)
                      <br />
                      :::
                      <br />
                      ::::
                      <br />
                      ::::tier-list-hero-tier
                      <br />
                      :::thumbnail
                      <br />
                      ![Image](url)
                      <br />
                      :::
                      <br />
                      ::::
                      <br />
                      :::::
                      <br />
                    </blockquote>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </PopoverContent>
      </Popover>
      <MarkdownEditor></MarkdownEditor>
    </div>
  );
}
