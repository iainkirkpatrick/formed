import { cn } from '@/utils/cn';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface SortableButtonWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
}

export default function SortableButtonWrapper ({
  id,
  className,
	children,
  ...rest
}: SortableButtonWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  return (
    <button
			ref={setNodeRef}
      className={cn(
        `${CSS.Transform.toString(transform)} ${transition}`,
        className
      )}
			{...attributes}
			{...listeners}
      {...rest}
		>
			{children}
    </button>
  );
}