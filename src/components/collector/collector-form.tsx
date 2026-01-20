import {
  createForm,
  setValue,
  SubmitHandler,
  toUpperCase,
} from "@modular-forms/solid";
import { Button } from "~/components/ui/button";
import { ModularCheckbox } from "~/components/ui/modular-checkbox";
import { ModularTextField } from "~/components/ui/modular-text-field";
import { Collector, NewCollector } from "~/types/rpc";

type CollectorFormProps = {
  handleSubmit: SubmitHandler<NewCollector>;
  handleCancel: () => void;
  defaultValue?: Collector;
};

export const CollectorForm = (props: CollectorFormProps) => {
  const [cpForm, { Form, Field }] = createForm<NewCollector>({
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
