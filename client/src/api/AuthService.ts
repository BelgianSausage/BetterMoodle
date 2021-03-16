import RequestHandler from "./RequestHandler";

interface AuthResponse {
  token: string;
  error: string;
  validSignIn: boolean;
}

interface SignInCredentials {
  error: string;
  isAuthenticated: boolean;
}


export default class AuthService {

  public static instance: AuthService = new AuthService();

  private _token: string | null = null;
  private _isAuthenticated: boolean = false;

  get token(): string {
    return this._token ? this._token : "";
  }

  isAuthenticated(): boolean {
    if (!this._isAuthenticated) {
      if (localStorage.getItem("userToken") != null) {
        this._token = localStorage.getItem("userToken");
        this._isAuthenticated = true;
      }
    }

    return this._isAuthenticated;
  }

  async signIn(event: React.FormEvent<HTMLFormElement>): Promise<SignInCredentials> {
    const credentials: SignInCredentials = {
      error: "",
      isAuthenticated: false,
    };

    try {
      const response = await RequestHandler.post("/signin", event);
      const json = await response.json();
      const auth = json as AuthResponse;
      if (auth != null) {
        if (auth.validSignIn) {
          this._token = auth.token;
          this._isAuthenticated = true;
          credentials.isAuthenticated = true;
          localStorage.setItem("userToken", auth.token);
        } else if(auth.error) {
          credentials.error = auth.error;
        }
      }
    }

    catch (error) {
      console.log(error);
    }
    
    finally {
      return credentials;
    }

  }

  async signOut() {
    this._token = null;
    this._isAuthenticated = false;
    localStorage.removeItem("userToken");
  }

}