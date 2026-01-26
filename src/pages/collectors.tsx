import { createScheduled, debounce } from "@solid-primitives/scheduled";
import { ColumnDef } from "@tanstack/solid-table";
import { createEffect, createSignal, onMount } from "solid-js";
import { CreateCollectorDialog } from "~/components/collector/create-collector-dialog";
import { IconPencil } from "~/components/icons/icon-edit";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Separator } from "~/components/ui/separator";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { showToast } from "~/components/ui/toast";
import { Collector, createTauRPCProxy } from "~/types/rpc";

export const Collectors = () => {
  const rpc = createTauRPCProxy();
  const [filter, setFilter] = createSignal<string>("");
  const schedule = createScheduled((fn) => debounce(fn, 500));

  const [collector, setCollector] = createSignal<Collector | undefined>(
    undefined,
  );
  const [collectors, setCollectors] = createSignal<Collector[]>([]);
  const [openCreate, setOpenCreate] = createSignal(false);
  const columns: ColumnDef<Collector>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Nome",
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
              setCollector(props.row.original);
              setOpenCreate(true);
            }}
          >
            <IconPencil class="size-10 group-hover:text-primary text-primary-foreground" />
          </Button>
        );
      },
    },
  ];

  const listCollectors = (filter: string) => {
    rpc.collectors
      .list_collectors(filter)
      .then(setCollectors)
      .catch((error) =>
        showToast({
          description: error,
          title: "Erro ao buscar coletores",
          variant: "destructive",
        }),
      );
  };

  createEffect(() => {
    if (schedule()) listCollectors(filter());
  }, [schedule()]);

  onMount(() => listCollectors(filter()));

  return (
    <div class="space-y-8 h-[90%] flex flex-col">
      <div class="pl-8 mb-4">
        <h1 class="text-3xl">Coletores</h1>
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
          <CreateCollectorDialog
            onSubmit={() => listCollectors(filter())}
            open={openCreate()}
            onOpenChange={setOpenCreate}
            defaultValue={collector()}
          />
        </div>
        <DataTable columns={columns} data={collectors() ?? []} />
      </div>
    </div>
  );
};
