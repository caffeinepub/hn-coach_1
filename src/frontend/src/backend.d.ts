import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DownloadRecord {
    occupation: string;
    city: string;
    name: string;
    invitedBy: string;
    whatsapp: string;
    timestamp: bigint;
}
export interface backendInterface {
    getCount(): Promise<bigint>;
    getRecords(from: bigint | null, take: bigint | null): Promise<Array<DownloadRecord>>;
    recordDownload(name: string, whatsapp: string, city: string, occupation: string, invitedBy: string, timestamp: bigint): Promise<bigint>;
}
