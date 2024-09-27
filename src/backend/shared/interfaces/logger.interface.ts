export interface ILogger {
  info(title: string, data?: any): void;
  warn(title: string, data?: any): void;
  error(title: string, data?: any): void;
  success(title: string, data?: any): void;
}
