import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { BarChart } from "~/components/ui/charts";

type ProducerChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
};

export const ProducerChart = (props: ProducerChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume por Produtor</CardTitle>
      </CardHeader>
      <CardContent class="h-64 w-125 max-w-full">
        <BarChart data={props.data} />
      </CardContent>
    </Card>
  );
};
