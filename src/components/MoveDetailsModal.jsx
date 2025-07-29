import React, { useEffect } from "react";
import {
  X,
  Zap,
  Target,
  BatteryCharging,
  ArrowUp,
  Layers,
  Award,
  Info,
  Loader2,
} from "lucide-react";
import { useMoveDetails } from "@/hooks/useMoveDetails";
import Portal from "./Portal";
import clsx from "clsx";

const labelClass = "text-slate-500 dark:text-slate-400 text-sm";
const valueClass = "font-semibold text-slate-900 dark:text-white text-base";

const iconWrapper =
  "p-2 rounded-full text-white flex items-center justify-center";
const statCard =
  "flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-md";

const statRow = (Icon, label, value, color = "bg-indigo-500") => (
  <div className={statCard}>
    <div className={clsx(iconWrapper, color)}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex flex-col">
      <span className={labelClass}>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  </div>
);

export default function MoveDetailsModal({ moveName, open, onClose }) {
  const { move, loading, error } = useMoveDetails(moveName);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-slate-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl  overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-600 dark:to-yellow-700">
            <h2 className="text-xl font-bold capitalize text-white flex items-center gap-2">
              <Zap className="w-6 h-6" />
              {moveName.replace(/-/g, " ")}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-slate-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {loading && (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="animate-spin text-gray-500" size={32} />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-center">Error: {error}</p>
            )}

            {move && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {statRow(
                    Layers,
                    "Type",
                    <span className="capitalize">{move.type.name}</span>,
                    "bg-purple-500"
                  )}
                  {statRow(Zap, "Power", move.power ?? "—", "bg-yellow-500")}
                  {statRow(
                    Target,
                    "Accuracy",
                    move.accuracy != null ? `${move.accuracy}%` : "—",
                    "bg-blue-500"
                  )}
                  {statRow(BatteryCharging, "PP", move.pp, "bg-teal-500")}
                  {statRow(ArrowUp, "Priority", move.priority, "bg-red-500")}
                  {move.damage_class &&
                    statRow(
                      Layers,
                      "Category",
                      <span className="capitalize">
                        {move.damage_class.name}
                      </span>,
                      "bg-pink-500"
                    )}
                  {move.contest_type &&
                    statRow(
                      Award,
                      "Contest",
                      <span className="capitalize">
                        {move.contest_type.name}
                      </span>,
                      "bg-green-500"
                    )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-600">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-100">
                    <Info className="w-5 h-5 text-indigo-500" />
                    Effect
                  </h3>
                  <p className="mt-2 text-slate-700 dark:text-slate-200">
                    {
                      move.effect_entries.find((e) => e.language.name === "en")
                        ?.short_effect
                    }
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
