
export enum ReceiptStatusEnum {
  Idle = "idle",
  Loading = "loading",
  AwaitingConfirmation = "awaitingConfirmation",
  Confirming = "confirming",
  Succeeded = "succeeded",
  Failed = "failed",
}

export enum ReceiptDocAction {
  Create = "create",
  Update = "update",
}