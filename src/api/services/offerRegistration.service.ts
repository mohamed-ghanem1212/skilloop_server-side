import { HydratedDocument } from "mongoose";
import { offerRegistrationSchema } from "../../db/models/offerRegistration";
import { Registeration } from "../../types/offerRegister.types";
import { skillOfferSchema } from "../../db/models/Skills";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import { userSchema } from "../../db/models/User";
import { statusEnumProposal } from "../../types/offerRegister.types";
import { getUserById } from "./User.service";
import { statusEnumOffer } from "../../types/skills.types";
import { createChatRoom } from "./chatRoom.service";

export const createOfferRegister = async (
  offerRegister: Registeration,
): Promise<HydratedDocument<Registeration>> => {
  const findOffer = await skillOfferSchema.findById(offerRegister.offerId);
  if (!findOffer) {
    throw new NotFoundError("This offer is not found");
  }
  if (findOffer.status === "Matched" || findOffer.status === "Closed") {
    throw new BadRequestError("Sorry this proposal is no longer available");
  }
  const findProvider = await userSchema.findById(offerRegister.providerId);
  if (!findProvider) {
    throw new NotFoundError("please create account or sing in");
  }
  if (findProvider.id == findOffer.userId) {
    throw new BadRequestError("Sorry you can't register your own offer");
  }
  const register = await offerRegistrationSchema.find({
    providerId: offerRegister.providerId,
    offerId: offerRegister.offerId,
  });
  if (register.length !== 0) {
    throw new BadRequestError("you can't register on the same offer");
  }

  const registerOffer = await offerRegistrationSchema.create({
    description: offerRegister.description,
    offerId: offerRegister.offerId,
    ownerId: findOffer.userId,
    providerId: offerRegister.providerId,
  });
  await registerOffer.populate([
    {
      path: "offerId",
      populate: {
        path: "userId",
        select: "username email profilePicture role",
      },
    },
    { path: "providerId", select: "username email profilePicture role" },
  ]);
  return registerOffer;
};

export const getOfferRegisterById = async (
  id: string,
): Promise<HydratedDocument<Registeration>> => {
  const findRegister = await offerRegistrationSchema.findById(id);
  if (!findRegister) {
    throw new NotFoundError("Registration not found");
  }
  await findRegister.populate<{ offerId: { userId: string } }>({
    path: "offerId",
    select: "userId",
    populate: {
      path: "userId",
      select: "username profilePicture",
    },
  });
  return findRegister;
};
export const getAllOfferRegisters = async (): Promise<
  HydratedDocument<Registeration>[]
> => {
  const findRegisters = await offerRegistrationSchema.find();
  if (!findRegisters) {
    throw new BadRequestError("Registrations are empty");
  }
  return findRegisters;
};

export const updateRegisteration = async (id: string) => {
  const register = await getOfferRegisterById(id);
  if (register.status?.toString() === "Accepted") {
    throw new BadRequestError("This proposal has been accepted before");
  }
  register.status = statusEnumProposal.Accepted;

  const findOffer = await skillOfferSchema.findByIdAndUpdate(
    register.offerId,
    { status: statusEnumOffer.Matched },
    { new: true },
  );
  if (!findOffer) {
    throw new BadRequestError("Can't update the offerStatus");
  }
  await register.save();
  let chatRoom;
  if (register) {
    await createChatRoom(register.providerId, register.ownerId!);
  }

  return { register };
};

export const getUserAllRegister = async (userId: string) => {
  await getUserById(userId);
  const getRegisters = await offerRegistrationSchema
    .find({ ownerId: userId })
    .populate([
      {
        path: "offerId",
        select: "wantSkill level",
      },
      {
        path: "providerId",
        select: "username email profilePicture role title",
      },
      { path: "ownerId", select: "username email profilePicture role title" },
    ]);
  if (!getRegisters) {
    throw new BadRequestError("No proposals");
  }
  return getRegisters;
};
