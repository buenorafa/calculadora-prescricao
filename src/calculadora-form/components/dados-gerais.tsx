import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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

const formSchema = z
  .object({
    nomeAcusado: z.string().min(1, "O nome do acusado é obrigatório"),
    numeroProcesso: z.string().min(1, "O número do processo é obrigatório"),
    dataNascimento: z.string().min(1, "A data de nascimento é obrigatória"),
    tipoPrescricao: z.enum(
      ["ABSTRATA", "CONCRETO", "RETROATIVA", "INTERCORRENTE"],
      {
        required_error: "Selecione a espécie de prescrição",
      }
    ),
    penaAnos: z.coerce.number().min(0, "Campo obrigatório"),
    penaMeses: z.coerce.number().min(0, "Campo obrigatório"),
    penaDias: z.coerce.number().min(0, "Campo obrigatório"),
    dataFato: z.string().min(1, "Informe a data do fato"),
  })
  .superRefine((data, ctx) => {
    const nascimento = new Date(data.dataNascimento);
    const fato = new Date(data.dataFato);

    if (fato <= nascimento) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dataFato"],
        message: "A data do fato deve ser posterior à data de nascimento",
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

interface Props {
  onNext: () => void;
  onBack?: () => void;
  // tipoPrescricaoSelecionada:
  //   | "ABSTRATA"
  //   | "CONCRETO"
  //   | "RETROATIVA"
  //   | "INTERCORRENTE";
}

export function DadosGeraisForm({ onNext }: Props) {
  const { atualizarDados } = useCalculoPrescricao();
  const location = useLocation();
  const tipoPrescricaoSelecionada =
    location.state?.tipoPrescricaoSelecionada ?? "ABSTRATA";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeAcusado: "",
      numeroProcesso: "",
      dataNascimento: "",
      tipoPrescricao: tipoPrescricaoSelecionada,
      penaAnos: 0,
      penaMeses: 0,
      penaDias: 0,
      dataFato: "",
    },
  });

  function onSubmit(data: FormData) {
    atualizarDados(data);
    onNext();
  }

  return (
    <Form {...form}>
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)} titulo="Dados Gerais">
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
                    idade influencia diretamente no prazo prescricional, nos
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
                  {/* <p>
                    Informe Prescrição da Pretensão Punitiva em Concreto somente
                    se houver sentença com trânsito em julgado para a acusação
                    ou improvido seu recurso.
                  </p> */}
                  <p>
                    Para alterar a espécie de Prescrição da Pretensão Punitiva,
                    volte para a tela de seleção e escolha outro tipo.
                  </p>
                </FieldTooltip>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ABSTRATA">Em abstrato</SelectItem>
                    <SelectItem value="CONCRETO">Executória</SelectItem>
                    <SelectItem value="RETROATIVA">Retroativa</SelectItem>
                    <SelectItem value="INTERCORRENTE">Intercorrente</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel className="mb-2">
          Pena{" "}
          {tipoPrescricaoSelecionada === "ABSTRATA"
            ? "Máxima em Abstrato"
            : "em Concreto"}
          <FieldTooltip side="right">
            <p>
              No caso de concurso de crimes, a extinção da punibilidade incidirá
              sobre a pena de cada um, isoladamente, nos termos do artigo 119 do
              CP e Súmula 497 do STF.
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

        <FormField
          control={form.control}
          name="dataFato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Data do Fato
                <FieldTooltip side="right">
                  <p>Informe a data da produção do resultado (art. 111, CP).</p>
                </FieldTooltip>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormWrapper>
    </Form>
  );
}
