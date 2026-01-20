import { SubmitHandler } from "@modular-forms/solid";
import { ProducerForm } from "~/components/producer/producer-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { showToast } from "~/components/ui/toast";
import { createTauRPCProxy, NewProducer } from "~/types/rpc";

type CreateProducerDialogProps = {
  onSubmit: (wasSuccessfull: boolean) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateProducerDialog = (props: CreateProducerDialogProps) => {
  const rpc = createTauRPCProxy();

  const handleSubmit: SubmitHandler<NewProducer> = (value) => {
    rpc.producers
      .create_producer(value)
      .then((result) =>
        showToast({
          title: "Sucesso",
          description: `Produtor ${result.id} registrado com sucesso!`,
        }),
      )
      .then(() => props.onSubmit(true))
      .then(() => props.onOpenChange(false))
      .catch((error) => {
        showToast({
          title: "Falha ao registrar o produtor",
          description: error,
          variant: "destructive",
        });
        props.onSubmit(false);
        props.onOpenChange(false);
      });
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger>
        <Button class="w-32">Novo +</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registro de Produtor</DialogTitle>
          <DialogDescription>Adicione um novo produtor.</DialogDescription>
        </DialogHeader>
        <ProducerForm
          handleSubmit={handleSubmit}
          handleCancel={() => {
            console.log(`handle cancel click`);
            props.onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
