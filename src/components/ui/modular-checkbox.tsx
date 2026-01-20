import { splitProps, type JSX } from "solid-js";
import { Checkbox as Kobalte } from "@kobalte/core/checkbox";
import { cn } from "~/lib/utils";

type ModularCheckboxProps = {
  name: string;
  label: string;
  value?: string | undefined;
  checked: boolean | undefined;
  error?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
  setValue: (checked: boolean) => void;
  class?: string | undefined;
};

export const ModularCheckbox = (props: ModularCheckboxProps) => {
  const [{ class: rootClass }, rootProps, inputProps] = splitProps(
    props,
    ["class"],
    ["name", "value", "checked", "required", "disabled"],
    ["ref", "onInput", "onChange", "onBlur"],
  );
  return (
    <Kobalte
      {...rootProps}
      onChange={(v) => props.setValue(v)}
      validationState={props.error ? "invalid" : "valid"}
      class={cn("items-center group relative flex space-x-2", rootClass)}
    >
      <Kobalte.Input {...inputProps} class="peer" />
      <Kobalte.Control
        class={cn(
          "size-4 shrink-0 rounded-sm border border-primary ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          "data-checked:border-none data-checked:bg-primary data-checked:text-primary-foreground",
          "data-indeterminate:border-none data-indeterminate:bg-primary data-indeterminate:text-primary-foreground",
        )}
      >
        <Kobalte.Indicator>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
          >
            <path d="M5 12l5 5l10 -10" />
          </svg>
        </Kobalte.Indicator>
      </Kobalte.Control>
      <Kobalte.Label>{props.label}</Kobalte.Label>
    </Kobalte>
  );
};
