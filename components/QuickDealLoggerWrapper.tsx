"use client";
import QuickDealLogger from "./QuickDealLogger";

export default function QuickDealLoggerWrapper() {
  return <QuickDealLogger onDealLogged={() => window.location.reload()} />;
}
