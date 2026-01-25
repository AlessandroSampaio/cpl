import { createSignal, onMount } from "solid-js";
import { CollectionChart } from "~/components/dashboard/collection-chart";
import { CollectorChart } from "~/components/dashboard/collector-chart";
import { ProducerChart } from "~/components/dashboard/producer-chart";
import { Separator } from "~/components/ui/separator";
import { formatDate } from "~/lib/formatters";
import {
  CollectionByCollector,
  CollectionByDateRange,
  CollectionByProducer,
  createTauRPCProxy,
} from "~/types/rpc";

export const Home = () => {
  const rpc = createTauRPCProxy();
  const [producerData, setProducerData] = createSignal<CollectionByProducer[]>(
    [],
  );
  const [collectorData, setCollectorData] = createSignal<
    CollectionByCollector[]
  >([]);
  const [dateRangeData, setDateRangeData] = createSignal<
    CollectionByDateRange[]
  >([]);

  onMount(() => {
    rpc.dashboard.get_producer_data().then(setProducerData);
    rpc.dashboard.get_collector_data().then(setCollectorData);
    rpc.dashboard
      .get_collection_by_date_range(
        formatDate(new Date("2026-01-01")),
        formatDate(new Date()),
      )
      .then(setDateRangeData);
  });

  return (
    <div class="space-y-4">
      <h1 class="text-2xl text-center">Controle de Produção</h1>
      <Separator />
      <div class="space-y-4">
        <div class="flex justify-evenly flex-wrap space-y-4">
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
        <CollectionChart data={dateRangeData()} />
      </div>
    </div>
  );
};
