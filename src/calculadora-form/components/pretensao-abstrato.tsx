import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { FieldTooltip } from "@/components/field-tooltip";

const pretensaoAbstratoSchema = z.object({
  penaAnos: z.coerce.number().min(0, "Campo obrigatório"),
  penaMeses: z.coerce.number().min(0, "Campo obrigatório"),
  penaDias: z.coerce.number().min(0, "Campo obrigatório"),
  aumento: z.enum(["nao", "1/6", "1/5", "1/4", "1/3", "1/2", "2/3", "2x"], {
    required_error: "Selecione uma opção",
  }),
  diminuicao: z.enum(["nao", "1/6", "1/5", "1/4", "1/3", "1/2", "2/3"], {
    required_error: "Selecione uma opção",
  }),
  tentativa: z.enum(["sim", "nao"], { required_error: "Selecione uma opção" }),
});

type PretensaoAbstratoFormData = z.infer<typeof pretensaoAbstratoSchema>;

export function PretensaoAbstratoForm() {
  const form = useForm<PretensaoAbstratoFormData>({
    resolver: zodResolver(pretensaoAbstratoSchema),
    defaultValues: {
      penaAnos: 0,
      penaMeses: 0,
      penaDias: 0,
      aumento: undefined,
      diminuicao: undefined,
      tentativa: undefined,
    },
  });

  function onSubmit(data: PretensaoAbstratoFormData) {
    console.log("Dados da pretensão abstrata:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <FormLabel className="mb-2">
            Máximo da Pena Prevista em Abstrato
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

        <FormField
          control={form.control}
          name="aumento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Causas especiais de aumento de pena
                <FieldTooltip side="right">
                  <p>Deverá ser escolhida a maior causa do aumento de pena.</p>
                </FieldTooltip>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nao">Não</SelectItem>
                    <SelectItem value="1/6">1/6</SelectItem>
                    <SelectItem value="1/5">1/5</SelectItem>
                    <SelectItem value="1/4">1/4</SelectItem>
                    <SelectItem value="1/3">1/3</SelectItem>
                    <SelectItem value="1/2">1/2</SelectItem>
                    <SelectItem value="2/3">2/3</SelectItem>
                    <SelectItem value="2x">2x</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diminuicao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Causas especiais de diminuição de pena
                <FieldTooltip side="right">
                  <p>
                    Deverá ser escolhida a menor causa da diminuição de pena.
                  </p>
                </FieldTooltip>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nao">Não</SelectItem>
                    <SelectItem value="1/6">1/6</SelectItem>
                    <SelectItem value="1/5">1/5</SelectItem>
                    <SelectItem value="1/4">1/4</SelectItem>
                    <SelectItem value="1/3">1/3</SelectItem>
                    <SelectItem value="1/2">1/2</SelectItem>
                    <SelectItem value="2/3">2/3</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tentativa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                O crime é tentado?
                <FieldTooltip side="right">
                  <p>
                    Regula-se pelo máximo do crime tentado. <br />
                    Redução de 1/3.
                  </p>
                </FieldTooltip>
              </FormLabel>
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

        <Button type="submit">Continuar</Button>
      </form>
    </Form>
  );
}
