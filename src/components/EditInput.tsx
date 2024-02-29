import { Atom, useAtom } from 'jotai';

import { BlockInputT } from '@/types/block';

import { Input } from '@/components/ui/Input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"

interface EditInputProps {
	blockAtom: Atom<BlockInputT>
}

export default function EditInput ({
	blockAtom
}: EditInputProps) {
	const [block, setBlock] = useAtom(blockAtom)

	return (
		<div className='flex justify-between items-start w-full gap-24'>
			<div className='flex flex-col max-w-lg gap-2'>
				<div className='flex flex-col'>
					{!!block.label && (
						<label className='font-semibold'>{block.label}</label>
					)}
					{!!block.helpText && (
						<p className='text-sm italic'>{block.helpText}</p>
					)}
				</div>
				<Input />
			</div>
			<Accordion type="single" collapsible className='w-full max-w-xs'>
				<AccordionItem value="item-1">
					<AccordionTrigger>
						<h6 className='font-semibold text-lg'>Properties:</h6>
					</AccordionTrigger>
					<AccordionContent>
						<div className='flex flex-col w-full gap-4'>
							<div className='flex flex-col'>
								<label className='mb-1 font-semibold'>Placeholder:</label>
								<Input
									className=''
									placeholder='Add placeholder'
									value={block.placeholder}
									onChange={(e) => setBlock({ ...block, placeholder: e.target.value })}
								/>
							</div>
							<div className='flex flex-col'>
								<label className='mb-1 font-semibold'>Label:</label>
								<Input
									className=''
									placeholder='Add a label'
									value={block.label}
									onChange={(e) => setBlock({ ...block, label: e.target.value })}
								/>
							</div>
							<div className='flex flex-col'>
								<label className='mb-1 font-semibold'>Help text:</label>
								<Input
									className=''
									placeholder='Add help text'
									value={block.helpText}
									onChange={(e) => setBlock({ ...block, helpText: e.target.value })}
								/>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}