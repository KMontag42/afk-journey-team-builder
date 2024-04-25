'use client';

import React from 'react';
import { DndProvider } from "react-dnd"
import { TouchBackend } from "react-dnd-touch-backend"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DndProvider backend={TouchBackend}>
      {children}
    </DndProvider>
  )
}
