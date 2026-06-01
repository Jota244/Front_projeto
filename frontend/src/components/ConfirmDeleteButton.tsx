interface ConfirmDeleteButtonProps {
  onDelete: () => void;
}

export default function ConfirmDeleteButton({
  onDelete
}: ConfirmDeleteButtonProps) {
  return (
    <button
      className="btn btn-error btn-sm"
      onClick={onDelete}
    >
      Excluir
    </button>
  );
}
