interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black bg-opacity-70"
				onClick={onClose}
			></div>
			<div className="relative z-10 bg-white dark:bg-zinc-800 p-4 w-11/12 transition-bg duration-1000">
				{children}
			</div>
		</div>
	);
};

export default Modal;
