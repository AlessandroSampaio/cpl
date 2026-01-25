import { DateValue, parseDate } from "@ark-ui/solid";
import { createForm, setValue, SubmitHandler } from "@modular-forms/solid";
import { createEffect, createSignal } from "solid-js";
import { toDate, toNumber } from "~/lib/transforms";
import { normalizeDate } from "~/lib/utils";
import { NewWithdrawal, Withdrawal } from "~/types/rpc";
import { Button } from "../ui/button";
import { ModularDatePicker } from "../ui/modular-date-picker";
import { ModularTextField } from "../ui/modular-text-field";

type WithdrawalsFormProps = {
  handleSubmit: SubmitHandler<NewWithdrawal>;
  handleCancel: () => void;
  defaultValue?: Withdrawal;
};

export const WithdrawalsForm = (props: WithdrawalsFormProps) => {
  const [date, setDate] = createSignal<DateValue | undefined>();
  const [withdrawalForm, { Form, Field }] = createForm<NewWithdrawal>({
    initialValues: {
      date: parseDate(new Date()).toString(),
      tank_id: 1,
      ...props.defaultValue,
    },
  });

  createEffect(
    () => setValue(withdrawalForm, "date", normalizeDate(date())),
    [date()],
  );

  return (
    <Form class="space-y-4" onSubmit={props.handleSubmit}>
      <div class="flex gap-4 w-full flex-wrap">
        <Field name="date" type="string" transform={toDate({ on: "input" })}>
          {(_, props) => (
            <ModularDatePicker
              {...props}
              label="Data da coleta"
              placeholder="dd/MM/yyy"
              value={date() ? [date()!] : undefined}
              onValueChange={(value) => {
                setDate(value.value[0]);
              }}
            />
          )}
        </Field>
        <Field name="tank_id" type="number">
          {(field, props) => (
            <ModularTextField
              {...props}
              type="text"
              label="Tanque"
              placeholder="Tanque"
              value={"TANQUE PRINCIPAL"}
              error={field.error}
              required
              class="w-60"
              disabled
              readonly
            />
          )}
        </Field>
        <Field
          name="quantity"
          type="string"
          transform={toNumber({ on: "input" })}
        >
          {(field, props) => (
            <ModularTextField
              {...props}
              type="text"
              label="Quantidade"
              placeholder="1000"
              value={field.value?.toString()}
              error={field.error}
              required
              class="w-60"
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
