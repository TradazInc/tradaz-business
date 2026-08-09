import { Session } from "@/server/entities/session";

export function updateSession(session: Partial<Session["session"]>) {
  return <T extends Session>(current?: T) =>
    (current
      ? { ...current, session: { ...current.session, ...session } }
      : current) as T;
}
