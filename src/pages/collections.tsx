import { SubmitHandler } from "@modular-forms/solid";
import { CollectionForm } from "~/components/collection/collection-form";
import { Separator } from "~/components/ui/separator";
import { showToast } from "~/components/ui/toast";
import { dateFromString, formatDate } from "~/lib/formatters";
import { createTauRPCProxy, NewCollection } from "~/types/rpc";

export const Collections = () => {
  const rpc = createTauRPCProxy();

  const handleSubmit: SubmitHandler<NewCollection> = (values) => {
    const date = dateFromString(values.date);
    console.log(date);
    rpc.collections
      .create_collection({
        ...values,
        date: formatDate(date),
      })
      .then((c) =>
        showToast({
          title: "Sucesso",
          description: `Coleta ${c.id} criada com sucesso`,
        }),
      )
      .catch((error) =>
        showToast({
          title: "Erro",
          description: error,
          variant: "destructive",
        }),
      );
  };
  return (
    <div class="space-y-8 h-[90%] flex flex-col">
      <div class="pl-8 mb-4">
        <h1 class="text-3xl">Coletas</h1>
      </div>
      <Separator />
      <CollectionForm
        handleCancel={() => console.log(`cancelled`)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
