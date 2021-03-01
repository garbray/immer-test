import { addBook, addGift, getBookDetails, State, toggleReservation } from "..";
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

  test("does structurally share unchanged parts of the state tree", () => {
    expect(nextState).not.toBe(initialState);
    expect(nextState.gifts[0]).not.toBe(initialState.gifts[0]);
    expect(nextState.gifts[1]).toBe(initialState.gifts[1]);
  });

  test("can't accidentally modify the produced state", () => {
    expect(() => {
      nextState.gifts[1].reservedBy = undefined;
    }).toThrow();
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

  test("no new gift should be created", () => {
    expect(nextState.gifts[0]).toEqual(initialState.gifts[0]);
    expect(nextState.gifts[0]).toBe(initialState.gifts[0]);
    expect(nextState).toBe(initialState);
  });
});

describe("can add book async", () => {
  test("can add math book", async () => {
    const book = await getBookDetails("0201558025");
    const nextState = addBook(initialState, book);
    expect(nextState.gifts[2].description).toBe("Concrete mathematics");
  });

  test("Can add two books in parallel", async () => {
    const book1 = getBookDetails("9781598560169");
    const book2 = getBookDetails("0201558025");

    const nextState = addBook(addBook(initialState, await book2), await book1);
    expect(nextState.gifts.length).toBe(4);
  });
});
