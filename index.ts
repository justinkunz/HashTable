export {};

type KeyValuePair = [key: string, value: any];
type HashIndex = KeyValuePair[] | undefined;

class HashTable {
  #tableSize: number = 0;
  #table: HashIndex[] = [];
  #capacityLimit: number = 0;
  #elementCount: number = 0;

  constructor() {
    this.#tableSize = 10;
    this.#table = Array(this.#tableSize);
    this.#capacityLimit = 0.8;
    this.#elementCount = 0;
  }

  #setItem(key: string, value: any, table: HashIndex[]) {
    const hash = this.#hash(key);
    if (!table[hash]) table[hash] = [];
    table[hash]?.push([key, value]);
  }

  #updateItem(key: string, value: any): void {
    const hash = this.#hash(key);
    if (!this.#table[hash]) return;

    const index = this.#table[hash]?.findIndex(([k]) => k === key);
    if (index === -1) return;

    if (this.#table[hash]?.[index]) this.#table[hash][index][1] = value;
  }

  #resizeTable() {
    this.#tableSize *= 2;
    const resizedTable = Array(this.#tableSize);
    this.#table.forEach((element) => {
      if (!element) return;
      for (let [key, value] of element) {
        this.#setItem(key, value, resizedTable);
      }
    });
    this.#table = resizedTable;
  }

  #getLoadFactor() {
    return this.#elementCount / this.#tableSize;
  }

  #hash(key: string) {
    let result = 17;
    for (let i = 0; i < key.length; i++) {
      result = (result * key.charCodeAt(i)) % this.#tableSize;
    }
    return result;
  }

  has(key: string) {
    const hash = this.#hash(key);
    if (!this.#table[hash]) return false;

    const element = this.#table[hash]?.find(([k]) => k === key);
    return !!element;
  }

  getItem(key: string) {
    const hash = this.#hash(key);
    if (!this.#table[hash]) return null;

    const element = this.#table[hash]?.find(([k]) => k === key);
    if (!element) return null;

    return element[1];
  }

  setItem(key: string, value: any) {
    if (this.has(key)) return this.#updateItem(key, value);
    this.#elementCount++;
    if (this.#getLoadFactor() > this.#capacityLimit) this.#resizeTable();
    this.#setItem(key, value, this.#table);
  }
}

export default HashTable;
