import React from "react";

interface ReadOnlyFieldProps {
  label: string;
  value: React.ReactNode; // Usamos React.ReactNode para aceitar texto, números, etc.
  className?: string;
}

export function ReadOnlyField({ label, value, className }: ReadOnlyFieldProps) {
  return (
    <div className={`flex flex-col rounded-md border p-3 ${className}`}>
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-800">
        {/* Mostra '—' se o valor for nulo ou indefinido, para uma UI mais limpa */}
        {value ?? '—'}
      </span>
    </div>
  );
}