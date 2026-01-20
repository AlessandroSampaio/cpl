import { ColumnDef } from "@tanstack/solid-table";
import { createSignal, onMount, Show } from "solid-js";
import { CreateProducerDialog } from "~/components/producer/create-producer-dialog";
import { DataTable } from "~/components/ui/data-table";
import { Separator } from "~/components/ui/separator";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { showToast } from "~/components/ui/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { createTauRPCProxy, Producer } from "~/types/rpc";
import { Button } from "~/components/ui/button";
import { IconDotsHorizontal } from "~/components/icons/icon-dot-horizontal";
import { IconSun } from "~/components/icons/icon-sun";
import { IconMoon } from "~/components/icons/icon-moon";

export const CreateProducer = () => {
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
      enableHiding: false,
      cell: (props) => {
        return (
          <DropdownMenu placement="bottom-end">
            <DropdownMenuTrigger
              as={Button<"button">}
              variant="ghost"
              class="size-8 p-0"
            >
              <span class="sr-only">Open menu</span>
              <IconDotsHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem
                class="data-highlighted:bg-destructive data-highlighted:text-destructive-foreground text-destructive"
                onClick={() =>
                  rpc.producers.delete_producer(props.row.original.id)
                }
              >
                Apagar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const list_producers = () => {
    rpc.producers
      .list_producers()
      .then(setProducers)
      .catch((error) =>
        showToast({
          description: error,
          title: "Erro ao buscar produtores",
          variant: "destructive",
        }),
      );
  };

  onMount(() => list_producers());

  return (
    <div class="space-y-8 h-[90%] flex flex-col">
      <div class="pl-8 mb-4">
        <h1 class="text-3xl">Create Producer</h1>
      </div>
      <Separator />
      <div class="flex-1 flex flex-col gap-8">
        <div class="flex gap-4">
          <TextField class="flex-1">
            <TextFieldInput placeholder="Pesquisar" />
          </TextField>
          <CreateProducerDialog
            onSubmit={list_producers}
            open={openCreate()}
            onOpenChange={setOpenCreate}
          />
        </div>
        <DataTable columns={columns} data={producers() ?? []} />
      </div>
    </div>
  );
};
