import { Atom, atom } from 'jotai'

import { BlockEditT } from './types/block'

// array of objects, which are block atoms and editing metadata
export interface BlockEditWithMetadataT {
  blockAtom: Atom<BlockEditT>
  id: string
  type: string
  // isEditing: boolean
}
export const blockEditsAtom = atom<Array<BlockEditWithMetadataT>>([])

// TODO: should this be a separate atom? or a derived atom of a state on block atoms?
export const currentEditingBlockIndexAtom = atom<number | null>(null)
// derived
export const currentEditingBlockWithMetadataAtom = atom(get => {
  const currentEditingBlockIndex = get(currentEditingBlockIndexAtom)
  console.log({ currentEditingBlockIndex })
  if (!!currentEditingBlockIndex) {
    return get(blockEditsAtom)[currentEditingBlockIndex - 1]
  } else {
    return null
  }
})
