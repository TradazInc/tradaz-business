import { CustomSession, Session } from "@/entities/session";

export function updateSession(session: Partial<Session>) {
  return <S extends CustomSession>(customSession?: S) =>
    (customSession
      ? { ...customSession, session: { ...customSession.session, ...session } }
      : customSession) as S;
}
