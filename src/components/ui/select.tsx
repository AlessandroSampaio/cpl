import { createEffect, createSignal, Show } from "solid-js";
import { JSX, splitProps } from "solid-js";
import { Select as Kobalte } from "@kobalte/core/select";
import { cn } from "~/lib/utils";

type Option<T = string | number> = {
  label: string;
  value: T;
};

type SelectProps<T = string | number> = {
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  options: Option<T>[];
  value?: T | undefined;
  error: string;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  ref: (element: HTMLSelectElement) => void;
  onSelectedChange: (value: T | undefined) => void;
  onInput: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onBlur: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
  class?: string | undefined;
};

export const Select = <T = string | number,>(props: SelectProps<T>) => {
  const [{ class: rootClass }, rootProps, selectProps] = splitProps(
    props,
    ["class"],
    ["name", "placeholder", "options", "required", "onChange", "disabled"],
    ["placeholder", "ref", "onInput", "onBlur"],
  );

  const [getValue, setValue] = createSignal<Option<T>>();
  createEffect(() => {
    setValue(props.options.find((opt) => props.value === opt.value));
    // props.onSelectedChange(getValue()?.value);
  });

  createEffect(() => {
    props.onSelectedChange(getValue()?.value);
  }, [getValue()]);

  return (
    <Kobalte
      {...rootProps}
      multiple={false}
      value={getValue()}
      onChange={setValue}
      optionValue="value"
      optionTextValue="label"
      validationState={props.error ? "invalid" : "valid"}
      itemComponent={(itemProps) => (
        <Kobalte.Item
          item={itemProps.item}
          class={cn(
            "relative mt-0 flex w-full cursor-default select-none",
            "items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none ",
            "focus:bg-accent focus:text-accent-foreground",
            "hover:bg-accent hover:text-accent-foreground",
            "data-disabled:pointer-events-none data-disabled:opacity-50",
          )}
        >
          <Kobalte.ItemLabel>{itemProps.item.textValue}</Kobalte.ItemLabel>
          <Kobalte.ItemIndicator class="absolute right-2 flex size-3.5 items-center justify-center">
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
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l5 5110 -10" />
            </svg>
          </Kobalte.ItemIndicator>
        </Kobalte.Item>
      )}
    >
      <Show when={props.label}>
        <Kobalte.Label>{props.label}</Kobalte.Label>
      </Show>
      <Kobalte.HiddenSelect {...selectProps} />
      <Kobalte.Trigger
        class={cn(
          "flex h-10 items-center justify-between rounded-md border",
          "border-input bg-transparent px-3 py-2 text-sm ring-offsxet-background placeholder:text-muted-foreground",
          "focus:outline-none focus-ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          rootClass,
        )}
      >
        <Kobalte.Value<Option>>
          {(state) => state.selectedOption()?.label}
        </Kobalte.Value>
        <Kobalte.Icon
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4 opacity-50"
        >
          <path d="M8 914 -414 4" />
          <path d="M16 151-1 41-4 -4" />
        </Kobalte.Icon>
      </Kobalte.Trigger>
      <Kobalte.Portal>
        <Kobalte.Content
          class={cn(
            "relative z-50 overflow-hidden rounded-md border bg-popover",
            "text-popover-foreground shadow-md animate-in fade-in-80",
          )}
        >
          <Kobalte.Listbox class="m-0 p-1" />
        </Kobalte.Content>
      </Kobalte.Portal>
      <Kobalte.ErrorMessage class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2 text-xs text-destructive">
        {props.error}
      </Kobalte.ErrorMessage>
    </Kobalte>
  );
};
