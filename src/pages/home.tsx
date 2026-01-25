import { createSignal, onMount } from "solid-js";
import { ProducerChart } from "~/components/dashboard/producer-chart";
import { Separator } from "~/components/ui/separator";
import { createTauRPCProxy, CollectionByProducer } from "~/types/rpc";

export const Home = () => {
  const rpc = createTauRPCProxy();
  const [producerData, setProducerData] = createSignal<CollectionByProducer[]>(
    [],
  );

  onMount(() => {
    rpc.dashboard.get_producer_data().then(setProducerData);
  });

  return (
    <div class="space-y-4">
      <h1 class="text-2xl text-center">Controle de Produção</h1>
      <Separator />
      <ProducerChart
        data={{
          labels: producerData().map((producer) => producer.name),
          datasets: [
            {
              label: "Produção em Litros (L)",
              data: producerData().map((item) => Number(item.total)),
            },
          ],
        }}
      />
    </div>
  );
};
