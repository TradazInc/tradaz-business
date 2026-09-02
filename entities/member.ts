import { authClient } from "@/lib/authClient";

export type Member = typeof authClient.$Infer.Member & {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null | undefined;
  };
};
