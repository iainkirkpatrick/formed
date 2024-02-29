import { Atom, useAtom } from 'jotai';

import { BlockSelectEditT } from '@/types/block';

import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import { Button } from './ui/Button';

interface EditSelectProps {
	blockAtom: Atom<BlockSelectEditT>
}

export default function EditSelect ({
	blockAtom
}: EditSelectProps) {
	const [block] = useAtom(blockAtom)
	const [blockOptions, setBlockOptions] = useAtom(block.options)

	return (
		<div className='flex justify-between items-start w-full gap-24'>
			<div className='flex flex-col max-w-lg gap-2'>
				{!!block.label && (
					<label>{block.label}</label>
				)}
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Theme" />
					</SelectTrigger>
					<SelectContent>
						{blockOptions.map(o => (
							<SelectItem value={o.value}>{o.value}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Accordion type="single" collapsible className='w-full max-w-xs'>
				<AccordionItem value="item-1">
					<AccordionTrigger>
						<h6 className='font-semibold text-lg'>Properties:</h6>
					</AccordionTrigger>
					<AccordionContent>
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
											onChange={(e) => setBlockOptions(blockOptions.slice(0, i).concat({ value: e.target.value }).concat(blockOptions.slice(i + 1)))}
										/>
									))}
									<Button onClick={() => setBlockOptions([...blockOptions, { value: `Option ${blockOptions.length + 1}` }])}>Add option</Button>
								</div>
							</div>
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