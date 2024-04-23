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

export default function CharacterPicker(props: { selectedCharacter: string }) {
  const [selectedCharacter, setSelectedCharacter] = useState(props.selectedCharacter)

  return (
    <div className="w-full h-full rounded-full">
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
