import { createSignal } from "solid-js";
import { CreateProducerDialog } from "~/components/producer/create-producer-dialog";
import { Separator } from "~/components/ui/separator";
import { TextField, TextFieldInput } from "~/components/ui/text-field";

export const CreateProducer = () => {
  const [openCreate, setOpenCreate] = createSignal(false);

  return (
    <div class="space-y-8">
      <div class="pl-8 mb-4">
        <h1 class="text-3xl">Create Producer</h1>
      </div>
      <Separator />
      <div class="flex gap-4">
        <TextField class="flex-1">
          <TextFieldInput placeholder="Pesquisar" />
        </TextField>
        <CreateProducerDialog
          onSubmit={console.log}
          open={openCreate()}
          onOpenChange={setOpenCreate}
        />
      </div>
    </div>
  );
};
