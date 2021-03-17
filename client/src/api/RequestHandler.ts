import AuthService from "./AuthService";

export default class RequestHandler {

  private static API_VERSION: string = "/api/v1";

  static handleError(error: any): void {
    console.log(error);
  }

  static get(path: string): Promise<Object> {
    return fetch(RequestHandler.API_VERSION + path + `?token=${AuthService.instance.token}`)
      .then(response => response.json())
      .catch(RequestHandler.handleError);
  }

  static post(path: string, event: React.FormEvent<HTMLFormElement>) {
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("token", AuthService.instance.token);

    return fetch(RequestHandler.API_VERSION + path, {
      method: 'POST',
      body: formData
    })
  }

  public static delete(path: string, formData: FormData) {
    formData.append("token", AuthService.instance.token);
    return fetch(RequestHandler.API_VERSION + path, {
      method: 'POST',
      body: formData,
    })
  }

}