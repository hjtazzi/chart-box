export type TData = {
  time: Date;
  closePrice: string;
}

export type TAlertState = {
  severity: 'success' | 'error' | 'warning' | 'info';
  text: string;
}