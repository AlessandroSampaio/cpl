import {
  FieldEvent,
  FieldValue,
  Maybe,
  toCustom,
  TransformField,
  TransformOptions,
} from "@modular-forms/solid";
import { createInputMask } from "@solid-primitives/input-mask";

export const toInputMask = <T extends FieldValue>(
  inputMask: (event: FieldEvent) => Maybe<T>,
  options: TransformOptions,
): TransformField<T> =>
  toCustom<T>((value, event) => {
    if (typeof value === "string") {
      let newValue = value.toUpperCase();
      event.currentTarget.value = newValue;
      return inputMask(event);
    }
    return inputMask(event);
  }, options);

export const toDate = (options: TransformOptions): TransformField<string> => {
  const dateMask = createInputMask<FieldEvent>("99/99/9999");
  return toInputMask<string>(dateMask, options);
};

export const toNumber = (options: TransformOptions): TransformField<string> => {
  const numberMask = createInputMask<FieldEvent>([
    /d*/,
    /d*\,?/,
    /\d*\,?\d{0,3}/,
  ]);
  return toInputMask<string>(numberMask, options);
};
