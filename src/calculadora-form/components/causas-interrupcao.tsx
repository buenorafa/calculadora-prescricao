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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { FormWrapper } from "./form-wrapper";
import { useCalculoPrescricao } from "../../context/calculo-prescricao-context";

const suspensaoSchema = z.object({
  tipo: z.string().min(1, "Informe o tipo de suspensão"),
  inicio: z.string().min(1, "Data obrigatória"),
  fim: z.string().min(1, "Data obrigatória"),
});

const formSchema = z.object({
  tribunalJuri: z.enum(["true", "false"]),
  suspensoes: z.array(suspensaoSchema),
  crimeTentado: z.enum(["true", "false"]),
  causasAumento: z.enum(["true", "false"]),
  causasReducao: z.enum(["true", "false"]),
  processoSuspenso: z.enum(["true", "false"]),
});

export function CausasInterrupcaoForm({
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
      tribunalJuri: "false",
      crimeTentado: "false",
      causasAumento: "false",
      causasReducao: "false",
      processoSuspenso: "false",
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

          <FormField
            control={control}
            name="tribunalJuri"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Procedimento do Tribunal do Júri?</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sim</SelectItem>
                      <SelectItem value="false">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="crimeTentado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Crime Tentado?</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sim</SelectItem>
                      <SelectItem value="false">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="causasAumento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Há causas especiais de aumento?</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sim</SelectItem>
                      <SelectItem value="false">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="causasReducao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Há causas especiais de redução?</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sim</SelectItem>
                      <SelectItem value="false">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="processoSuspenso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Processo suspenso?</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sim</SelectItem>
                      <SelectItem value="false">Não</SelectItem>
                    </SelectContent>
                  </Select>
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
