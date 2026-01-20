import { createForm, SubmitHandler, toUpperCase } from "@modular-forms/solid";
import { Separator } from "~/components/ui/separator";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { createTauRPCProxy, type NewProducer } from "~/types/rpc";

export const CreateProducer = () => {
  const [_createUserForm, { Form, Field }] = createForm<NewProducer>();
  const rpc = createTauRPCProxy();

  const handleSubmit: SubmitHandler<NewProducer> = (value) => {
    rpc.producers
      .create_producer(value)
      .then(
        (result) => console.log(result),
        // showToast({
        //   title: "Sucesso",
        //   description: `Usuário ${result.id} criado com sucesso!`,
        // }),
      )
      // .then(() => navigate("/users"))
      .catch(
        (error) => console.error(error),
        // showToast({
        //   title: "Falha ao gravar o usário",
        //   description: error.message,
        //   variant: "destructive",
        // }),
      );
  };

  return (
    <div class="space-y-8">
      <div class="pl-8 mb-4">
        <h1 class="text-3xl">Create Producer</h1>
      </div>
      <Separator />
      <Form onSubmit={handleSubmit} class="space-y-4">
        <div class="flex gap-4">
          <Field name="name" transform={toUpperCase({ on: "input" })}>
            {(field, props) => (
              <TextField class="w-80 ">
                <TextFieldLabel>Nome</TextFieldLabel>
                <TextFieldInput
                  {...props}
                  type="text"
                  placeholder="Name"
                  value={field.value}
                />
                {field.error && (
                  <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
                )}
              </TextField>
            )}
          </Field>
        </div>
      </Form>
    </div>
  );
};
