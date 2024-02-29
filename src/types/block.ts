import { Atom } from "jotai"

export interface BlockBaseT {
	id: string
	type: string
	// name: string
}

export interface BlockInputT extends BlockBaseT {
	type: 'input'
	label?: string
	helpText?: string
	placeholder?: string
}

export interface BlockInputReadT extends BlockInputT {

}
export interface BlockInputEditT extends BlockInputT {

}

export interface BlockSelectBaseT extends BlockBaseT {
	type: 'select'
	label?: string
	helpText?: string
	multiple: boolean
	placeholder?: string
}
export interface BlockSelectOptionT {
	value: string
}

export interface BlockSelectReadT extends BlockSelectBaseT {
	options: Array<BlockSelectOptionT>
}
// with sub-atoms for editing
export interface BlockSelectEditT extends BlockSelectBaseT {
	options: Atom<Array<BlockSelectOptionT>>
}

export type BlockReadT = BlockInputReadT | BlockSelectReadT
export type BlockEditT = BlockInputEditT | BlockSelectEditT