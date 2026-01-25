import { createSignal, onMount } from "solid-js";
import { CollectorChart } from "~/components/dashboard/collector-chart";
import { ProducerChart } from "~/components/dashboard/producer-chart";
import { Separator } from "~/components/ui/separator";
import {
  createTauRPCProxy,
  CollectionByProducer,
  CollectionByCollector,
} from "~/types/rpc";

export const Home = () => {
  const rpc = createTauRPCProxy();
  const [producerData, setProducerData] = createSignal<CollectionByProducer[]>(
    [],
  );
  const [collectorData, setCollectorData] = createSignal<
    CollectionByCollector[]
  >([]);

  onMount(() => {
    rpc.dashboard.get_producer_data().then(setProducerData);
    rpc.dashboard.get_collector_data().then(setCollectorData);
  });

  return (
    <div class="space-y-4">
      <h1 class="text-2xl text-center">Controle de Produção</h1>
      <Separator />
      <div>
        <div class="flex justify-evenly flex-wrap">
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
          <CollectorChart
            data={{
              labels: collectorData().map((producer) => producer.name),
              datasets: [
                {
                  label: "Coleta em Litros (L)",
                  data: collectorData().map((item) => Number(item.total)),
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};
