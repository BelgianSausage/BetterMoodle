export default class AuthService {

  public static instance: AuthService = new AuthService();

  private _id: number | null = 0;
  private _token: string | null = null;
  private _isAuthenticated: boolean = false;

  public authenticate() {
    this._id = 0;
    this._token = "TOKEN";
    this._isAuthenticated = true;
    localStorage.setItem("userToken", "TOKEN");
  }

  public isSelf(id: number): boolean {
    return this._id === id;
  }

  public isAuthenticated(): boolean {
    return (localStorage.getItem("userToken") != null) ? true : this._isAuthenticated;
  }

  public async signOut() {
    this._id = null;
    this._token = null;
    this._isAuthenticated = false;
    localStorage.removeItem("userToken");
  }

}