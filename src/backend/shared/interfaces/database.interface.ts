export interface IDatabase<T> {
  adapter: T;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
