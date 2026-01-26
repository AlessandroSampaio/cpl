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
import { Collector, createTauRPCProxy, NewCollector } from "~/types/rpc";
import { CollectorForm } from "./collector-form";
import { splitProps } from "solid-js";

type CreateCollectorDialogProps = {
  onSubmit: (wasSuccessfull: boolean) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValue?: Collector | undefined;
};

export const CreateCollectorDialog = (props: CreateCollectorDialogProps) => {
  const rpc = createTauRPCProxy();

  const [others, local] = splitProps(props, ["defaultValue"]);

  const handleSubmit: SubmitHandler<NewCollector> = (value) => {
    if (others.defaultValue?.id) {
      rpc.collectors
        .update_collector(others.defaultValue.id, value)
        .then((result) =>
          showToast({
            title: "Sucesso",
            description: `Coletor ${result.id} atualizado com sucesso!`,
          }),
        )
        .then(() => local.onSubmit(true))
        .then(() => local.onOpenChange(false))
        .catch((error) => {
          showToast({
            title: "Falha ao atualizar o coletor",
            description: error,
            variant: "destructive",
          });
          local.onSubmit(false);
          local.onOpenChange(false);
        });
    } else {
      rpc.collectors
        .create_collector(value)
        .then((result) =>
          showToast({
            title: "Sucesso",
            description: `Coletor ${result.id} registrado com sucesso!`,
          }),
        )
        .then(() => local.onSubmit(true))
        .then(() => local.onOpenChange(false))
        .catch((error) => {
          showToast({
            title: "Falha ao registrar o coletor",
            description: error,
            variant: "destructive",
          });
          local.onSubmit(false);
          local.onOpenChange(false);
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
          <DialogTitle>Registro de Coletor</DialogTitle>
          <DialogDescription>Adicione um novo coletor.</DialogDescription>
        </DialogHeader>
        <CollectorForm
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
