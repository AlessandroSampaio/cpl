import { TankMovByDateRange } from "~/types/rpc";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart } from "../ui/charts";

type CollectionChartProps = {
  data: TankMovByDateRange[];
};

export const CollectionChart = (props: CollectionChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume coletado por dia em (L)</CardTitle>
      </CardHeader>
      <CardContent class="h-64 max-w-full">
        <LineChart
          data={{
            labels: props.data.map((c) => c.date),
            datasets: [
              {
                label: "Volume coletado (L)",
                data: props.data.map((item) => Number(item.total_collections)),
              },
              {
                label: "Volume retirado (L)",
                data: props.data.map((item) => Number(item.total_withdrawals)),
              },
            ],
          }}
        />
      </CardContent>
    </Card>
  );
};
