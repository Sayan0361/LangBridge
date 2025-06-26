const EmptyState = ({ 
  icon, 
  title, 
  description, 
  actionText, 
  onAction, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="mb-4 text-[#9c99c2]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-[#9c99c2] max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <button 
          onClick={onAction}
          className="btn btn-outline btn-sm text-white border-[#9c99c2] hover:bg-[#1E1B40] hover:border-white gap-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;