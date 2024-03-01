import { Atom, useAtom } from "jotai";

import { BlockSelectEditT } from "@/types/block";

import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface EditSelectPropertiesProps {
	blockAtom: Atom<BlockSelectEditT>
}

export default function EditSelectProperties ({
	blockAtom
}: EditSelectPropertiesProps) {
	const [block, setBlock] = useAtom(blockAtom)
	const [blockOptions, setBlockOptions] = useAtom(block.options)

	return (
		<div className='flex flex-col w-full gap-4'>
			<div className='flex flex-col'>
				<label className='mb-1 font-semibold'>Options:</label>
				{/* TODO: consider each option also being atom-wrapped (as well as the array itself) for more efficient updates? */}
				<div className='flex flex-col gap-2'>
					{blockOptions.map((o, i) => (
						<Input
							className=''
							placeholder='Add option'
							value={o.value}
							// @ts-ignore: fix type
							onChange={(e) => setBlockOptions(blockOptions.slice(0, i).concat({ value: e.target.value }).concat(blockOptions.slice(i + 1)))}
						/>
					))}
					{/* @ts-ignore: fix type */}
					<Button onClick={() => setBlockOptions([...blockOptions, { value: `Option ${blockOptions.length + 1}` }])}>Add option</Button>
				</div>
			</div>
			<div className='flex flex-col'>
				<label className='mb-1 font-semibold'>Placeholder:</label>
				<Input
					className=''
					placeholder='Add placeholder'
					value={block.placeholder}
					// @ts-ignore: fix type
					onChange={(e) => setBlock({ ...block, placeholder: e.target.value })}
				/>
			</div>
			<div className='flex flex-col'>
				<label className='mb-1 font-semibold'>Label:</label>
				<Input
					className=''
					placeholder='Add a label'
					value={block.label}
					// @ts-ignore: fix type
					onChange={(e) => setBlock({ ...block, label: e.target.value })}
				/>
			</div>
			<div className='flex flex-col'>
				<label className='mb-1 font-semibold'>Help text:</label>
				<Input
					className=''
					placeholder='Add help text'
					value={block.helpText}
					// @ts-ignore: fix type
					onChange={(e) => setBlock({ ...block, helpText: e.target.value })}
				/>
			</div>
		</div>
	)
}