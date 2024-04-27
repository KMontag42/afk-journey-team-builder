'use client'

import { useState } from "react"
import { Characters, getCharacterImage } from "@/lib/characters"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useDraggable } from "@dnd-kit/core"

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export function DraggableCharacter(props: { character: string }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.character,
  })
  const style = transform ? {transform: `translate(${transform.x}px, ${transform.y}px)`} : undefined

  return (
    <div className="h-16 w-16 rounded-full" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Avatar className="w-full h-full">
        <AvatarImage src={getCharacterImage(toTitleCase(props.character))} />
        <AvatarFallback>{props.character}</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default function CharacterSelector(props: { className?: string }) {
  const [characters, setCharacters] = useState<string[]>(Characters)
  return (
    <div className={`grid grid-cols-5 ${props.className}`}>
      {characters.map((character) => (
        <DraggableCharacter key={character} character={character} />
      ))}
    </div>
  )
}
