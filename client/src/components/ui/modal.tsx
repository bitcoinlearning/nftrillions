import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={onClose}
      data-testid="modal-backdrop"
    >
      <div 
        className="glass-strong rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
      >
        {title && (
          <div className="sticky top-0 glass-strong border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold">{title}</h3>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close modal"
              data-testid="modal-close-button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
