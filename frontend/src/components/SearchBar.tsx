interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder
}: SearchBarProps) {
  return (
    <input
      className="input input-bordered w-full"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
