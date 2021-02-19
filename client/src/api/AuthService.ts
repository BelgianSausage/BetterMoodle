export default class AuthService {

  public static instance: AuthService = new AuthService();

  private _isAuthenticated: boolean = false;

  public authenticate() {
    this._isAuthenticated = true;
    localStorage.setItem("userToken", "TOKEN");
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem("userToken") != null) return true;
    return this._isAuthenticated;
  }

  public async signOut() {
    this._isAuthenticated = false;
    localStorage.removeItem("userToken");
  }

}