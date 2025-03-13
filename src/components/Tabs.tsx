
import React from 'react';
import { tabsData } from '@/utils/data';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Sidebar side="left" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabsData.map((tab) => (
                <SidebarMenuItem key={tab.id}>
                  <SidebarMenuButton 
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    tooltip={tab.name}
                  >
                    {tab.icon && <tab.icon />}
                    <span>{tab.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Tabs;
