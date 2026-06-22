export {};

declare global {
  interface Array<T> {
    getLength(): number;
  }
  interface Object {
    hi: string;
  }
}
