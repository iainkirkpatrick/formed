import { Atom, useAtom } from 'jotai';

import { BlockInputT } from '@/types/block';

import { Input } from '@/components/ui/Input';

interface EditInputProps {
	blockAtom: Atom<BlockInputT>
}

export default function EditInput ({
	blockAtom
}: EditInputProps) {
	const [block] = useAtom(blockAtom)
	console.log({ block })

	return (
		<div className='flex flex-col max-w-lg gap-2'>
			<div className='flex flex-col'>
				{!!block.label && (
					<label className='font-semibold'>{block.label}</label>
				)}
				{!!block.helpText && (
					<p className='text-sm italic'>{block.helpText}</p>
				)}
			</div>
			<Input placeholder={block.placeholder} />
		</div>
	)
}