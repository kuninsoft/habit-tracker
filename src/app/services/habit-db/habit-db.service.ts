import { Injectable } from '@angular/core';
import { HabitEntry } from './habit';

@Injectable({
  providedIn: 'root'
})
export class HabitDbService {
  private readonly BY_DATE_KEY = "by_date";

  private db!: IDBDatabase;
  private dbReady: Promise<void>;

  constructor() {
    this.dbReady = new Promise((resolve, reject) => {
      const request = indexedDB.open("HabitDatabase", 2);

      request.onerror = (event) => {
        console.error("An error occurred initializing DB");
        console.error(event);

        reject(event);
      };

      request.onupgradeneeded = () => {
        const db = request.result;

        if (db.objectStoreNames.contains("habits")) return;

        const store = db.createObjectStore("habits", { keyPath: "id", autoIncrement: true });
        store.createIndex(this.BY_DATE_KEY, ["date"], { unique: true });
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
    })
  }

  async getAllHabits() {
    const result = this.transaction<HabitEntry[]>((store) => store.getAll() as IDBRequest<HabitEntry[]>);

    return result ?? [];
  }

  async getHabitData(date: Date) {
    const dateISO = date.toISOString().split("T")[0];

    return this.transaction<HabitEntry | undefined>((store) => store.index(this.BY_DATE_KEY).get([dateISO]));
  }

  async updateHabitData(updatedHabit: HabitEntry) {
    const existing = await this.getHabitData(new Date(updatedHabit.date));

    return this.transaction((store) => {
      const habitToSave = existing ? {...existing, ...updatedHabit} : updatedHabit;

      return store.put(habitToSave);
    })
  }

  async transaction<T>(fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T | undefined> {
    await this.dbReady;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("habits", "readwrite");
      const store = tx.objectStore("habits");
      const req = fn(store);
      req.onsuccess = () => resolve(req.result ?? undefined);
      req.onerror = () => reject(req.error);
    });
  }
}
