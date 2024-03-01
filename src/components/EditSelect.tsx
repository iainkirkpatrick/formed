import { Atom, useAtom } from 'jotai';

import { BlockSelectEditT } from '@/types/block';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"

interface EditSelectProps {
	blockAtom: Atom<BlockSelectEditT>
}

export default function EditSelect ({
	blockAtom
}: EditSelectProps) {
	const [block] = useAtom(blockAtom)
	const [blockOptions] = useAtom(block.options)

	return (
		<div className='flex flex-col items-start gap-2'>
			{!!block.label && (
				<label>{block.label}</label>
			)}
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
				<SelectContent>
					{blockOptions.map(o => (
						<SelectItem key={o.value} value={o.value}>{o.value}</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}