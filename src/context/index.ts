type User = {
  id: number;
  name: string;
};
type Gift = {
  id: string;
  description: string;
  image: string;
  reservedBy: number | undefined;
};

export type State = {
  users: User[];
  currentUser: User;
  gifts: Gift[];
};

export function addGift(
  state: State,
  id: string,
  description: string,
  image: string
) {
  return {
    ...state,
    gifts: [
      ...state.gifts,
      {
        id,
        description,
        image,
        reservedBy: undefined,
      },
    ],
  };
}

export function toggleReservation(state: State, giftId: string) {
  return {
    ...state,
    gifts: state.gifts.map((gift) => {
      if (gift.id !== giftId) return gift;
      return {
        ...gift,
        reservedBy:
          gift.reservedBy === undefined
            ? state.currentUser.id
            : gift.reservedBy === state.currentUser.id
            ? undefined
            : gift.reservedBy,
      };
    }),
  };
}
