import { CollectionForm } from "~/components/collection/collection-form";
import { Separator } from "~/components/ui/separator";

export const Collections = () => {
  return (
    <div class="space-y-8 h-[90%] flex flex-col">
      <div class="pl-8 mb-4">
        <h1 class="text-3xl">Coletas</h1>
      </div>
      <Separator />
      <CollectionForm
        handleCancel={() => console.log(`cancelled`)}
        handleSubmit={console.log}
      />
    </div>
  );
};
