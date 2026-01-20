import { NewProducer, Producer } from "~/types/rpc";
import { Button } from "~/components/ui/button";
import { ModularCheckbox } from "~/components/ui/modular-checkbox";
import { ModularTextField } from "~/components/ui/modular-text-field";
import {
  createForm,
  setValue,
  SubmitHandler,
  toUpperCase,
} from "@modular-forms/solid";

type ProducerFormProps = {
  handleSubmit: SubmitHandler<NewProducer>;
  handleCancel: () => void;
  defaultValue?: Producer;
};

export const ProducerForm = (props: ProducerFormProps) => {
  const [cpForm, { Form, Field }] = createForm<NewProducer>({
    initialValues: props.defaultValue,
  });

  return (
    <Form onSubmit={props.handleSubmit} class="space-y-4">
      <div class="flex gap-4 flex-wrap">
        <Field name="name" transform={toUpperCase({ on: "input" })}>
          {(field, props) => (
            <ModularTextField
              {...props}
              type="text"
              label="Nome"
              placeholder="Nome"
              value={field.value}
              error={field.error}
              required
              class="w-full"
            />
          )}
        </Field>
        <div class="flex flex-col gap-2">
          <div>
            <p class="text-sm">Turnos</p>
          </div>
          <div class="flex justify-center items-center gap-8">
            <Field name="day_shift" type="boolean">
              {(field, props) => (
                <ModularCheckbox
                  {...props}
                  label="Manhã"
                  checked={field.value}
                  error={field.error}
                  required
                  setValue={(value) => setValue(cpForm, "day_shift", value)}
                />
              )}
            </Field>
            <Field name="night_shift" type="boolean">
              {(field, props) => (
                <ModularCheckbox
                  {...props}
                  label="Noite"
                  checked={field.value}
                  error={field.error}
                  required
                  setValue={(value) => setValue(cpForm, "night_shift", value)}
                />
              )}
            </Field>
          </div>
        </div>
      </div>
      <div class="space-x-4 w-full flex justify-end">
        <Button
          type="button"
          variant={"ghost"}
          class="hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => props.handleCancel()}
        >
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </Form>
  );
};
