import { Session } from "@/entities/auth";
import { CustomSession } from "@/lib/authClient";

export function updateSession(session: Partial<Session>) {
  return <S extends CustomSession>(customSession?: S) =>
    (customSession
      ? { ...customSession, session: { ...customSession.session, ...session } }
      : customSession) as S;
}
