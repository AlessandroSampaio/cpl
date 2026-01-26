import { ColumnDef } from "@tanstack/solid-table";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { IconPencil } from "~/components/icons/icon-edit";
import { IconMoon } from "~/components/icons/icon-moon";
import { IconSun } from "~/components/icons/icon-sun";
import { CreateProducerDialog } from "~/components/producer/create-producer-dialog";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Separator } from "~/components/ui/separator";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { showToast } from "~/components/ui/toast";
import { createTauRPCProxy, Producer } from "~/types/rpc";
import { createScheduled, debounce } from "@solid-primitives/scheduled";

export const Producers = () => {
  const rpc = createTauRPCProxy();
  const [producers, setProducers] = createSignal<Producer[]>([]);
  const [openCreate, setOpenCreate] = createSignal(false);
  const columns: ColumnDef<Producer>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      id: "shifts",
      header: "Turnos",
      cell: (props) => (
        <div class="flex gap-2">
          <Show when={props.row.original.day_shift}>
            <IconSun class="text-yellow-300" />
          </Show>
          <Show when={props.row.original.night_shift}>
            <IconMoon class="text-shadow-white" />
          </Show>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      enableHiding: false,
      cell: (props) => {
        return (
          <Button
            size={"icon"}
            variant={"ghost"}
            class="group"
            onClick={() => {
              console.log(props.row.original);
              setProducer(props.row.original);
              setOpenCreate(true);
            }}
          >
            <IconPencil class="size-10 group-hover:text-primary text-primary-foreground" />
          </Button>
        );
      },
    },
  ];

  const [filter, setFilter] = createSignal<string>("");
  const [producer, setProducer] = createSignal<Producer | undefined>(undefined);
  const schedule = createScheduled((fn) => debounce(fn, 500));

  const list_producers = (filter: string) => {
    rpc.producers
      .list_producers(filter)
      .then(setProducers)
      .catch((error) =>
        showToast({
          description: error,
          title: "Erro ao buscar produtores",
          variant: "destructive",
        }),
      );
  };

  createEffect(() => {
    if (schedule()) list_producers(filter());
  }, [schedule()]);

  onMount(() => list_producers(""));

  return (
    <div class="space-y-8 h-[90%] flex flex-col">
      <div class="pl-8 mb-4">
        <h1 class="text-3xl">Produtores</h1>
      </div>
      <Separator />
      <div class="flex-1 flex flex-col gap-8">
        <div class="flex gap-4">
          <TextField class="flex-1">
            <TextFieldInput
              spellcheck={false}
              placeholder="Pesquisar"
              value={filter()}
              onInput={(event) => {
                setFilter(event.currentTarget.value.toUpperCase());
              }}
            />
          </TextField>
          <CreateProducerDialog
            onSubmit={() => list_producers(filter())}
            open={openCreate()}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setProducer(undefined);
              }
              setOpenCreate(isOpen);
            }}
            defaultValue={producer()}
          />
        </div>
        <DataTable columns={columns} data={producers() ?? []} />
      </div>
    </div>
  );
};
