import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { TextField, TextFieldInput } from "./ui/text-field";

export const ProducerDialog = () => {
  return (
    <Dialog>
      <DialogTrigger as={Button<"button">}>Adicionar Produtor</DialogTrigger>
      <DialogContent class="sm:max-w-425">
        <DialogHeader>
          <DialogTitle>Registro de Produtor</DialogTitle>
          <DialogDescription>Cadastre ou altere um produtor</DialogDescription>
        </DialogHeader>
        <div>
          <TextField>
            <TextFieldInput />
          </TextField>
        </div>
      </DialogContent>
    </Dialog>
  );
};
