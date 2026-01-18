import { ProducerDialog } from "~/components/producer-dialog";

export const Home = () => {
  return (
    <div>
      <h1 class="text-2xl text-center">Controle de Produção</h1>
      <div class="flex w-full h-16">
        <ProducerDialog />
      </div>
    </div>
  );
};
