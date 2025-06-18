import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onSave: (newValue: string) => void;
}

export function EditableSelectField({ label, value, options, onSave }: Props) {
  const [editando, setEditando] = useState(false);
  const [selected, setSelected] = useState(value);

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
        <div className="px-1 text-sm">
          {options.find((o) => o.value === value)?.label || value}
        </div>
      ) : (
        <>
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              onClick={() => {
                onSave(selected);
                setEditando(false);
              }}
            >
              Salvar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelected(value);
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
