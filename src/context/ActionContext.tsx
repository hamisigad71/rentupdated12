"use client";

import React, { createContext, useContext, useState } from "react";

interface ActionState {
  title: string;
  message: string;
  color: "green" | "red" | "blue" | "orange";
  icon: string;
  visible: boolean;
}

interface ActionContextType {
  showAction: (data: Omit<ActionState, "visible">) => void;
  updateAction: (data: Partial<Omit<ActionState, "visible">>) => void;
  hideAction: () => void;
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export function ActionProvider({ children }: { children: React.ReactNode }) {
  const [action, setAction] = useState<ActionState>({
    title: "",
    message: "",
    color: "green",
    icon: "check_circle",
    visible: false,
  });

  const showAction = (data: Omit<ActionState, "visible">) => {
    setAction({ ...data, visible: true });
  };

  const updateAction = (data: Partial<Omit<ActionState, "visible">>) => {
    setAction((prev) => ({ ...prev, ...data }));
  };

  const hideAction = () => {
    setAction((prev) => ({ ...prev, visible: false }));
  };

  return (
    <ActionContext.Provider value={{ showAction, updateAction, hideAction }}>
      {children}
      {action.visible && (
        <div className="fixed inset-x-0 bottom-8 z-100 flex justify-center px-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-[#0F0F0F] border border-white/10 rounded-3xl p-6 shadow-2xl flex items-center gap-6 max-w-md w-full backdrop-blur-3xl">
             <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse">
                <div className="h-6 w-6 rounded-full bg-primary" />
             </div>
             <div className="flex-1 space-y-1">
                <p className="text-sm text-white tracking-tight uppercase">{action.title}</p>
                <p className="text-xs text-white/40 uppercase ">{action.message}</p>
             </div>
          </div>
        </div>
      )}
    </ActionContext.Provider>
  );
}

export function useAction() {
  const context = useContext(ActionContext);
  if (context === undefined) {
    throw new Error("useAction must be used within an ActionProvider");
  }
  return context;
}
