interface RowsPerPagePickerProps {
	pageSize: number;
	setPageSize: (pageSize: number) => void;
}

const RowsPerPagePicker: React.FC<RowsPerPagePickerProps> = ({
	pageSize,
	setPageSize,
}) => {
	return (
		<div className="page-size-picker text-sm my-2">
			<span>Show </span>
			<select
				value={pageSize}
				onChange={(e) => setPageSize(parseInt(e.target.value))}
				className="border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-900 px-2 py-1 cursor-pointer"
			>
				<option value={50}>50</option>
				<option value={500}>500</option>
				<option value={5000}>5000</option>
			</select>
			<span> items</span>
		</div>
	);
};

export default RowsPerPagePicker;
