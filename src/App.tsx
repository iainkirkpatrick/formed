// import {DndContext} from '@dnd-kit/core';
import { Atom, atom, useAtom } from 'jotai'

import { BlockEditT } from '@/types/block';

import NewBlockButton from '@/components/NewBlockButton';

import EditInput from './components/EditInput';
import EditSelect from './components/EditSelect';

// import {Draggable} from './Draggable';
// import {Droppable} from './Droppable';

// array of objects, which are block atoms and editing metadata
interface BlockEditWithMetadataT {
  blockAtom: Atom<BlockEditT>
  type: string
  // isEditing: boolean
}
const blockEditsAtom = atom<Array<BlockEditWithMetadataT>>([])


function App() {
  const [blockEdits, setBlockEdits] = useAtom(blockEditsAtom)

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='px-24 py-12 flex flex-col w-full max-w-7xl'>
        <h1 className='font-semibold text-4xl'>FORMED</h1>
        <div className='my-4 flex flex-col'>
          {blockEdits.map(b => {
            if (b.type === 'input') {
              // @ts-ignore: TODO figure out type narrowing with Atom
              return <EditInput blockAtom={b.blockAtom} />
            } else if (b.type === 'select') {
              // @ts-ignore: TODO figure out type narrowing with Atom
              return <EditSelect blockAtom={b.blockAtom} />
            } else {
              return <p>Missing block type!</p>
            }
          })}
        </div>
        <div className='flex'>
          <NewBlockButton
            onAdd={(block) => setBlockEdits([...blockEdits, { type: block.type, blockAtom: atom(block) }])}
          />
        </div>
      </div>
    </div>
  )
}

export default App