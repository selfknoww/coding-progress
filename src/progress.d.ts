export const DEFAULT_PROGRESS: "TODO";
export const PROGRESS_STORAGE_KEY: string;
export const PROGRESS_OPTIONS: Array<{
  key: string;
  label: string;
  color: string;
}>;
export function parseProblemId(title: string): string;
export function normalizeProgress(progress: unknown): Record<string, string>;
export function serializeProgress(progress: Record<string, string>): string;
export function importProgress(json: string): Record<string, string>;
export function exportProgress(
  progress: Record<string, string>,
  urlApi?: typeof URL
): { filename: string; url: string };
export function getProgressOption(key?: string): {
  key: string;
  label: string;
  color: string;
};
