import { Atom, useAtom } from "jotai";

import { BlockInputEditT } from "@/types/block";

import { Input } from "./ui/Input";

interface EditInputPropertiesProps {
	blockAtom: Atom<BlockInputEditT>
}

export default function EditInputProperties ({
	blockAtom
}: EditInputPropertiesProps) {
	const [block, setBlock] = useAtom(blockAtom)
	console.log('label', block.label)

	return (
		<div className='flex flex-col w-full gap-4'>
			<div className='flex flex-col'>
				<label className='mb-1 font-semibold'>Placeholder:</label>
				<Input
					className=''
					placeholder='Add placeholder'
					value={block.placeholder || ''}
					onChange={(e) => setBlock({ ...block, placeholder: e.target.value })}
				/>
			</div>
			<div className='flex flex-col'>
				<label className='mb-1 font-semibold'>Label:</label>
				<Input
					className=''
					placeholder='Add a label'
					value={block.label || ''}
					onChange={(e) => setBlock({ ...block, label: e.target.value })}
				/>
				{/* <input
						placeholder='Add a label'
						value={block.label}
						onChange={(e) => setBlock({ ...block, label: e.target.value })}
				/> */}

			</div>
			<div className='flex flex-col'>
				<label className='mb-1 font-semibold'>Help text:</label>
				<Input
					className=''
					placeholder='Add help text'
					value={block.helpText || ''}
					onChange={(e) => setBlock({ ...block, helpText: e.target.value })}
				/>
			</div>
		</div>
	)
}
