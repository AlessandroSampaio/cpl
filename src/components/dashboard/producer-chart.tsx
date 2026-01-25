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
    <Card class="w-125 h-84">
      <CardHeader>
        <CardTitle>Volume por Produtor</CardTitle>
      </CardHeader>
      <CardContent class="h-72">
        <BarChart data={props.data} width={500} />
      </CardContent>
    </Card>
  );
};
