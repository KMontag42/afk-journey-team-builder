'use client';

import React from 'react';
import { DndContext } from '@dnd-kit/core';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DndContext>
      {children}
    </DndContext>
  )
}
