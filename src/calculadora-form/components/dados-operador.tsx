import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldTooltip } from "@/components/field-tooltip";
import { FormWrapper } from "./form-wrapper";
import { useCalculoPrescricao } from "../../context/calculo-prescricao-context";

const formSchema = z.object({
  observacao: z.string().min(1, "A observação é obrigatória"),
  dataCalculo: z.string().min(1, "A data do cálculo é obrigatória"),
  elaboradoPor: z.string().min(1, "O nome do elaborador é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function DadosOperadorForm({ onNext }: Props) {
  const { atualizarDados } = useCalculoPrescricao();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      observacao: "",
      dataCalculo: "",
      elaboradoPor: "",
    },
  });

  function onSubmit(data: FormData) {
    atualizarDados(data);
    onNext();
  }

  return (
    <Form {...form}>
      <FormWrapper
        onSubmit={form.handleSubmit(onSubmit)}
        titulo="Detalhes do Cálculo"
      >
        <FormField
          control={form.control}
          name="observacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observação</FormLabel>
              <FormControl>
                <Input placeholder="Digite uma observação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataCalculo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Data do Cálculo
                <FieldTooltip side="right">
                  <p>Informe a data em que este cálculo foi realizado.</p>
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
          name="elaboradoPor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elaborado por</FormLabel>
              <FormControl>
                <Input placeholder="Nome do elaborador" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormWrapper>
    </Form>
  );
}
