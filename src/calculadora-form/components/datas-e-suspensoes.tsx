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
import { FieldTooltip } from "@/components/field-tooltip";
import { FormWrapper } from "./form-wrapper";
import { useCalculoPrescricao } from "../../context/calculo-prescricao-context";

const suspensaoSchema = z.object({
  tipo: z.string().min(1, "Informe o tipo de suspensão"),
  inicio: z.string().min(1, "Data obrigatória"),
  fim: z.string().min(1, "Data obrigatória"),
});

const outraDataSchema = z.object({
  descricao: z.string().min(1, "Descrição obrigatória"),
  data: z.string().min(1, "Data obrigatória"),
});

const formSchema = z.object({
  dataFato: z.string().min(1, "Informe a data do fato"),
  dataRecebimento: z.string().min(1, "Informe a data do recebimento"),
  suspensoes: z.array(suspensaoSchema),
  tribunalJuri: z.enum(["sim", "nao"], { required_error: "Campo obrigatório" }),
  dataSentenca: z.string().optional(),
  dataAcordaoPronuncia: z.string().optional(),
  dataSentencaCondenatoria: z.string().min(1, "Campo obrigatório"),
  dataAcordaoCondenatorio: z.string().min(1, "Campo obrigatório"),
  outrasDatas: z.array(outraDataSchema),
});

export function DatasESuspensoesForm({
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
      suspensoes: [],
      outrasDatas: [],
    },
  });

  const { control, handleSubmit, watch } = form;
  const tribunalJuri = watch("tribunalJuri");

  const {
    fields: suspensoes,
    append: appendSuspensao,
    remove: removeSuspensao,
  } = useFieldArray({ control, name: "suspensoes" });

  const {
    fields: outrasDatas,
    append: appendOutraData,
    remove: removeOutraData,
  } = useFieldArray({ control, name: "outrasDatas" });

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
            name="dataFato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Data do Fato
                  <FieldTooltip side="right">
                    <p>
                      Informea data da produção do resultado vide artigo 111 do
                      CP.
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
            name="dataRecebimento"
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
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {tribunalJuri === "sim" && (
            <>
              <FormField
                control={control}
                name="dataSentenca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Data de Publicação da Sentença de Pronúncia
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
                name="dataAcordaoPronuncia"
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
            </>
          )}

          <FormField
            control={control}
            name="dataSentencaCondenatoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Data de Publicação da Sentença Penal Condenatória
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
            name="dataAcordaoCondenatorio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data do Acórdão Condenatório</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2 p-2">
            <div className="flex justify-between items-center">
              <FormLabel>Outras Datas</FormLabel>
              <Button
                type="button"
                onClick={() => appendOutraData({ descricao: "", data: "" })}
                size="sm"
              >
                Adicionar
              </Button>
            </div>
            {outrasDatas.map((_, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 items-end p-2">
                <FormField
                  control={control}
                  name={`outrasDatas.${index}.descricao`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`outrasDatas.${index}.data`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
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
                  onClick={() => removeOutraData(index)}
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
