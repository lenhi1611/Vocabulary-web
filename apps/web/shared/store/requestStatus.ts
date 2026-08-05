export const RequestStatus = {
  Idle: "idle",
  Loading: "loading",
  Succeeded: "succeeded",
  Failed: "failed",
} as const;

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];

export type RequestState = {
  status: RequestStatus;
  error: string | null;
};

export const initialRequestState: RequestState = {
  status: RequestStatus.Idle,
  error: null,
};
