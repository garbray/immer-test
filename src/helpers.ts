export const allUsers = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐒",
  "🦇",
  "🦉",
  "🦅",
  "🦆",
  "🐦",
  "🐧",
  "🐔",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐜",
  "🐢",
].map((emoji, idx) => ({
  id: idx,
  name: emoji,
}));

export function getCurrentUser() {
  if (typeof sessionStorage === "undefined") return null;

  const currentUserId =
    sessionStorage.getItem("user") ||
    Math.round(Math.random() * 100).toString();

  sessionStorage.setItem("user", currentUserId);
  return allUsers[parseInt(currentUserId)];
}
