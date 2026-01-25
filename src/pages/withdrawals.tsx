import { SubmitHandler } from "@modular-forms/solid";
import { Separator } from "~/components/ui/separator";
import { showToast } from "~/components/ui/toast";
import { WithdrawalsForm } from "~/components/withdrawals/withdrawals-form";
import { dateFromString, formatDate } from "~/lib/formatters";
import { createTauRPCProxy, NewWithdrawal } from "~/types/rpc";

export const Withdrawals = () => {
  const rpc = createTauRPCProxy();

  const handleSubmit: SubmitHandler<NewWithdrawal> = (values) => {
    const date = dateFromString(values.date);
    console.log(date);
    rpc.withdrawals
      .create_withdrawal({
        ...values,
        date: formatDate(date),
      })
      .then((c) =>
        showToast({
          title: "Sucesso",
          description: `Retirada ${c.id} criada com sucesso`,
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
        <h1 class="text-3xl">Retiradas</h1>
      </div>
      <Separator />
      <WithdrawalsForm
        handleCancel={() => console.log(`cancelled`)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
