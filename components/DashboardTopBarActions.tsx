"use client";

import { Download, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DealExport {
  customer: string;
  type: { label: string; variant: string };
  units: number | null;
  commission: number;
}

interface DashboardTopBarActionsProps {
  deals: DealExport[];
  csvFilename?: string;
}

function dealsToCsv(deals: DealExport[]): string {
  const header = "Customer,Deal Type,Units,Commission";
  const rows = deals.map((d) => {
    const customer = `"${d.customer.replace(/"/g, '""')}"`;
    const units = d.units !== null ? String(d.units) : "—";
    return `${customer},${d.type.label},${units},$${d.commission.toLocaleString()}`;
  });
  return [header, ...rows].join("\n");
}

export default function DashboardTopBarActions({
  deals,
  csvFilename = "deals-export.csv",
}: DashboardTopBarActionsProps) {
  const router = useRouter();

  const handleExport = () => {
    const csv = dealsToCsv(deals);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = csvFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleExport}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ash transition-all hover:border-white/20 hover:text-bone hover:bg-white/10"
        aria-label="Export dashboard"
      >
        <Download className="h-3.5 w-3.5" strokeWidth={2} />
        Export
      </button>
      <button
        type="button"
        onClick={() => router.push("/dashboard/settings")}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ash transition-all hover:border-white/20 hover:text-bone hover:bg-white/10"
        aria-label="Pay plan settings"
      >
        <Settings2 className="h-3.5 w-3.5" strokeWidth={2} />
        Pay plan
      </button>
    </>
  );
}
