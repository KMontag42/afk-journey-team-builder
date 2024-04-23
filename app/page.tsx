'use server';

import CharacterPicker from '@/components/CharacterPicker';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">Create Formation</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="invisible h-16 w-16 bg-gray-400 rounded-full"></div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="invisible h-16 w-16 bg-gray-400 rounded-full"></div>
        <div className="invisible h-16 w-16 bg-gray-400 rounded-full"></div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
        <div className="h-16 w-16 bg-gray-400 rounded-full">
          <CharacterPicker selectedCharacter={""} />
        </div>
      </div>
      <div>
        <p>Share this formation:</p>
        <input readOnly type="text" value="https://afkjfb.krm.sh/formation?f=420" />
      </div>
    </main>
  );
}
