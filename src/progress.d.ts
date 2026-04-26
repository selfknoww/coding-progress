export const DEFAULT_PROGRESS: "TODO";
export const PROGRESS_STORAGE_KEY: string;
export const PROGRESS_HISTORY_STORAGE_KEY: string;
export const PROGRESS_UPDATED_AT_STORAGE_KEY: string;
export const PROGRESS_OPTIONS: Array<{
  key: string;
  label: string;
  color: string;
}>;
export function parseProblemId(title: string): string;
export function normalizeProgress(progress: unknown): Record<string, string>;
export function normalizeProgressHistory(
  history: unknown
): Record<string, Array<{ from: string; to: string; at: string }>>;
export function normalizeProgressUpdatedAt(
  updatedAt: unknown
): Record<string, string>;
export function updatedAtFromHistory(
  history: unknown
): Record<string, string>;
export function serializeProgress(
  progress: Record<string, string>,
  updatedAt?: Record<string, string>
): string;
export function importProgress(json: string): Record<string, string>;
export function importProgressUpdatedAt(json: string): Record<string, string>;
export function importProgressHistory(
  json: string
): Record<string, Array<{ from: string; to: string; at: string }>>;
export function exportProgress(
  progress: Record<string, string>,
  urlApi?: typeof URL,
  updatedAt?: Record<string, string>
): { filename: string; url: string };
export function getProgressOption(key?: string): {
  key: string;
  label: string;
  color: string;
};
