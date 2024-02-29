import { PlusIcon } from '@radix-ui/react-icons'

import { BlockEditT } from '@/types/block';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';

import { newEditSelectBlock } from '@/utils/newEditSelectBlock';

interface NewBlockButtonProps {
	onAdd: (block: any) => void // TODO: type this
}

export default function NewBlockButton ({
	onAdd
}: NewBlockButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='p-2' variant="outline">
          <PlusIcon width={24} height={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem asChild>
          <Button
					  className='flex justify-start w-full cursor-pointer'
						variant="ghost"
						onClick={() => onAdd({ type: 'input' })}
					>
            Text input
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
					  className='flex justify-start w-full cursor-pointer'
						variant="ghost"
            // onClick={() => onAdd({ type: 'select', name: 'Untitled', multiple: false, options: ['one', 'two'] })}
            onClick={() => onAdd(newEditSelectBlock())}
					>
            Select (single)
          </Button>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Button
					  className='flex justify-start w-full cursor-pointer'
						variant="ghost"
            onClick={() => onAdd({ type: 'select', name: 'Untitled', multiple: true })}
					>
            Select (multiple)
          </Button>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}