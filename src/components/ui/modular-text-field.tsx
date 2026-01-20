import { JSX, Show, splitProps } from "solid-js";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextArea,
} from "~/components/ui/text-field";

type ModularTextFieldProps = {
  name: string;
  type?: "text" | "email" | "tel" | "password" | "url" | "date" | undefined;
  label?: string | undefined;
  placeholder?: string | undefined;
  value: string | undefined;
  error: string;
  multiline?: boolean | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  ref: (element: HTMLInputElement | HTMLTextAreaElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, FocusEvent>;
  class?: string | undefined;
  readonly?: boolean | undefined;
};

export const ModularTextField = (props: ModularTextFieldProps) => {
  const [rootProps, inputProps] = splitProps(
    props,
    ["name", "value", "required", "disabled", "class"],
    ["placeholder", "name", "ref", "onInput", "onChange", "onBlur", "readonly"],
  );

  return (
    <TextField
      {...rootProps}
      validationState={props.error ? "invalid" : "valid"}
    >
      <Show when={props.label}>
        <TextFieldLabel>{props.label}</TextFieldLabel>
      </Show>
      <Show
        when={props.multiline}
        fallback={<TextFieldInput {...props} type={props.type} />}
      >
        <TextFieldTextArea {...inputProps} autoResize />
      </Show>
      <TextFieldErrorMessage>{props.error}</TextFieldErrorMessage>
    </TextField>
  );
};
