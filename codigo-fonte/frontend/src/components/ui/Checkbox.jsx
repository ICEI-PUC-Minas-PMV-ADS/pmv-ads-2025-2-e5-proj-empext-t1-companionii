import { forwardRef } from 'react';

const Checkbox = forwardRef(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className={`
            h-4 w-4 text-black border-gray-300 rounded
            focus:ring-black focus:ring-2 focus:ring-offset-0
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3 text-sm">
            <label
              className={`font-medium ${error ? 'text-red-600' : 'text-gray-700'}`}
            >
              {label}
            </label>
            {error && <p className="text-red-600 mt-1">{error}</p>}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
