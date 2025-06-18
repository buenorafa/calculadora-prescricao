"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Associado } from "./columns";

import { EditableField } from "./editable-field";
import { EditableSelectField } from "./editable-select-field";

interface UserDetailsDialogProps {
  selectedUser: Associado | null;
  setSelectedUser: (user: Associado | null) => void;
}

export function UserDetailsDialog({
  selectedUser,
  setSelectedUser,
}: UserDetailsDialogProps) {
  return (
    <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Usuário</DialogTitle>
          <DialogDescription>
            Informações completas do associado selecionado.
          </DialogDescription>
        </DialogHeader>

        {selectedUser && (
          <div className="space-y-2 text-sm ">
            <EditableField
              label="Nome"
              value={selectedUser.nome}
              onSave={(novo) =>
                setSelectedUser({ ...selectedUser, nome: novo })
              }
            />
            <EditableField
              label="Email"
              value={selectedUser.email}
              inputType="email"
              onSave={(novo) =>
                setSelectedUser({ ...selectedUser, email: novo })
              }
            />
            <EditableField
              label="Telefone"
              value={selectedUser.telefone}
              onSave={(novo) =>
                setSelectedUser({ ...selectedUser, telefone: novo })
              }
            />
            <EditableSelectField
              label="Perfil"
              value={selectedUser.perfil}
              options={[
                { label: "Associado", value: "associado" },
                { label: "Acolhimento", value: "acolhimento" },
                { label: "Farmácia", value: "farmacia" },
                { label: "Financeiro", value: "financeiro" },
                { label: "Diretoria", value: "diretoria" },
                { label: "Médico", value: "medico" },
              ]}
              onSave={(novoPerfil) =>
                setSelectedUser({ ...selectedUser, perfil: novoPerfil })
              }
            />
            <EditableSelectField
              label="Tipo de Associado"
              value={selectedUser.tipo}
              options={[
                { label: "Paciente", value: "paciente" },
                { label: "Responsável", value: "responsável" },
                { label: "Apoiador", value: "apoiador" },
                { label: "Pet", value: "pet" },
              ]}
              onSave={(novoPerfil) =>
                setSelectedUser({ ...selectedUser, tipo: novoPerfil })
              }
            />
            <EditableSelectField
              label="Status"
              value={selectedUser.status}
              options={[
                { label: "Ativo", value: "ativo" },
                {
                  label: "Documentação Pendente",
                  value: "documentação pendente",
                },
                { label: "Receita Vencida", value: "receita vencida" },
                {
                  label: "Mensalidade Pendente",
                  value: "mensalidade pendente",
                },
                { label: "Inativo", value: "inativo" },
              ]}
              onSave={(novoPerfil) =>
                setSelectedUser({ ...selectedUser, status: novoPerfil })
              }
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
