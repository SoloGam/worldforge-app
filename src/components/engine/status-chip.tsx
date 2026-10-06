import { Badge } from "@/components/ui/badge";
import type { AdapterState, KnowledgeStatus } from "@/lib/worldforge/types";

export function KnowledgeChip({ status }: { status: KnowledgeStatus }) {
  if (status === "KNOWN") return <Badge tone="known">Known</Badge>;
  if (status === "PARTIALLY_KNOWN") return <Badge tone="partial">Partial</Badge>;
  return <Badge tone="unknown">Unknown</Badge>;
}

export function AdapterChip({ state }: { state: AdapterState }) {
  if (state === "BOUND") return <Badge tone="known">Bound</Badge>;
  if (state === "SKIPPED_NO_API") return <Badge tone="partial">No API yet</Badge>;
  if (state === "SKIPPED_DISABLED") return <Badge tone="unknown">Disabled</Badge>;
  if (state === "SKIPPED_MISSING_TARGET") return <Badge tone="unknown">Missing target</Badge>;
  return <Badge>Unbound</Badge>;
}
