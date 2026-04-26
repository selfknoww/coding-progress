import { useEffect, useSyncExternalStore } from "react";
import { ProgressKeyType } from "./useProgressOption";

const storageKeyPrefix = "lc-rating-zen-progress-";
const historyStorageKey = "lc-coding-progress-history";
const updatedAtStorageKey = "lc-coding-progress-updated-at";
const getStorageKey = (questID: string) => `${storageKeyPrefix}${questID}`;

type QuestProgressType = Record<string, ProgressKeyType>;
export type ProgressUpdatedAtType = Record<string, string>;

const isBrowser = () => typeof window !== "undefined";

const getQuestProgressKeys = () => {
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith(storageKeyPrefix)
  );
  return keys;
};

interface StoreType {
  allProgress: QuestProgressType;
  progressUpdatedAt: ProgressUpdatedAtType;
  setAllProgress: (newProgress: QuestProgressType) => void;
  setProgressUpdatedAt: (
    updatedAt: ProgressUpdatedAtType,
    persistUpdatedAt?: boolean
  ) => void;
  updateProgress: (questID: string, progress: ProgressKeyType) => void;
  removeProgress: (questID: string) => void;

  listeners: Set<() => void>;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => QuestProgressType;
  notifyListeners: () => void;
}

class Store implements StoreType {
  allProgress: QuestProgressType;
  progressUpdatedAt: ProgressUpdatedAtType;
  listeners: Set<() => void>;

  constructor() {
    this.allProgress = {};
    this.progressUpdatedAt = {};
    this.listeners = new Set();

    if (isBrowser()) {
      const keys = getQuestProgressKeys();
      keys.forEach((key) => {
        const value = localStorage.getItem(key);
        const questID = key.replace(storageKeyPrefix, "");
        if (value) {
          this.allProgress[questID] = value as ProgressKeyType;
        }
      });

      try {
        const rawUpdatedAt = localStorage.getItem(updatedAtStorageKey);
        this.progressUpdatedAt = rawUpdatedAt ? JSON.parse(rawUpdatedAt) : {};
      } catch {
        this.progressUpdatedAt = {};
      }

      if (Object.keys(this.progressUpdatedAt).length === 0) {
        try {
          const rawHistory = localStorage.getItem(historyStorageKey);
          const history = rawHistory ? JSON.parse(rawHistory) : {};
          this.progressUpdatedAt = Object.entries(history).reduce(
            (acc: ProgressUpdatedAtType, [questID, events]) => {
              if (Array.isArray(events) && events.length > 0) {
                const latest = events[events.length - 1] as { at?: unknown };
                if (typeof latest.at === "string") {
                  acc[questID] = latest.at;
                }
              }
              return acc;
            },
            {}
          );
        } catch {
          this.progressUpdatedAt = {};
        }
      }

      const now = new Date().toISOString();
      let didBackfill = false;
      Object.keys(this.allProgress).forEach((questID) => {
        if (!this.progressUpdatedAt[questID]) {
          this.progressUpdatedAt[questID] = now;
          didBackfill = true;
        }
      });
      if (didBackfill || Object.keys(this.progressUpdatedAt).length > 0) {
        this.persistUpdatedAt();
      }
    }
  }

  persistUpdatedAt = () => {
    if (isBrowser()) {
      localStorage.setItem(
        updatedAtStorageKey,
        JSON.stringify(this.progressUpdatedAt)
      );
    }
  };

  setAllProgress = (newProgress: QuestProgressType) => {
    const now = new Date().toISOString();
    if (isBrowser()) {
      Object.entries(newProgress).forEach(([questID, progress]) => {
        const key = getStorageKey(questID);
        localStorage.setItem(key, progress);
      });
    }

    this.progressUpdatedAt = Object.keys(newProgress).reduce(
      (acc: ProgressUpdatedAtType, questID) => {
        acc[questID] = this.progressUpdatedAt[questID] || now;
        return acc;
      },
      { ...this.progressUpdatedAt }
    );
    this.persistUpdatedAt();
    this.allProgress = { ...this.allProgress, ...newProgress };
    this.notifyListeners();
  };

  setProgressUpdatedAt = (
    updatedAt: ProgressUpdatedAtType,
    persistUpdatedAt = true
  ) => {
    this.progressUpdatedAt = updatedAt;
    if (persistUpdatedAt) {
      this.persistUpdatedAt();
    }
    this.allProgress = { ...this.allProgress };
    this.notifyListeners();
  };

  updateProgress = (questID: string, progress: ProgressKeyType) => {
    if (isBrowser()) {
      const key = getStorageKey(questID);
      localStorage.setItem(key, progress);
    }

    this.progressUpdatedAt = {
      ...this.progressUpdatedAt,
      [questID]: new Date().toISOString(),
    };
    this.persistUpdatedAt();
    this.allProgress = { ...this.allProgress, [questID]: progress };
    this.notifyListeners();
  };

  removeProgress = (questID: string) => {
    if (isBrowser()) {
      const key = getStorageKey(questID);
      localStorage.removeItem(key);
    }

    const { [questID]: removedAt, ...updatedAtRest } = this.progressUpdatedAt;
    this.progressUpdatedAt = updatedAtRest;
    this.persistUpdatedAt();
    const { [questID]: _, ...rest } = this.allProgress;
    this.allProgress = rest;
    this.notifyListeners();
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.allProgress;

  notifyListeners = () => {
    this.listeners.forEach((listener) => listener());
  };
}

const store = new Store();

function useQuestProgress(): {
  allProgress: QuestProgressType;
  progressUpdatedAt: ProgressUpdatedAtType;
  setAllProgress: (newProgress: QuestProgressType) => void;
  setProgressUpdatedAt: (updatedAt: ProgressUpdatedAtType) => void;
  updateProgress: (questID: string, progress: ProgressKeyType) => void;
  removeProgress: (questID: string) => void;
} {
  const allProgress = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => ({})
  );

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key?.startsWith(storageKeyPrefix) &&
        e.storageArea === localStorage
      ) {
        const questID = e.key.replace(storageKeyPrefix, "");
        const newProgress = e.newValue as ProgressKeyType;
        if (newProgress) {
          store.allProgress = { ...store.allProgress, [questID]: newProgress };
          store.notifyListeners();
        } else {
          const { [questID]: _, ...rest } = store.allProgress;
          store.allProgress = rest;
          store.notifyListeners();
        }
      } else if (
        e.key === updatedAtStorageKey &&
        e.storageArea === localStorage
      ) {
        try {
          store.setProgressUpdatedAt(
            e.newValue ? JSON.parse(e.newValue) : {},
            false
          );
        } catch {
          store.setProgressUpdatedAt({}, false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    allProgress,
    progressUpdatedAt: store.progressUpdatedAt,
    setAllProgress: store.setAllProgress.bind(store),
    setProgressUpdatedAt: store.setProgressUpdatedAt.bind(store),
    updateProgress: store.updateProgress.bind(store),
    removeProgress: store.removeProgress.bind(store),
  };
}

export default useQuestProgress;
