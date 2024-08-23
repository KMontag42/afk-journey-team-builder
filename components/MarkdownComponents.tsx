import { ReactElement, ReactNode } from "react";
import Image from "next/image";

const GuideTitle = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-5xl font-bold text-center text-atekgold pb-4">
      {children}
    </div>
  );
};

const TableOfContents = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col items-center pb-8">{children}</div>;
};

const TwoColumn = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">{children}</div>
  );
};

const ThreeColumn = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">{children}</div>
  );
};

const Column = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};

const TierList = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid border-t border-atekgold grid-cols-7 gap-x-4 py-2 md:gap-x-8 md:py-6">
      {children}
    </div>
  );
};

const TierListColumn = ({ children }: { children: ReactNode }) => {
  return <div className="grid grid-rows-2">{children}</div>;
};

const TierListHeroTier = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row flex-wrap justify-start gap-x-2">
      {children}
    </div>
  );
};

const CenteredText = ({ children }: { children: ReactNode }) => {
  return <div className="text-center">{children}</div>;
};

const CenteredContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex justify-center py-4">{children}</div>;
};

const Space = () => {
  return <div className="py-4" />;
};

const InlineContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-row items-center gap-x-2">{children}</div>;
};

const InlineImage = ({ children }: { children: ReactElement }) => {
  const imageDetails = children?.props.children.props;
  return (
    <Image
      height={24}
      width={24}
      alt={imageDetails.alt}
      src={imageDetails.src}
    />
  );
};

const Thumbnail = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-16">{children}</div>;
};

const MiniImage = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-40">{children}</div>;
};

const ExtraSmallImage = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-xs">{children}</div>;
};

const SmallImage = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-md">{children}</div>;
};

const MediumImage = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-xl">{children}</div>;
};

const LargeImage = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-3xl">{children}</div>;
};

const ExtraLargeImage = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-5xl">{children}</div>;
};

const HeadingOne = ({ children }: { children: ReactNode }) => {
  let id = children
    ?.toString()
    .replace(/\s+/g, "-")
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
    .toLocaleLowerCase();
  return (
    <h1
      id={id}
      className="pt-6 font-bold text-atekgold text-3xl text-center scroll-mt-[70px]"
    >
      {children}
    </h1>
  );
};

const HeadingTwo = ({ children }: { children: ReactNode }) => {
  let id = children
    ?.toString()
    .replace(/\s+/g, "-")
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
    .toLocaleLowerCase();
  return (
    <h2
      id={id}
      className="pt-6 font-bold text-start text-atekgold text-2xl scroll-mt-[70px]"
    >
      {children}
    </h2>
  );
};

const HeadingThree = ({ children }: { children: ReactNode }) => {
  let id = children
    ?.toString()
    .replace(/\s+/g, "-")
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
    .toLocaleLowerCase();
  return (
    <h3
      id={id}
      className="pt-6 font-bold text-atekgold text-xl scroll-mt-[70px]"
    >
      {children}
    </h3>
  );
};

const HeadingSix = ({ children }: { children: ReactNode }) => {
  let id = children
    ?.toString()
    .replace(/\s+/g, "-")
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
    .toLocaleLowerCase();
  return (
    <h6 id={id} className="text-xs scroll-mt-[70px]">
      {children}
    </h6>
  );
};

const HorizontalRule = ({ children }: { children: ReactNode }) => {
  return <hr className="my-4">{children}</hr>;
};

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <table className="border border-atekgold border-solid m-4 py-1 px-4">
      {children}
    </table>
  );
};

const TableRow = ({ children }: { children: ReactNode }) => {
  return (
    <tr className="border border-atekgold border-solid m-4 py-1 px-4">
      {children}
    </tr>
  );
};

const TableHeader = ({ children }: { children: ReactNode }) => {
  return (
    <th className="border border-atekgold border-solid m-4 py-1 px-4">
      {children}
    </th>
  );
};

const TableColumn = ({ children }: { children: ReactNode }) => {
  return (
    <td className="border border-atekgold border-solid m-4 py-1 px-4">
      {children}
    </td>
  );
};

const UnorderedList = ({ children }: { children: ReactNode }) => {
  return <ul className="pl-4 list-disc">{children}</ul>;
};

const OrderedList = ({ children }: { children: ReactNode }) => {
  return <ol className="pl-4 list-decimal">{children}</ol>;
};

const Anchor = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <a className="underline" href={href}>
      {children}
    </a>
  );
};

const Paragraph = ({ children }: { children: ReactNode }) => {
  return <p className="py-1">{children}</p>;
};

export const MarkdownComponents = {
  "guide-title": GuideTitle,
  toc: TableOfContents,
  column: Column,
  "two-column": TwoColumn,
  "three-column": ThreeColumn,
  "tier-list": TierList,
  "tier-list-column": TierListColumn,
  "tier-list-hero-tier": TierListHeroTier,
  "centered-content": CenteredContent,
  "centered-text": CenteredText,
  space: Space,
  "inline-content": InlineContent,
  "inline-img": InlineImage,
  thumbnail: Thumbnail,
  "xxs-img": MiniImage,
  "xs-img": ExtraSmallImage,
  "sm-img": SmallImage,
  "md-img": MediumImage,
  "lg-img": LargeImage,
  "xl-img": ExtraLargeImage,
  h1: HeadingOne,
  h2: HeadingTwo,
  h3: HeadingThree,
  h6: HeadingSix,
  hr: HorizontalRule,
  table: Table,
  tr: TableRow,
  th: TableHeader,
  td: TableColumn,
  ul: UnorderedList,
  ol: OrderedList,
  a: Anchor,
  p: Paragraph,
};
