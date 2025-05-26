import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FieldTooltip } from "@/components/field-tooltip";

// Esquema de validação com Zod
const formSchema = z.object({
  nomeAcusado: z.string().min(1, "O nome do acusado é obrigatório"),
  numeroProcesso: z.string().min(1, "O número do processo é obrigatório"),
  dataNascimento: z.string().min(1, "A data de nascimento é obrigatória"),
  tipoPrescricao: z.enum(["em-abstrato", "em-concreto"], {
    required_error: "Selecione a espécie de prescrição",
  }),
});

// Tipagem baseada no schema
type FormData = z.infer<typeof formSchema>;

export function DadosGeraisForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeAcusado: "",
      numeroProcesso: "",
      dataNascimento: "",
    },
  });

  function onSubmit(data: FormData) {
    console.log("Dados enviados:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nomeAcusado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Acusado</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numeroProcesso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número do Processo</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 0000000-00.0000.0.00.0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataNascimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Data de Nascimento
                <FieldTooltip side="right">
                  <p>
                    Informe a data de nascimento do autor da infração. <br />A
                    idade influencia diretamento no prazo prescricional, nos
                    termos do artigo 115 do CP.
                  </p>
                </FieldTooltip>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipoPrescricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Espécie de Prescrição da Pretensão Punitiva
                <FieldTooltip side="right">
                  <p>
                    Informe Prescrição da Pretensão Punitiva em Concreto somente
                    se houver sentença com trânsito em julgado para a acusação
                    ou improvido seu recurso.
                  </p>
                </FieldTooltip>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="em-abstrato">Em Abstrato</SelectItem>
                    <SelectItem value="em-concreto">Em Concreto</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Continuar</Button>
      </form>
    </Form>
  );
}
