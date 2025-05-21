
export function Button({ children, onClick, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100'
  };
  return (
    <button
      onClick={onClick}
      className={`rounded px-4 py-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
