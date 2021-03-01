import produce, { createDraft, finishDraft } from "immer";
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
const API_URL = (isbn: string) =>
  `http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;
// example using async but by default produce suppor async
export async function addBookLegacy(state: State, isbn: string) {
  const draft = createDraft(state);
  const response = await fetch(API_URL(isbn), { mode: "cors" });

  const book = (await response.json())["ISBN:" + isbn];
  draft.gifts.push({
    id: isbn,
    description: book.title,
    image: book.cover.medium,
    reservedBy: undefined,
  });

  return finishDraft(draft);
}
// better approach split the logic one function who manage the async operation
// and other than update our state
export async function getBookDetails(isbn: string) {
  const response = await fetch(API_URL(isbn), { mode: "cors" });

  const book = (await response.json())["ISBN:" + isbn];
  return book;
}

export const addBook = produce((draft, book) => {
  draft.gifts.push({
    id: book.isbn,
    description: book.title,
    image: book.cover.medium,
    reservedBy: undefined,
  });
});
