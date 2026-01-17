import React from "react";

interface InfoFieldProps {
  label: string;
  value: string;
  isEditing?: boolean;
  onChange?: (val: string) => void;
  className?: string;
}

const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  isEditing,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-slate-400 text-sm font-normal">{label}</span>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="border border-slate-200 rounded px-2 py-1 text-slate-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      ) : (
        <span className="text-slate-600 font-medium text-base">
          {value || "—"}
        </span>
      )}
    </div>
  );
};

export default InfoField;
