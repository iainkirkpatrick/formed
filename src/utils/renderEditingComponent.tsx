import EditInput from "@/components/EditInput"
import EditSelect from "@/components/EditSelect"

import { BlockEditWithMetadataT } from "@/store"

export function renderEditingComponent (block: BlockEditWithMetadataT) {
	if (block.type === 'input') {
		return (
			<EditInput
				key={block.id}
				// @ts-ignore: TODO figure out type narrowing with Atom
				blockAtom={block.blockAtom}
			/>
		)
	} else if (block.type === 'select') {
		return (
			<EditSelect
				key={block.id}
				// @ts-ignore: TODO figure out type narrowing with Atom
				blockAtom={block.blockAtom}
			/>
		)
	} else {
		return (
			<p>Missing block type!</p>
		)
	}
}