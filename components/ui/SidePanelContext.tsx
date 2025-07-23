import React, { createContext, useContext, useState } from 'react';

const SidePanelContext = createContext({
  isOpen: false,
  togglePanel: () => {},
});

export const SidePanelProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePanel = () => setIsOpen(prev => !prev);

  return (
    <SidePanelContext.Provider value={{ isOpen, togglePanel }}>
      {children}
    </SidePanelContext.Provider>
  );
};

export const useSidePanel = () => useContext(SidePanelContext);
