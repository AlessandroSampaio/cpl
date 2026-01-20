import { ColumnDef } from "@tanstack/solid-table";
import { createSignal, onMount } from "solid-js";
import { CreateCollectorDialog } from "~/components/collector/create-collector-dialog";
import { IconDotsHorizontal } from "~/components/icons/icon-dot-horizontal";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { showToast } from "~/components/ui/toast";
import { Collector, createTauRPCProxy } from "~/types/rpc";

export const Collectors = () => {
  const rpc = createTauRPCProxy();
  // const [filter, setFilter] = createSignal<string>("");
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
                  rpc.collectors
                    .delete_collector(props.row.original.id)
                    .then(() => {
                      showToast({
                        title: "Coletor removido com sucesso",
                        description: "O coletor foi removido com sucesso",
                        variant: "destructive",
                      });
                    })
                    .then(listCollectors)
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

  const listCollectors = () => {
    rpc.collectors
      .list_collectors()
      .then(setCollectors)
      .catch((error) =>
        showToast({
          description: error,
          title: "Erro ao buscar coletores",
          variant: "destructive",
        }),
      );
  };

  onMount(() => listCollectors());

  return (
    <div class="space-y-8 h-[90%] flex flex-col">
      <div class="pl-8 mb-4">
        <h1 class="text-3xl">Coletores</h1>
      </div>
      <Separator />
      <div class="flex-1 flex flex-col gap-8">
        <div class="flex gap-4">
          <TextField class="flex-1">
            <TextFieldInput placeholder="Pesquisar" />
          </TextField>
          <CreateCollectorDialog
            onSubmit={listCollectors}
            open={openCreate()}
            onOpenChange={setOpenCreate}
          />
        </div>
        <DataTable columns={columns} data={collectors() ?? []} />
      </div>
    </div>
  );
};
