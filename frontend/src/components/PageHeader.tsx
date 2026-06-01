interface PageHeaderProps {
  titulo: string;
  textoBotao: string;
  onNovo: () => void;
}

export default function PageHeader({
  titulo,
  textoBotao,
  onNovo
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">{titulo}</h1>

      <button className="btn btn-primary" onClick={onNovo}>
        {textoBotao}
      </button>
    </div>
  );
}
