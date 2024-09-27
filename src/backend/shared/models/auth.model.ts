import { Session } from "next-auth";

export type ISession =
  | ({
      user: {
        id: string;
        permissions: string[];
      };
    } & Session)
  | null;
