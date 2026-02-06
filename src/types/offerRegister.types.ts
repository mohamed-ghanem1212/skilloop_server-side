export interface Registeration {
  offerId: string;
  providerId: string;
  ownerId?: string;
  description: string;
  status?: statusEnumProposal;
}
export enum statusEnumProposal {
  Accepted = "Accepted",
  Rejected = "Rejected",
  Pending = "Pending",
}
