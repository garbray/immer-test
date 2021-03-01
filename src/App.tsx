import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { State } from "./types";
import { addBook, addGift, getBookDetails, toggleReservation } from "./context";
import { initialState } from "./context/mockData";
import GiftItem from "./components/GiftItem";

const App: React.FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { users, gifts, currentUser } = state;

  const handleAdd = () => {
    const description = prompt("gift to add");
    if (description) {
      setState(
        (state): State =>
          addGift(
            state,
            uuidv4(),
            description,
            "https://picsum.photos/200?q=" + Math.random()
          )
      );
    }
  };

  const handleReserve = useCallback((id: string) => {
    setState((state) => toggleReservation(state, id));
  }, []);

  const handleReset = () => {
    setState(() => {
      return initialState;
    });
  };

  const handleAddBook = async () => {
    const isbn = prompt("Book ISBN code", "0201558025");
    if (isbn) {
      const details = await getBookDetails(isbn);
      setState((state) => addBook(state, details));
    }
  };
  return (
    <div className="App">
      <div className="header">
        <h1>Hi, {currentUser.name}</h1>
        <div className="actions">
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleAddBook}>Add book</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="gifts">
          {gifts.map((gift) => (
            <GiftItem
              key={gift.id}
              gift={gift}
              users={users}
              currentUser={currentUser}
              onReserved={handleReserve}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
