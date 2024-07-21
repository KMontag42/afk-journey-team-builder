import { ReactNode } from "react";

const GuideTitle = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-5xl font-bold text-center text-atekgold pb-4">
      {children}
    </div>
  );
};

const TableOfContents = ({ children }: { children: ReactNode }) => {
  return <div className="pb-8 tableOfContents">{children}</div>;
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

const CenteredText = ({ children }: { children: ReactNode }) => {
  return <div className="text-center">{children}</div>;
};

const CenteredContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex justify-center py-4">{children}</div>;
};

const Space = () => {
  return <div className="py-4" />;
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

export const MarkdownComponents = {
  "guide-title": GuideTitle,
  toc: TableOfContents,
  column: Column,
  "two-column": TwoColumn,
  "three-column": ThreeColumn,
  "centered-content": CenteredContent,
  "centered-text": CenteredText,
  space: Space,
  thumbnail: Thumbnail,
  "xxs-img": MiniImage,
  "xs-img": ExtraSmallImage,
  "sm-img": SmallImage,
  "md-img": MediumImage,
  "lg-img": LargeImage,
  "xl-img": ExtraLargeImage,
};
