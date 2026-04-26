"use client";

import {
  DEFAULT_PROGRESS,
  importProgress,
  importProgressUpdatedAt,
  serializeProgress,
} from "@/src/progress.mjs";
import { useQuestProgress } from "@hooks/useProgress";
import { useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";

export default function ProgressBackup() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    allProgress,
    progressUpdatedAt,
    setAllProgress,
    setProgressUpdatedAt,
    removeProgress,
  } = useQuestProgress();
  const [message, setMessage] = useState<string>("");
  const [variant, setVariant] = useState<"success" | "danger" | "info">(
    "info"
  );

  const showMessage = (
    nextMessage: string,
    nextVariant: "success" | "danger" | "info"
  ) => {
    setMessage(nextMessage);
    setVariant(nextVariant);
  };

  const handleExport = () => {
    const content = serializeProgress(allProgress, progressUpdatedAt);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().slice(0, 10);
    const link = document.createElement("a");

    link.href = url;
    link.download = `lc-coding-progress-${date}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showMessage("进度 JSON 已导出。", "success");
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const progress = importProgress(text);
      const updatedAt = importProgressUpdatedAt(text);

      Object.keys(allProgress).forEach((problemId) => {
        removeProgress(problemId);
      });
      setAllProgress(progress);
      if (Object.keys(updatedAt).length > 0) {
        setProgressUpdatedAt(updatedAt);
      }
      showMessage(
        `已导入 ${Object.keys(progress).length} 条非待做进度。`,
        "success"
      );
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "导入失败。",
        "danger"
      );
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const activeCount = Object.values(allProgress).filter(
    (value) => value !== DEFAULT_PROGRESS
  ).length;

  return (
    <div className="progress-tools">
      <span className="text-body-secondary small">已记录 {activeCount} 题</span>
      <Button size="sm" variant="outline-primary" onClick={handleExport}>
        导出进度
      </Button>
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={() => inputRef.current?.click()}
      >
        导入进度
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        className="d-none"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleImport(file);
          }
        }}
      />
      {message && (
        <Alert className="m-0 py-1 px-2 small" variant={variant}>
          {message}
        </Alert>
      )}
    </div>
  );
}
