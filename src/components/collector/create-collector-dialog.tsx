import { SubmitHandler } from "@modular-forms/solid";
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
import { createTauRPCProxy, NewCollector } from "~/types/rpc";
import { CollectorForm } from "./collector-form";

type CreateCollectorDialogProps = {
  onSubmit: (wasSuccessfull: boolean) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateCollectorDialog = (props: CreateCollectorDialogProps) => {
  const rpc = createTauRPCProxy();

  const handleSubmit: SubmitHandler<NewCollector> = (value) => {
    rpc.collectors
      .create_collector(value)
      .then((result) =>
        showToast({
          title: "Sucesso",
          description: `Coletor ${result.id} registrado com sucesso!`,
        }),
      )
      .then(() => props.onSubmit(true))
      .then(() => props.onOpenChange(false))
      .catch((error) => {
        showToast({
          title: "Falha ao registrar o coletor",
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
          <DialogTitle>Registro de Coletor</DialogTitle>
          <DialogDescription>Adicione um novo coletor.</DialogDescription>
        </DialogHeader>
        <CollectorForm
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
