import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
  inputType?: string;
}

export function EditableField({
  label,
  value,
  onSave,
  inputType = "text",
}: Props) {
  const [editando, setEditando] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  return (
    <div className="flex flex-col border rounded-md p-4 space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">{label}</Label>
        {!editando && (
          <Button
            className="text-sm"
            size="sm"
            variant="ghost"
            onClick={() => setEditando(true)}
          >
            Editar
          </Button>
        )}
      </div>

      {!editando ? (
        <div className="px-1 text-sm">{value}</div>
      ) : (
        <>
          <Input
            type={inputType}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              onClick={() => {
                onSave(tempValue);
                setEditando(false);
              }}
            >
              Salvar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setTempValue(value);
                setEditando(false);
              }}
            >
              Cancelar
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
