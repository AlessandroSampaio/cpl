import { SubmitHandler } from "@modular-forms/solid";
import { splitProps } from "solid-js";
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
import { createTauRPCProxy, NewProducer, Producer } from "~/types/rpc";

type CreateProducerDialogProps = {
  onSubmit: (wasSuccessfull: boolean) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValue?: Producer | undefined;
};

export const CreateProducerDialog = (props: CreateProducerDialogProps) => {
  const rpc = createTauRPCProxy();

  const [others, local] = splitProps(props, ["defaultValue"]);

  const handleSubmit: SubmitHandler<NewProducer> = (value) => {
    if (others.defaultValue?.id) {
      rpc.producers
        .update_producer(others.defaultValue.id, value)
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
    } else {
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
    }
  };

  return (
    <Dialog open={local.open} onOpenChange={local.onOpenChange}>
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
            local.onOpenChange(false);
          }}
          defaultValue={others.defaultValue}
        />
      </DialogContent>
    </Dialog>
  );
};
