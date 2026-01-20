import { A } from "@solidjs/router";
import { For } from "solid-js";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const items = [
  {
    title: "Inicio",
    url: "/",
    icon: undefined,
  },
  {
    title: "Produtores",
    url: "/producers/new",
    icon: undefined,
  },
  {
    title: "Coletores",
    url: "/collectors",
    icon: undefined,
  },
  {
    title: "Registro de Coletas",
    url: "/collections",
    icon: undefined,
  },
  {
    title: "Registro de Retirada",
    url: "/withdrawals",
    icon: undefined,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Controle de Produção</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={items}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton as={A} href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
