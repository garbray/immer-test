export type User = {
  id: number;
  name: string;
};
export type Gift = {
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
