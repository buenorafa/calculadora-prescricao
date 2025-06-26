import { useForm, useFieldArray } from "react-hook-form";
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
import { Button } from "@/components/ui/button";

import { FormWrapper } from "./form-wrapper";
import { useCalculoPrescricao } from "../../context/calculo-prescricao-context";

const suspensaoSchema = z.object({
  tipo: z.string().min(1, "Informe o tipo de suspensão"),
  inicio: z.string().min(1, "Data obrigatória"),
  fim: z.string().min(1, "Data obrigatória"),
});

const formSchema = z.object({
  dataTransitoEmJulgado: z.string().optional(),
  dataInicioDoCumprimentoDaPena: z.string().optional(),
  dataContinuacaoDoCumprimentoDaPena: z.string().optional(),
  dataReicidencia: z.string().optional(),
  suspensoes: z.array(suspensaoSchema),
});

export function FormExecutoria({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { atualizarDados } = useCalculoPrescricao();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataTransitoEmJulgado: "",
      dataInicioDoCumprimentoDaPena: "",
      dataContinuacaoDoCumprimentoDaPena: "",
      dataReicidencia: "",
      suspensoes: [],
    },
  });

  const { control, handleSubmit } = form;

  const {
    fields: suspensoes,
    append: appendSuspensao,
    remove: removeSuspensao,
  } = useFieldArray({ control, name: "suspensoes" });

  const onSubmit = (data: any) => {
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

          <div className="space-y-2  p-2">
            <div className="flex justify-between items-center">
              <FormLabel>Suspensões</FormLabel>
              <Button
                type="button"
                onClick={() =>
                  appendSuspensao({ tipo: "", inicio: "", fim: "" })
                }
                size="sm"
              >
                Adicionar
              </Button>
            </div>

            {suspensoes.map((_, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-end p-2">
                <FormField
                  control={control}
                  name={`suspensoes.${index}.tipo`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`suspensoes.${index}.inicio`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Início</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`suspensoes.${index}.fim`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fim</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeSuspensao(index)}
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Form>
    </FormWrapper>
  );
}
