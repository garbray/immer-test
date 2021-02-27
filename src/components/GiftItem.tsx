import { memo } from "react";
import { Gift, User } from "../types";

const GiftItem = memo(function GiftItem({
  gift,
  users,
  currentUser,
  onReserved,
}: {
  gift: Gift;
  users: User[];
  currentUser: User;
  onReserved: (s: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "left",
      }}
    >
      <img
        style={{ width: "80px", height: "50px", objectFit: "cover" }}
        src={gift.image}
        alt={gift.description}
      />
      <div>
        <h2>{gift.description}</h2>
      </div>
      <div>
        {gift.reservedBy === undefined || gift.reservedBy === currentUser.id ? (
          <button
            onClick={() => {
              onReserved(gift.id);
            }}
          >
            {gift.reservedBy ? "Unreserve" : "Reserve"}
          </button>
        ) : (
          <span style={{ fontSize: "60px" }}>
            {users
              .filter((user) => user.id === gift.reservedBy)
              .map((user) => user.name)}
          </span>
        )}
      </div>
    </div>
  );
});

export default GiftItem;
