"use client";

import React from "react";

export type CustomDialogProps = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function CustomDialog({
  open,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
  onConfirm,
  onCancel,
}: CustomDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Dialog"}
      onClick={() => {
        if (showCancel && onCancel) onCancel();
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-[1px] bg-gradient-to-br from-yellow-400/25 via-white/10 to-orange-500/20 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl bg-black/80 border border-white/10 p-5">
          {title && (
            <div className="text-white font-semibold text-lg mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              {title}
            </div>
          )}

          <div className="text-white/85 text-sm leading-relaxed">{message}</div>

          <div className="mt-5 flex justify-end gap-3">
            {showCancel && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 transition-colors"
              >
                {cancelText}
              </button>
            )}

            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-300 hover:to-orange-400 transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



