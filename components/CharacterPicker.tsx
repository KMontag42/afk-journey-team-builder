'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"

import { useState } from "react"
import { useDrag, useDrop } from "react-dnd"

const Characters = [
  "Antandra",
  "Arden",
  "Atalanta",
  "Berial",
  "Brutus",
  "Bryon",
  "Carolina",
  "Cassadee",
  "Cecia",
  "Chippy",
  "Damian",
  "Dionel",
  "Eironn",
  "Fay",
  "Florabelle",
  "Granny",
  "Hammie",
  "Hewynn",
  "Igor",
  "Kafra",
  "Kokko",
  "Korin",
  "Kruger",
  "Lucius",
  "Lumont",
  "Lyca",
  "Marilee",
  "Mirael",
  "Niru",
  "Odie",
  "Parisa",
  "Reinier",
  "Rhys",
  "Rowan",
  "Salazer",
  "Satrana",
  "Scarlita",
  "Seth",
  "Shakir",
  "Silvina",
  "Smokey",
  "Temesia",
  "Thoran",
  "Vala",
  "Valen",
  "Viperian",
  "Walker",
]

function getCharacterImage(character: string) {
  return `https://raw.githubusercontent.com/inSeas0n/AFK-Analytica/master/journey_icons/heroes/${character}.png`
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export default function CharacterPicker(props: { selectedCharacter: string }) {
  const [selectedCharacter, setSelectedCharacter] = useState(props.selectedCharacter)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "character",
    item: { character: selectedCharacter },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  const [, drop] = useDrop(() => ({
    accept: "character",
    drop: (item: { character: string }) => setSelectedCharacter(item.character),
  }))

  // if selectedCharacter is not empty, make the component into a drag and drop
  // all other CharacterPickers should be targets for the drag and drop
  // if selectedCharacter is empty, make the component into a select dropdown

  if (selectedCharacter) {
    return (
      <div ref={drag} className="w-full h-full rounded-full">
        <Avatar className="w-full h-full">
          <AvatarImage src={getCharacterImage(toTitleCase(selectedCharacter))} />
          <AvatarFallback>{selectedCharacter}</AvatarFallback>
        </Avatar>
      </div>
    )
  }

  return (
    <div className="w-full h-full rounded-full" ref={drop}>
      <Select value={selectedCharacter} onValueChange={setSelectedCharacter}>
        <SelectTrigger className="w-full h-full rounded-full bg-gray-400">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {Characters.map((character) => (
            <SelectItem key={character} value={character.toLowerCase()}>
                <Avatar>
                  <AvatarImage src={getCharacterImage(character)} />
                  <AvatarFallback>{character}</AvatarFallback>
                </Avatar>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
