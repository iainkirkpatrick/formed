import { useRef, useLayoutEffect, useState } from 'react';
import {
  DndContext, 
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { atom, useAtom } from 'jotai'

import NewBlockButton from '@/components/NewBlockButton';
import EditInputProperties from './components/EditInputProperties';
import EditSelectProperties from './components/EditSelectProperties';

import { blockEditsAtom, currentDraggingBlockIdAtom, currentEditingBlockIndexAtom, currentEditingBlockPositionAtom, currentEditingBlockWithMetadataAtom } from './store';

import { genId } from './utils/genId'

import SortableButtonWrapper from './components/SortableButtonWrapper';
import { renderEditingComponent } from './utils/renderEditingComponent';


function App() {
  const [blockEdits, setBlockEdits] = useAtom(blockEditsAtom)
  const [_, setEditingBlockIndex] = useAtom(currentEditingBlockIndexAtom)
  const [editingBlockWithMetadata] = useAtom(currentEditingBlockWithMetadataAtom)
  const [currentEditingBlockPosition, setCurrentEditingBlockPosition] = useAtom(currentEditingBlockPositionAtom)
  const [currentDraggingBlockId, setCurrentDraggingBlockId] = useAtom(currentDraggingBlockIdAtom)

  const propertiesContainerRef = useRef(null)
  const [propertiesContainerTop, setPropertiesContainerTop] = useState<number | null>(null)
  useLayoutEffect(() => {
    if (propertiesContainerRef.current && currentEditingBlockPosition) {
      // @ts-ignore: TODO offsetHeight on current
      setPropertiesContainerTop(Math.max((currentEditingBlockPosition.top + currentEditingBlockPosition.halfHeight) - (propertiesContainerRef.current.offsetHeight / 2),0))
    }
  }, [currentEditingBlockPosition])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='px-24 py-12 flex flex-col w-full max-w-7xl'>
        <h1 className='font-semibold text-4xl'>FORMED</h1>
        <div className='flex w-full gap-24'>
          <div className='my-4 flex flex-col w-3/5 gap-2'>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              // @ts-ignore: TODO active.id
              onDragStart={e => setCurrentDraggingBlockId(e.active.id)}
              onDragEnd={() => setCurrentDraggingBlockId(null)}
              onDragCancel={() => setCurrentDraggingBlockId(null)}
              onDragOver={event => {
                const {active, over} = event;
                
                if (over && active.id !== over.id) {
                  const oldIndex = blockEdits.findIndex(b => b.id === active.id)
                  const newIndex = blockEdits.findIndex(b => b.id === over.id)
                  setBlockEdits(arrayMove(blockEdits, oldIndex, newIndex))
                }
              }}
            >
              <SortableContext
                items={blockEdits.map(b => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className='relative flex flex-col gap-2'>
                {blockEdits.map((b, i) => (
                  <SortableButtonWrapper
                    key={b.id}
                    id={b.id}
                    className={`py-4 border-y-2 border-white ${!currentDraggingBlockId ? 'hover:border-red-500/80' : ''}`}
                    onClick={e => {
                      setEditingBlockIndex(i + 1)

                      const element = e.currentTarget;
                      setCurrentEditingBlockPosition({
                        top: element.offsetTop,
                        halfHeight: element.offsetHeight / 2, })
                      }}
                  >
                    {renderEditingComponent(b)}
                  </SortableButtonWrapper>
                ))}
                <NewBlockButton
                  onAdd={(block) => {
                    const newBlockEdits = [...blockEdits, {
                      id: genId(),
                      type: block.type,
                      blockAtom: atom(block)
                    }]
                    setBlockEdits(newBlockEdits)
                    setEditingBlockIndex(newBlockEdits.length)
                  }}
                />
                </div>
              </SortableContext>
              <DragOverlay>{currentDraggingBlockId ? (
                renderEditingComponent(blockEdits.find(b => b.id === currentDraggingBlockId)!)
              ) : null}</DragOverlay>
            </DndContext>
          </div>
          <div className='relative flex flex-col w-2/5'>
            <div ref={propertiesContainerRef} className='absolute' style={propertiesContainerTop ? { top: propertiesContainerTop } : {}}>
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
    </div>
  )
}

export default App