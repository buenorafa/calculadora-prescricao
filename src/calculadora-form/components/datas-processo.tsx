import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FieldTooltip } from "@/components/field-tooltip";
import { FormWrapper } from "./form-wrapper";
import { useCalculoPrescricao } from "../../context/calculo-prescricao-context";

const formSchema = z.object({
  dataFato: z.string().min(1, "Informe a data do fato"),
  dataRecebimentoDaDenuncia: z.string().optional(),
  dataPronuncia: z.string().optional(),
  dataConfirmatoriaDaPronuncia: z.string().optional(),
  dataPublicacaoDaSentencaOuAcordao: z.string().optional(),
  dataInicioDoCumprimentoDaPena: z.string().optional(),
  dataTransitoEmJulgado: z.string().optional(),
  dataContinuacaoDoCumprimentoDaPena: z.string().optional(),
  dataReicidencia: z.string().optional(),
});

export function DatasProcessoForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { atualizarDados } = useCalculoPrescricao();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataFato: "",
      dataRecebimentoDaDenuncia: "",
      dataPronuncia: "",
      dataConfirmatoriaDaPronuncia: "",
      dataPublicacaoDaSentencaOuAcordao: "",
      dataInicioDoCumprimentoDaPena: "",
      dataTransitoEmJulgado: "",
      dataContinuacaoDoCumprimentoDaPena: "",
      dataReicidencia: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    atualizarDados(data);
    onNext();
  };

  return (
    <FormWrapper
      titulo="Informações do Processo"
      onSubmit={handleSubmit(onSubmit)}
      onBack={onBack}
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={control}
            name="dataFato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Data do Fato
                  <FieldTooltip side="right">
                    <p>
                      Informe a data da produção do resultado (art. 111, CP).
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
            control={control}
            name="dataRecebimentoDaDenuncia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data do Recebimento da Denúncia ou Queixa</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataPronuncia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data da Pronúncia</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataConfirmatoriaDaPronuncia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Data do Acórdão Confirmatório da Pronúncia
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataPublicacaoDaSentencaOuAcordao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Publicação da Sentença ou Acórdão</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataInicioDoCumprimentoDaPena"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data do Início do Cumprimento da Pena</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataTransitoEmJulgado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data do Trânsito em Julgado</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataContinuacaoDoCumprimentoDaPena"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Data da Continuação do Cumprimento da Pena
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataReicidencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data da Reincidência</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </FormWrapper>
  );
}
