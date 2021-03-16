import AuthService from "./AuthService";

const data = require('./data.json');

interface LocalResources {
  [key: string]: Object;
}

const localResources: LocalResources = {
  "/notes/all": data.notes,
  "/modules/all": data.modules,
  "/modules/databases": data.modules[0],
  "/modules/fundamentals-of-machine-learning": data.modules[1],
  "/modules/comparative-programming-languages": data.modules[2],
  "/modules/integrated-group-based-project": data.modules[3],
  "/modules/artificial-intelligence": data.modules[4],
  "/lessons/lesson-1-example-example": data.lessons[0],
  "/lessons/lesson-2-example-example": data.lessons[1],
  "/lessons/lesson-3-example-example": data.lessons[2],
  "/lessons/lesson-4-example-example": data.lessons[3],
  "/lessons/lesson-5-example-example": data.lessons[4],
}

export default class RequestHandler {

  private static API_VERSION: string = "/api/v1";

  private static useLocalLookup = false;

  private static handleError(error: any): void {
    console.log(error);
  }

  private static getResource(path: string): Promise<Object> {
    return fetch(RequestHandler.API_VERSION + path)
      .then(response => response.json())
      .catch(RequestHandler.handleError);
  }

  private static getLocalResource(path: string): Promise<Object> {
    return new Promise<Object>((resolve, reject) => {
      return localResources.hasOwnProperty(path) ? resolve(localResources[path]) : resolve({ error: "404" });
    })
  }

  public static get(path: string): Promise<Object> {
    return RequestHandler.useLocalLookup ? RequestHandler.getLocalResource(path) : RequestHandler.getResource(path);
  }

  public static post(path: string, event: React.FormEvent<HTMLFormElement>) {
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("token", AuthService.instance.token);

    return fetch(RequestHandler.API_VERSION + path, {
      method: 'POST',
      body: formData
    })
  }

}