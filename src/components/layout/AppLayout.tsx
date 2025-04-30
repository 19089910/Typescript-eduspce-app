import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex min-h-screen bg-gradient-radial from-blue-50 to-background">
      {!isMobile && (
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      )}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
      {isMobile && (
          <div className="mb-4">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80%]">
                <div className="p-0 h-full">
                  <Sidebar />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
