import { ReactNode } from "react";

const GuideTitle = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="guideTitle">{children}</div>;
};

const TableOfContents = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="tableOfContents">{children}</div>;
};

const TwoColumn = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="grid grid-cols-2  gap-8 pb-8">{children}</div>;
};

const ThreeColumn = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="grid grid-cols-3 gap-8 pb-8">{children}</div>;
};

const Column = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="">{children}</div>;
};

const CenteredText = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="text-center">{children}</div>;
};

const CenteredContent = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="flex justify-center py-4">{children}</div>;
};

const Space = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="py-4" />;
};

const Thumbnail = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-16">{children}</div>;
};

const MiniImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-40">{children}</div>;
};

const ExtraSmallImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-xs">{children}</div>;
};

const SmallImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-md">{children}</div>;
};

const MediumImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-xl">{children}</div>;
};

const LargeImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-3xl">{children}</div>;
};

const ExtraLargeImage = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="max-w-5xl">{children}</div>;
};

export const MarkdownComponents = {
    "guide-title": GuideTitle,
    "toc": TableOfContents,
    "column": Column,
    "two-column": TwoColumn,
    "three-column": ThreeColumn,
    "centered-content": CenteredContent,
    "centered-text": CenteredText,
    "space": Space,
    "thumbnail": Thumbnail,
    "xxs-img": MiniImage,
    "xs-img": ExtraSmallImage,
    "sm-img": SmallImage,
    "md-img": MediumImage,
    "lg-img": LargeImage,
    "xl-img": ExtraLargeImage,
  };