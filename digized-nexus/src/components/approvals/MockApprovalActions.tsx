"use client";

import { useState } from "react";
import Badge from "@/src/components/ui/Badge";
import type { ApprovalStatus } from "@/src/lib/models";

type MockApprovalActionsProps = {
  initialStatus: ApprovalStatus;
  showHelperText?: boolean;
};

export default function MockApprovalActions({
  initialStatus,
  showHelperText = false,
}: MockApprovalActionsProps) {
  const [status, setStatus] = useState(initialStatus);

  return (
    <div className={showHelperText ? "space-y-3" : "space-y-2"}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge type="status" value={status} />
        <button
          type="button"
          onClick={() => setStatus("approved")}
          className={`rounded border px-3 py-1 text-xs transition ${
            status === "approved"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          Approve
        </button>
        <button
          type="button"
          onClick={() => setStatus("rejected")}
          className={`rounded border px-3 py-1 text-xs transition ${
            status === "rejected"
              ? "border-rose-200 bg-rose-50 text-rose-800"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          Reject
        </button>
      </div>
      {showHelperText ? (
        <p className="text-sm text-slate-600">
          Mock decision only. This updates the visible status for the current
          page view and is not persisted.
        </p>
      ) : null}
    </div>
  );
}
