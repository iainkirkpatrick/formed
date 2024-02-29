import { atom } from "jotai";

import { BlockSelectEditT } from "@/types/block";

export function newEditSelectBlock (): BlockSelectEditT {
	return {
		type: 'select',
		label: '',
		helpText: '',
		options: atom([{ value: 'Option 1' }]),
		multiple: false,
		placeholder: 'Select an option',
	}
}