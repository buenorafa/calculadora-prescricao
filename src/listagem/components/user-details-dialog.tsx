"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Consulta } from "./columns";
// import type { PrescricaoRequestDTO } from "../../types/prescricao";
import { ReadOnlyField } from "./read-only-field";
// import { EditableField } from "./editable-field";
// import { EditableSelectField } from "./editable-select-field";

// ✅ (Opcional, mas recomendado) Uma função para formatar datas
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

interface PrescriptionDetailsDialogProps {
  // ✅ Garanta que este tipo inclua todos os campos do cálculo
  selectedPrescription: Consulta | null;
  setSelectedPrescription: (prescription: Consulta | null) => void;
}

export function UserDetailsDialog({
  selectedPrescription,
  setSelectedPrescription,
}: PrescriptionDetailsDialogProps) {
  return (
    <Dialog
      open={!!selectedPrescription}
      onOpenChange={() => setSelectedPrescription(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da Consulta de Prescrição</DialogTitle>
          <DialogDescription>
            Informações completas utilizadas no cálculo selecionado.
          </DialogDescription>
        </DialogHeader>

        {selectedPrescription && (
          <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* --- Dados Principais --- */}
            <ReadOnlyField
              label="Nome do Acusado"
              value={selectedPrescription.nomeAcusado}
            />
            <ReadOnlyField
              label="Nº do Processo"
              value={selectedPrescription.numeroProcesso}
            />
            <ReadOnlyField
              label="Tipo de Prescrição"
              value={selectedPrescription.tipoPrescricao}
            />

            {/* --- Datas Importantes --- */}
            <ReadOnlyField
              label="Data de Nascimento"
              value={formatDate(selectedPrescription.dataNascimento)}
            />
            <ReadOnlyField
              label="Data do Fato"
              value={formatDate(selectedPrescription.dataFato)}
            />
            <ReadOnlyField
              label="Recebimento da Denúncia"
              value={formatDate(selectedPrescription.dataRecebimentoDaDenuncia)}
            />
            <ReadOnlyField
              label="Publicação da Sentença"
              value={formatDate(
                selectedPrescription.dataPublicacaoDaSentencaOuAcordao
              )}
            />

            {/* --- Dados da Pena --- */}
            <ReadOnlyField
              label="Pena (Anos)"
              value={selectedPrescription.penaAnos}
            />
            <ReadOnlyField
              label="Pena (Meses)"
              value={selectedPrescription.penaMeses}
            />
            <ReadOnlyField
              label="Pena (Dias)"
              value={selectedPrescription.penaDias}
            />

            {/* --- Campos Booleanos (Sim/Não) --- */}
            <ReadOnlyField
              label="Crime Tentado?"
              value={selectedPrescription.crimeTentado ? "Sim" : "Não"}
            />
            <ReadOnlyField
              label="Processo Suspenso?"
              value={selectedPrescription.processoSuspenso ? "Sim" : "Não"}
            />
            <ReadOnlyField
              label="Tribunal do Júri?"
              value={selectedPrescription.tribunalJuri ? "Sim" : "Não"}
            />

            {/* --- Outros Dados --- */}
            <ReadOnlyField
              label="Elaborado Por"
              value={selectedPrescription.elaboradoPor}
            />
            <ReadOnlyField
              label="Observação"
              value={selectedPrescription.observacao}
              className="col-span-full"
            />

            {/* Adicione outros campos que julgar importantes aqui */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
