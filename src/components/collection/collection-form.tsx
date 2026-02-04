import { parseDate } from "@ark-ui/solid";
import {
  createForm,
  focus,
  reset,
  setValue,
  SubmitHandler,
} from "@modular-forms/solid";
import { createSignal, onMount } from "solid-js";
import { toDate, toNumber } from "~/lib/transforms";
import { normalizeDate } from "~/lib/utils";
import {
  Collection,
  Collector,
  createTauRPCProxy,
  NewCollection,
  Producer,
} from "~/types/rpc";
import { Button } from "../ui/button";
import { ModularDatePicker } from "../ui/modular-date-picker";
import { ModularTextField } from "../ui/modular-text-field";
import { Select } from "../ui/select";

type CollectionFormProps = {
  handleSubmit: SubmitHandler<NewCollection>;
  handleCancel: () => void;
  defaultValue?: Collection;
};

export const CollectionForm = (props: CollectionFormProps) => {
  const rpc = createTauRPCProxy();

  const [_collectionForm, { Form, Field }] = createForm<NewCollection>({
    initialValues: {
      date: normalizeDate(parseDate(new Date()).toString()),
      tank_id: 1,
      ...props.defaultValue,
    },
  });
  const [producers, setProducers] = createSignal<Producer[]>([]);
  const [collectors, setCollectors] = createSignal<Collector[]>([]);

  const resetForm = () => {
    reset(_collectionForm, {
      initialValues: {
        date: normalizeDate(parseDate(new Date()).toString()),
        tank_id: 1,
        quantity: "0",
        ...props.defaultValue,
      },
    });
    focus(_collectionForm, "producer_id");
  };

  onMount(() => {
    // Fetch producers and collectors data here
    rpc.producers.list_producers("").then(setProducers);
    rpc.collectors.list_collectors("").then(setCollectors);
  });

  return (
    <Form
      class="space-y-4"
      onSubmit={(e, v) => {
        props.handleSubmit(e, v);
        resetForm();
      }}
    >
      <div class="flex gap-4 w-full flex-wrap">
        <Field name="producer_id" type="number">
          {(field, props) => {
            return (
              <Select<number>
                {...props}
                label="Produtor"
                placeholder="Selecione um produtor"
                options={producers().map((p) => ({
                  value: p.id,
                  label: p.name,
                }))}
                name="producer_id"
                value={field.value}
                onSelectedChange={(value) => {
                  value
                    ? setValue(_collectionForm, "producer_id", value!)
                    : reset(_collectionForm, "producer_id", {
                        initialValue: undefined,
                      });
                }}
                error={field.error}
                required
                class="w-100"
              />
            );
          }}
        </Field>
        <Field name="collector_id" type="number">
          {(field, props) => {
            return (
              <Select<number>
                {...props}
                label="Coletor"
                placeholder="Selecione um coletor"
                options={collectors().map((p) => ({
                  value: p.id,
                  label: p.name,
                }))}
                name="producer_id"
                value={field.value == null ? undefined : field.value}
                onSelectedChange={(value) => {
                  value && setValue(_collectionForm, "collector_id", value!);
                }}
                error={field.error}
                required
                class="w-100"
              />
            );
          }}
        </Field>
        <Field name="date" type="string" transform={toDate({ on: "input" })}>
          {(field, props) => (
            <ModularDatePicker
              {...props}
              label="Data da coleta"
              placeholder="dd/MM/yyy"
              value={field.value ? [field.value] : undefined}
              onValueChange={(value) =>
                setValue(_collectionForm, "date", value.valueAsString[0])
              }
            />
          )}
        </Field>
      </div>
      <div class="flex gap-4 w-full flex-wrap">
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
          onClick={() => {
            resetForm();
            props.handleCancel();
          }}
        >
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </Form>
  );
};
