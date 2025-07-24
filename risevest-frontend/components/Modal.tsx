type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll lg:overflow-hidden bg-black/50">
      <div className="bg-white rounded-xl w-[95%] max-w-lg lg:w-full py-4 sm:py-6 lg:py-8 relative mx-auto">
  {children}
</div>
    </div>
  );
};