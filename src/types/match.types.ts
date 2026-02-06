import { statusEnumOffer } from "./skills.types";

export interface Match {
  authorId: string;
  providerId: string;
  offerId: string;
  status?: statusEnumOffer;
}
