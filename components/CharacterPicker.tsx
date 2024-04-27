'use client'

import { useDroppable } from "@dnd-kit/core"
import { ReactNode } from "react"

export default function CharacterPicker(props: { children?: ReactNode, id: string }) {
  const {isOver, setNodeRef} = useDroppable({
    id: `droppable-slot-${props.id}`,
  })
  const style = isOver ? {backgroundColor: "lightblue"} : undefined

  return (
    <div className="h-16 w-16 rounded-full border border-slate-600 border-solid" style={style} ref={setNodeRef}>
      {props.children}
    </div>
  )
}

