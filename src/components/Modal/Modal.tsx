import { createPortal } from "react-dom";
import css from "./Modal.module.css"
import NoteForm from "../NoteForm/NoteForm";
import { useEffect } from "react";

interface ModalProps{
  onClose: () => void;
}

export default function Modal({onClose}:ModalProps) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
    }
  }, [onClose]);
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }
  
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onClose= {onClose} />
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement
  );
}