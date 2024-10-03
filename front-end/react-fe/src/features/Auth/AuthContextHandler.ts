import { AuthSession } from "./AuthSession";
import { AuthSignInPayload } from "./AuthSignInPayload";

export interface AuthContextHandler {
    signIn: (credentials: AuthSignInPayload) => Promise<void>;
    signOut: () => Promise<void>;
    userInfo: AuthSession;
}
