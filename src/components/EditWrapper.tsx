interface EditWrapperProps {
	children: React.ReactNode
}

export default function EditWrapper ({
	children
}: EditWrapperProps) {
	return (
		<div className=''>
			{children}
		</div>
	)
}