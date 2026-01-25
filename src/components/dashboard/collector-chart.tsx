import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { BarChart } from "~/components/ui/charts";

type CollectorChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
};

export const CollectorChart = (props: CollectorChartProps) => {
  return (
    <Card class="w-125 h-84">
      <CardHeader>
        <CardTitle>Volume por Coletor</CardTitle>
      </CardHeader>
      <CardContent class="h-72 ">
        <BarChart data={props.data} />
      </CardContent>
    </Card>
  );
};
