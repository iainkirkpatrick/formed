// import {DndContext} from '@dnd-kit/core';
import { atom, useAtom } from 'jotai'

import NewBlockButton from '@/components/NewBlockButton';
import EditInput from '@/components/EditInput';
import EditSelect from '@/components/EditSelect';
import EditInputProperties from './components/EditInputProperties';
import EditSelectProperties from './components/EditSelectProperties';

import { blockEditsAtom, currentEditingBlockIndexAtom, currentEditingBlockWithMetadataAtom } from './store';

// import {Draggable} from './Draggable';
// import {Droppable} from './Droppable';


function App() {
  const [blockEdits, setBlockEdits] = useAtom(blockEditsAtom)
  const [_, setEditingBlockIndex] = useAtom(currentEditingBlockIndexAtom)
  const [editingBlockWithMetadata] = useAtom(currentEditingBlockWithMetadataAtom)
  console.log({ editingBlockWithMetadata })

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='px-24 py-12 flex flex-col w-full max-w-7xl'>
        <h1 className='font-semibold text-4xl'>FORMED</h1>
        <div className='flex w-full gap-24'>
          <div className='my-4 flex flex-col w-3/5 gap-4'>
            {blockEdits.map(b => {
              if (b.type === 'input') {
                return (
                  <div className='p-4 border'>
                    {/* @ts-ignore: TODO figure out type narrowing with Atom */}
                    <EditInput blockAtom={b.blockAtom} />
                  </div>
                ) 
              } else if (b.type === 'select') {
                return (
                  <div className='p-4 border'>
                    {/* @ts-ignore: TODO figure out type narrowing with Atom */}
                    <EditSelect blockAtom={b.blockAtom} />
                  </div>
                )
              } else {
                return <p>Missing block type!</p>
              }
            })}
            <NewBlockButton
              onAdd={(block) => {
                const newBlockEdits = [...blockEdits, { type: block.type, blockAtom: atom(block) }]
                setBlockEdits(newBlockEdits)
                setEditingBlockIndex(newBlockEdits.length)
              }}
            />
          </div>
          <div className='flex flex-col w-2/5'>
            {!!editingBlockWithMetadata && (
              editingBlockWithMetadata.type === 'input' ? (
                <EditInputProperties
                  // @ts-ignore: TODO figure out type narrowing with Atom
                  blockAtom={editingBlockWithMetadata.blockAtom}
                />
              ) : editingBlockWithMetadata.type === 'select' ? (
                <EditSelectProperties
                  // @ts-ignore: TODO figure out type narrowing with Atom
                  blockAtom={editingBlockWithMetadata.blockAtom}
                />
              ) : (
			          <p>Missing block type for properties!</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App