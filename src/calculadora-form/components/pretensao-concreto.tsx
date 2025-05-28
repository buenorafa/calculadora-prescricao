import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { FieldTooltip } from "@/components/field-tooltip";
import { FormWrapper } from "./form-wrapper";
import { useCalculoPrescricao } from "../../context/calculo-prescricao-context";

const pretensaoConcretoSchema = z.object({
  penaAnos: z.coerce.number().min(0, "Campo obrigatório"),
  penaMeses: z.coerce.number().min(0, "Campo obrigatório"),
  penaDias: z.coerce.number().min(0, "Campo obrigatório"),
});

type PretensaoConcretoData = z.infer<typeof pretensaoConcretoSchema>;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function PretensaoConcretoForm({ onNext, onBack }: Props) {
  const form = useForm<PretensaoConcretoData>({
    resolver: zodResolver(pretensaoConcretoSchema),
    defaultValues: {
      penaAnos: 0,
      penaMeses: 0,
      penaDias: 0,
    },
  });

  const { atualizarDados } = useCalculoPrescricao();

  function onSubmit(data: PretensaoConcretoData) {
    atualizarDados(data);
    onNext();
  }

  return (
    <FormWrapper
      titulo="Pretensão Punitiva em Concreto"
      onSubmit={form.handleSubmit(onSubmit)}
      onBack={onBack}
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormLabel className="mb-2">
            Pena em Concreto
            <FieldTooltip side="right">
              <p>
                No caso de concurso de crimes, a extinção da punibilidade
                incidirá sobre a pena de cada um, isoladamente, nos termos do
                artigo 119 do CP e Súmula 497 do STF.
              </p>
            </FieldTooltip>
          </FormLabel>
          <div className="max-w-1/2 grid grid-cols-3 gap-4 mt-2">
            <FormField
              control={form.control}
              name="penaAnos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anos</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="penaMeses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meses</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="penaDias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dias</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
    </FormWrapper>
  );
}
