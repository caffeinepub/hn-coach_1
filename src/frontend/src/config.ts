// Local config wrapper for backend actor creation.
// This project stores data primarily in localStorage; backend calls are fire-and-forget.
// We expose a typed facade so the existing call sites compile cleanly.

import { createActorWithConfig as _create } from "@caffeineai/core-infrastructure";
import { createActor } from "./backend";

export interface AppActor {
  getRecords: (a: null, b: null) => Promise<Array<{
    name: string;
    whatsapp: string;
    city: string;
    occupation: string;
    invitedBy: string;
    timestamp: bigint;
  }>>;
  recordDownload: (
    name: string,
    whatsapp: string,
    city: string,
    occupation: string,
    invitedBy: string,
    timestamp: bigint,
  ) => Promise<void>;
  addReferralCount: (referrer: string) => Promise<void>;
  getReferralCounts: () => Promise<Array<{ referrer: string; count: bigint }>>;
}

// Returns a best-effort actor; all backend calls in this app are fire-and-forget.
export async function createActorWithConfig(): Promise<AppActor> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actor = await _create(createActor as any).catch(() => null);
  if (!actor) {
    // Return a no-op stub when backend is unavailable
    return {
      getRecords: async () => [],
      recordDownload: async () => {},
      addReferralCount: async () => {},
      getReferralCounts: async () => [],
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return actor as unknown as AppActor;
}
