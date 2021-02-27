import { allUsers } from "../helpers";

export const initialState = {
  users: allUsers,
  currentUser: {
    id: 1,
    name: "Main user",
  },
  gifts: [
    {
      id: "immer_license",
      description: "Immer licence",
      image:
        "https://raw.githubusercontent.com/immerjs/immer/master/images/immer-logo.png",
      reservedBy: undefined,
    },
    {
      id: "egghead_subscription",
      description: "Egghead subscription",
      image:
        "https://raw.githubusercontent.com/immerjs/immer/master/images/immer-logo.png",
      reservedBy: 2,
    },
  ],
};
