export default class RequestHandler {

  private static API_VERSION: string = "/api/v1";

  private static handleError(error: any): void {
    console.log(error);
  }

  public static get(path: string): Promise<Object> {
    return (
      fetch(RequestHandler.API_VERSION + path)
        .then(response => response.json())
        .catch(RequestHandler.handleError)
    );
  }

}