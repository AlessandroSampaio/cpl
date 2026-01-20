import { Component, JSX } from "solid-js";

export const IconDotsHorizontal: Component<JSX.IntrinsicElements["svg"]> = (
  props,
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
      class={props.class}
    >
      <title>Options</title>
      <path d="M10 10h4v4h-4zM16 10h4v4h-4zM4 10h4v4H4z"></path>
    </svg>
  );
};
