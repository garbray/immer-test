import { addGift, State, toggleReservation } from "..";
import { initialState } from "../mockData";

describe("Reserving an unreserved gift", () => {
  const nextState: State = addGift(
    initialState,
    "coffee_mug",
    "mug",
    "coffee mug"
  );

  test("added a gift to the collection", () => {
    expect(nextState.gifts.length).toBe(3);
  });
  test("didn't modify the original state", () => {
    expect(initialState.gifts.length).toBe(2);
  });
});

describe("Reserving an unreserved", () => {
  const nextState: State = toggleReservation(initialState, "immer_license");
  test("correctly stores reservedBy", () => {
    expect(nextState.gifts[0].reservedBy).toBe(1);
  });

  test(`didn't modify the original state`, () => {
    expect(initialState.gifts[0].reservedBy).toBe(undefined);
  });
});

describe("Reserving an already reserved gift", () => {
  const nextState: State = toggleReservation(
    initialState,
    "egghead_subscription"
  );

  test("preserves stored reserved by", () => {
    expect(nextState.gifts[1].reservedBy).toBe(2);
  });
});
