
import React from 'react';
import { tabsData } from '@/utils/data';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const { state, toggleSidebar } = useSidebar();
  
  return (
    <Sidebar side="left" variant="sidebar" className="w-[220px] group-data-[collapsible=icon]:w-[60px]">
      <SidebarContent>
        <div className="p-2 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSidebar} 
            className="h-8 w-8 p-0"
          >
            {state === 'expanded' ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </Button>
        </div>
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
