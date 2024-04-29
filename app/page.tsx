'use client';

import { useState } from "react"
import { Characters, getCharacterImage } from "@/lib/characters"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import emptySlot from "@/public/emptySlot.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [characters, setCharacters] = useState<string[]>(Characters)
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [formation, setFormation] = useState<string[]>(new Array<string>(13).fill(''))
  const [formationString, setFormationString] = useState<string>('')
  
  function updateFormation(slot: number, character: string) {
    const characterInSlot = formation[slot]
    const characterIndex = formation.indexOf(character)
    const formationCharacters = formation.filter((character) => character !== '')
    const formationCopy = [...formation]
    let newCharacters = [...characters]

    if (characterInSlot === character) {
      formationCopy[slot] = ''
      newCharacters.push(character)
    } else if (characterIndex !== -1) { 
      formationCopy[slot] = character
      formationCopy[characterIndex] = characterInSlot
      newCharacters = newCharacters.filter((character) => character !== characterInSlot)
      newCharacters = newCharacters.filter((character) => character !== selectedCharacter)
    } else if (formationCharacters.length < 5) {
      newCharacters = newCharacters.filter((character) => character !== selectedCharacter)

      if (characterInSlot !== '') {
        newCharacters.push(characterInSlot)
      }

      formationCopy[slot] = character
    } else if (formationCharacters.length === 5 && characterInSlot !== '') {
      newCharacters = newCharacters.filter((character) => character !== selectedCharacter)
      newCharacters.push(characterInSlot)
      formationCopy[slot] = character
    }

    newCharacters = newCharacters.filter((value, index, self) => self.indexOf(value) === index)

    setFormation(formationCopy)
    setCharacters(newCharacters.sort())
    setFormationString(btoa(formationCopy.join(',')))
  }

  function CharacterSlot(props: { index: number, onClick?: () => void }) {
    const character = formation[props.index]
    if (character) {
      const isSelected = selectedCharacter === character
      const className = `h-16 w-14 ${isSelected ? 'border border-slate-800 rounded-full border-4' : ''}`
      return (
        <div className={className} onClick={props.onClick}>
          <Avatar className="h-full w-full">
            <AvatarImage src={getCharacterImage(character)} className="object-cover" />
            <AvatarFallback>{character}</AvatarFallback>
          </Avatar>
        </div>
      )
    }
    return (
      <div className="h-16 w-14" onClick={props.onClick}>
        <Image src={emptySlot} alt="Empty Slot" style={{objectFit: 'cover'}} />
      </div>
    )
  }

  function onCharacterClick(character: string) {
    setSelectedCharacter(character)
  }

  function onCharacterSlotClick(slot: number) {
    if (selectedCharacter) {
      updateFormation(slot, selectedCharacter)
      setSelectedCharacter(null)
    } else if (formation[slot]) {
      setSelectedCharacter(formation[slot])
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-8">
      <h1 className="text-4xl pb-8">Create Formation</h1>
      <div className="flex flex-col items-center mr-6">
      <div className="grid grid-cols-3 gap-4">
        <CharacterSlot index={0} onClick={() => onCharacterSlotClick(0)}/>
        <CharacterSlot index={1} onClick={() => onCharacterSlotClick(1)} />
        <CharacterSlot index={2} onClick={() => onCharacterSlotClick(2)} />
      </div>
      <div className="grid grid-cols-4 gap-4 pt-2">
        <CharacterSlot index={3} onClick={() => onCharacterSlotClick(3)} />
        <CharacterSlot index={4} onClick={() => onCharacterSlotClick(4)} />
        <CharacterSlot index={5} onClick={() => onCharacterSlotClick(5)} />
        <CharacterSlot index={6} onClick={() => onCharacterSlotClick(6)} />
      </div>
      <div className="grid grid-cols-5 gap-4 pt-2">
        <div className="invisible h-14 w-14 bg-gray-400 rounded-full"></div>
        <CharacterSlot index={7} onClick={() => onCharacterSlotClick(7)} />
        <CharacterSlot index={8} onClick={() => onCharacterSlotClick(8)} />
        <CharacterSlot index={9} onClick={() => onCharacterSlotClick(9)} />
        <CharacterSlot index={10} onClick={() => onCharacterSlotClick(10)} />
      </div>
      <div className="grid grid-cols-4 gap-4 pt-2">
        <div className="invisible h-14 w-14 bg-gray-400 rounded-full"></div>
        <div className="invisible h-14 w-14 bg-gray-400 rounded-full"></div>
        <CharacterSlot index={11} onClick={() => onCharacterSlotClick(11)} />
        <CharacterSlot index={12} onClick={() => onCharacterSlotClick(12)} />
      </div>
      </div>
      <ScrollArea className="h-56 flex flex-col items-center">
        <div className={`grid grid-cols-5 gap-2 pt-4`}>
          {characters.map((character) => {
            const isSelected = selectedCharacter === character
            const className = `w-14 h-14 ${isSelected ? 'border border-slate-800 border-4' : ''}`
            return (<Avatar className={className} onClick={() => onCharacterClick(character)} key={character}>
              <AvatarImage src={getCharacterImage(character)} />
              <AvatarFallback>{character}</AvatarFallback>
            </Avatar>)
          })}
        </div>
      </ScrollArea>
      <div className="pt-2">
        <Button asChild>
          <Link href={`https://builder.afkanalytica.com/?f=${formationString}`}>
            Share this formation
          </Link>
        </Button>
      </div>
    </main>
  );
}
