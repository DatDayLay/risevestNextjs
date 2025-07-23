type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll lg:overflow-hidden bg-black/50">
      <div className="bg-white rounded-xl w-[85%]  lg:w-full max-w-lg py-8 relative">
        {children}
      </div>
    </div>
  );
};