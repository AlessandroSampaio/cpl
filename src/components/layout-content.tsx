import { children, ParentComponent } from "solid-js";
import { SidebarInset } from "~/components/ui/sidebar";

export const LayoutContent: ParentComponent = (props) => {
  const resolved = children(() => props.children);

  return (
    <SidebarInset>
      <div class="p-4 h-full">{resolved()}</div>
    </SidebarInset>
  );
};
