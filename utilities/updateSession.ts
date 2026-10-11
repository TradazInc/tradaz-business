import { Session } from "@/schema/auth";
import { CustomSession } from "@/schema/session";

export function updateSession(session: Partial<Session>) {
  return <S extends CustomSession>(prevSession?: S, newSession?: S) => {
    const customSession = newSession ?? prevSession;
    return (
      customSession
        ? {
            ...customSession,
            session: { ...customSession.session, ...session },
          }
        : customSession
    ) as S;
  };
}
