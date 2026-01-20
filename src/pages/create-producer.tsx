import { ColumnDef } from "@tanstack/solid-table";
import { createSignal, onMount } from "solid-js";
import { CreateProducerDialog } from "~/components/producer/create-producer-dialog";
import { DataTable } from "~/components/ui/data-table";
import { Separator } from "~/components/ui/separator";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { showToast } from "~/components/ui/toast";
import { createTauRPCProxy, Producer } from "~/types/rpc";

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
