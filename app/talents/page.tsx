"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";

export default function TalentBuilder() {
  const [selectedNode, setSelectedNode] = useState(0);

  return (
    <div className="container flex justify-center">
      <ArcherContainer endMarker={false} strokeWidth={6}>
        <div className="grid grid-cols-5 justify-items-center gap-y-10">
          <div className="col-start-3">
            <ArcherElement id="1">
              <div className="flex flex-col items-center justify-center">
                <Image
                  className={cn(selectedNode === 1 ? "" : "invisible")}
                  src="https://i.imgur.com/IVJ2pPg.png"
                  alt="wilderheart"
                  height={104}
                  width={104}
                />
                <Image
                  className={cn(true ? "" : "grayscale", "-mt-[96px]")}
                  src="https://i.imgur.com/SKglKqY.png"
                  alt="wilderheart"
                  height={96}
                  width={96}
                />
              </div>
            </ArcherElement>
          </div>
          <div className="col-start-3">
            <ArcherElement id="2">
              <Image
                className={cn(true ? "" : "grayscale")}
                src="https://i.imgur.com/2czggsB.png"
                alt="wilderheart"
                height={48}
                width={48}
              />
            </ArcherElement>
          </div>
          <div className="col-start-3">
            <ArcherElement
              id="3"
              relations={[
                {
                  targetId: "2",
                  targetAnchor: "bottom",
                  sourceAnchor: "top",
                  style: { strokeColor: true ? "lightgreen" : "gray" },
                },
              ]}
            >
              <Image
                className={cn(true ? "" : "grayscale")}
                src="https://i.imgur.com/2czggsB.png"
                alt="wilderheart"
                height={48}
                width={48}
              />
            </ArcherElement>
          </div>
          <div className="col-start-1">
            <ArcherElement
              id="4"
              relations={[
                {
                  targetId: "3",
                  targetAnchor: "left",
                  sourceAnchor: "top",
                  style: { strokeColor: true ? "lightgreen" : "gray" },
                },
              ]}
            >
              <Image
                className={cn(true ? "" : "grayscale")}
                src="https://i.imgur.com/2czggsB.png"
                alt="wilderheart"
                height={48}
                width={48}
              />
            </ArcherElement>
          </div>
          <div className="col-start-5">
            <ArcherElement
              id="5"
              relations={[
                {
                  targetId: "3",
                  targetAnchor: "right",
                  sourceAnchor: "top",
                  style: { strokeColor: true ? "lightgreen" : "gray" },
                },
              ]}
            >
              <Image
                className={cn(true ? "" : "grayscale")}
                src="https://i.imgur.com/2czggsB.png"
                alt="wilderheart"
                height={48}
                width={48}
              />
            </ArcherElement>
          </div>
          <div className="col-start-2">
            <ArcherElement
              id="6"
              relations={[
                {
                  targetId: "4",
                  targetAnchor: "right",
                  sourceAnchor: "top",
                  style: { strokeColor: true ? "lightgreen" : "gray" },
                },
              ]}
            >
              <Image
                className={cn(true ? "" : "grayscale")}
                src="https://i.imgur.com/xJ2fBY9.png"
                alt="wilderheart"
                height={96}
                width={96}
              />
            </ArcherElement>
          </div>
          <div className="col-start-4">
            <ArcherElement
              id="7"
              relations={[
                {
                  targetId: "5",
                  targetAnchor: "left",
                  sourceAnchor: "top",
                  style: { strokeColor: false ? "lightgreen" : "gray" },
                },
              ]}
            >
              <Image
                className={cn(false ? "" : "grayscale")}
                src="https://i.imgur.com/xJ2fBY9.png"
                alt="wilderheart"
                height={96}
                width={96}
              />
            </ArcherElement>
          </div>
          <div className="col-start-1">
            <ArcherElement
              id="8"
              relations={[
                {
                  targetId: "6",
                  targetAnchor: "bottom",
                  sourceAnchor: "right",
                  style: { strokeColor: true ? "lightgreen" : "gray" },
                },
              ]}
            >
              <Image
                className={cn(true ? "" : "grayscale")}
                src="https://i.imgur.com/2czggsB.png"
                alt="wilderheart"
                height={48}
                width={48}
              />
            </ArcherElement>
          </div>
          <div className="col-start-5">
            <ArcherElement
              id="9"
              relations={[
                {
                  targetId: "7",
                  targetAnchor: "bottom",
                  sourceAnchor: "left",
                  style: { strokeColor: false ? "lightgreen" : "gray" },
                },
              ]}
            >
              <Image
                className={cn(false ? "" : "grayscale")}
                src="https://i.imgur.com/2czggsB.png"
                alt="wilderheart"
                height={48}
                width={48}
              />
            </ArcherElement>
          </div>
          <div className="col-start-3">
            <ArcherElement
              id="10"
              relations={[
                {
                  targetId: "8",
                  targetAnchor: "bottom",
                  sourceAnchor: "bottom",
                  style: { strokeColor: false ? "lightgreen" : "gray" },
                },
                {
                  targetId: "9",
                  targetAnchor: "bottom",
                  sourceAnchor: "bottom",
                  style: { strokeColor: false ? "lightgreen" : "gray" },
                },
              ]}
            >
              <Image
                className={cn(false ? "" : "grayscale")}
                src="https://i.imgur.com/SKglKqY.png"
                alt="wilderheart"
                height={96}
                width={96}
              />
            </ArcherElement>
          </div>
          <div className="col-start-3">
            <ArcherElement
              id="11"
              relations={[
                {
                  targetId: "10",
                  targetAnchor: "bottom",
                  sourceAnchor: "top",
                  style: { strokeColor: false ? "lightgreen" : "gray" },
                },
              ]}
            >
              <Image
                className={cn(false ? "" : "grayscale")}
                src="https://i.imgur.com/2czggsB.png"
                alt="wilderheart"
                height={48}
                width={48}
              />
            </ArcherElement>
          </div>
        </div>
      </ArcherContainer>
    </div>
  );
}
