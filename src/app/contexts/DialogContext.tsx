"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { CustomDialog } from "../components/ui/CustomDialog";

type AlertOptions = {
  title?: string;
  message: string;
  confirmText?: string;
};

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

type DialogState =
  | null
  | ({
      kind: "alert" | "confirm";
      title?: string;
      message: string;
      confirmText?: string;
      cancelText?: string;
    } & { open: true });

type DialogApi = {
  alert: (options: AlertOptions) => Promise<void>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const DialogContext = createContext<DialogApi | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>(null);
  const resolverRef = useRef<null | ((value: boolean | void) => void)>(null);

  const close = useCallback(() => {
    setDialog(null);
    resolverRef.current = null;
  }, []);

  const alert = useCallback(async (options: AlertOptions) => {
    // If something is already open, close it without blocking the app
    try {
      resolverRef.current?.();
    } catch {}

    return await new Promise<void>((resolve) => {
      resolverRef.current = resolve;
      setDialog({
        open: true,
        kind: "alert",
        title: options.title,
        message: options.message,
        confirmText: options.confirmText ?? "OK",
      });
    });
  }, []);

  const confirm = useCallback(async (options: ConfirmOptions) => {
    try {
      resolverRef.current?.(false);
    } catch {}

    return await new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setDialog({
        open: true,
        kind: "confirm",
        title: options.title ?? "Confirm",
        message: options.message,
        confirmText: options.confirmText ?? "OK",
        cancelText: options.cancelText ?? "Cancel",
      });
    });
  }, []);

  return (
    <DialogContext.Provider value={{ alert, confirm }}>
      {children}
      <CustomDialog
        open={!!dialog?.open}
        title={dialog?.title}
        message={dialog?.message || ""}
        confirmText={dialog?.confirmText}
        cancelText={dialog?.cancelText}
        showCancel={dialog?.kind === "confirm"}
        onCancel={() => {
          if (dialog?.kind === "confirm") {
            resolverRef.current?.(false);
          } else {
            resolverRef.current?.();
          }
          close();
        }}
        onConfirm={() => {
          if (dialog?.kind === "confirm") {
            resolverRef.current?.(true);
          } else {
            resolverRef.current?.();
          }
          close();
        }}
      />
    </DialogContext.Provider>
  );
}

export function useDialog(): DialogApi {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return ctx;
}



