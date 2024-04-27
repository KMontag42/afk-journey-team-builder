'use server';

import CharacterPicker from '@/components/CharacterPicker';
import CharacterSelector from '@/components/CharacterSelector';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-8">
      <h1 className="text-4xl pb-8">Create Formation</h1>
      <div className="grid grid-cols-3 gap-4">
        <CharacterPicker id='1' />
        <CharacterPicker id='2' />
        <CharacterPicker id='3' />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <CharacterPicker id='4'/>
        <CharacterPicker id='5'/>
        <CharacterPicker id='6'/>
        <CharacterPicker id='7'/>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="invisible h-16 w-16 bg-gray-400 rounded-full"></div>
        <CharacterPicker id='8'/>
        <CharacterPicker id='9'/>
        <CharacterPicker id='10'/>
        <CharacterPicker id='11'/>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="invisible h-16 w-16 bg-gray-400 rounded-full"></div>
        <div className="invisible h-16 w-16 bg-gray-400 rounded-full"></div>
        <CharacterPicker id='12'/>
        <CharacterPicker id='13'/>
      </div>
      <CharacterSelector className="pt-4" />
      <div>
        <p>Share this formation:</p>
        <input readOnly type="text" value="https://afkjfb.krm.sh/formation?f=420" />
      </div>
    </main>
  );
}
