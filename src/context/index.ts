import produce from "immer";
import { State } from "../types";

export const addGift = produce(
  (draft: State, id: string, description: string, image: string) => {
    draft.gifts.push({
      id,
      description,
      image,
      reservedBy: undefined,
    });
  }
);

export const toggleReservation = produce((draft: State, giftId: string) => {
  const gift = draft.gifts.find((gift) => gift.id === giftId);
  if (gift) {
    gift.reservedBy =
      gift.reservedBy === undefined
        ? draft.currentUser.id
        : gift.reservedBy === draft.currentUser.id
        ? undefined
        : gift.reservedBy;
  }
});

// better produce using curry functions
// produce(state, recipe) => nextState
// produce(state) => (state) => nextState
// defining them around the draft
