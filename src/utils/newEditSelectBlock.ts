import { atom } from "jotai";

import { BlockSelectEditT } from "@/types/block";

import { genId } from "./genId";

export function newEditSelectBlock (): BlockSelectEditT {
	return {
		id: genId(),
		type: 'select',
		label: '',
		helpText: '',
		options: atom([{ value: 'Option 1' }]),
		multiple: false,
		placeholder: 'Select an option',
	}
}