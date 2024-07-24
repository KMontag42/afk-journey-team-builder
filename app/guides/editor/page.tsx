"use server";

import { auth } from "@clerk/nextjs/server";
import { getUser } from "@/lib/server/users";
import { notFound } from "next/navigation";

import MarkdownEditor from "@/components/MarkdownEditor";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export default async function GuideEditor() {
  const { userId } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  const { admin } = await getUser(userId);

  if (!admin) {
    notFound();
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">?</Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
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
            <table>
              <thead>
                <tr>
                  <th>Component Name</th>
                  <th>Example</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GuideTitle</td>
                  <td>
                    <blockquote>
                      :::guide-title
                      <br />
                      Guide Title Here
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td>Creates a large gold text for the title of the guide</td>
                </tr>
                <tr>
                  <td>TableOfContents</td>
                  <td>
                    <blockquote>
                      :::toc
                      <br /># Table of Contents
                      <br />* [Link Display Text](#headerid)
                      <br />* [First 24 Hours](#first-24-hours)
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td>
                    Styling for the table of contents to give the correct list
                    styling
                  </td>
                </tr>
                <tr>
                  <td>Column</td>
                  <td>
                    <blockquote>
                      :::column
                      <br />
                      Column content goes here
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td>Individual column designators for column layout</td>
                </tr>
                <tr>
                  <td>TwoColumn</td>
                  <td>
                    <blockquote>
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
                  <td>
                    A two column layout example.
                    <br />
                    Three column is the same, use <b>::::three-column</b>{" "}
                    instead
                  </td>
                </tr>
                <tr>
                  <td>CenteredContent</td>
                  <td>
                    <blockquote>
                      :::centered-content
                      <br />
                      Centered content will go here
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td>Center content of any type (images, columns, etc)</td>
                </tr>
                <tr>
                  <td>CenteredText</td>
                  <td>
                    <blockquote>
                      :::centered-text
                      <br />
                      Centers text within container
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td>Center text within current container</td>
                </tr>
                <tr>
                  <td>Space</td>
                  <td>
                    <blockquote>::space</blockquote>
                  </td>
                  <td>
                    Simulates an html break. Use for adding gap between content
                  </td>
                </tr>
                <tr>
                  <td>Images</td>
                  <td>
                    <blockquote>
                      :::md-img
                      <br />
                      ![Image](https://i.imgur.com/9UIUCsW.png)
                      <br />
                      :::
                    </blockquote>
                  </td>
                  <td>
                    Sets the size of an image. Variations available:
                    <blockquote>
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
              </tbody>
            </table>
          </div>
        </PopoverContent>
      </Popover>
      <MarkdownEditor></MarkdownEditor>
    </>
  );
}
