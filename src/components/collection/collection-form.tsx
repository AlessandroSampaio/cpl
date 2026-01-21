import { DateValue, parseDate } from "@ark-ui/solid";
import {
  createForm,
  setValue,
  SubmitHandler,
  toUpperCase,
} from "@modular-forms/solid";
import { createEffect, createSignal } from "solid-js";
import { normalizeDate } from "~/lib/utils";
import { Collection, NewCollection } from "~/types/rpc";
import { Button } from "../ui/button";
import { ModularDatePicker } from "../ui/modular-date-picker";

type CollectionFormProps = {
  handleSubmit: SubmitHandler<NewCollection>;
  handleCancel: () => void;
  defaultValue?: Collection;
};

export const CollectionForm = (props: CollectionFormProps) => {
  const [_collectionForm, { Form, Field }] = createForm<NewCollection>({
    initialValues: {
      date: parseDate(new Date()).toString(),
      time: "",
      ...props.defaultValue,
    },
  });

  const [date, setDate] = createSignal<DateValue | undefined>();

  createEffect(
    () => setValue(_collectionForm, "date", normalizeDate(date())),
    [date()],
  );

  return (
    <Form class="space-y-4" onSubmit={props.handleSubmit}>
      <Field name="date" type="string" transform={toUpperCase({ on: "input" })}>
        {(_, props) => (
          <ModularDatePicker
            {...props}
            label="Data da coleta"
            value={date() ? [date()!] : undefined}
            onValueChange={(value) => {
              setDate(value.value[0]);
            }}
          />
        )}
      </Field>
      <div>
        <Button type="submit">Salvar</Button>
      </div>
    </Form>
  );
};
