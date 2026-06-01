import { ReactNode } from "react";

interface ModalProps {
  aberto: boolean;
  titulo: string;
  children: ReactNode;
}

export default function Modal({
  aberto,
  titulo,
  children
}: ModalProps) {
  if (!aberto) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{titulo}</h3>
        {children}
      </div>
    </div>
  );
}
