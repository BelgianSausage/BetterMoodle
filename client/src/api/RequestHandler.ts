import { fakeLessons } from "../data/lessons";
import { fakeModules } from "../data/modules";
import { fakeNotes } from "../data/notes";

interface LocalResources {
  [key: string]: Object;
}

const localResources: LocalResources = {
  "/notes/all": fakeNotes,
  "/modules/all": fakeModules,
  "/modules/databases": fakeModules[0],
  "/modules/fundamentals-of-machine-learning": fakeModules[1],
  "/modules/comparative-programming-languages": fakeModules[2],
  "/modules/integrated-group-based-project": fakeModules[3],
  "/modules/artificial-intelligence": fakeModules[4],
  "/lessons/lesson-1-example-example": fakeLessons[0],
  "/lessons/lesson-2-example-example": fakeLessons[1],
  "/lessons/lesson-3-example-example": fakeLessons[2],
  "/lessons/lesson-4-example-example": fakeLessons[3],
  "/lessons/lesson-5-example-example": fakeLessons[4],
}

export default class RequestHandler {

  private static API_VERSION: string = "/api/v1";
  
  private static useLocalLookup = true;

  private static handleError(error: any): void {
    console.log(error);
  }

  private static getResource(path: string): Promise<Object> {
    return (
      fetch(RequestHandler.API_VERSION + path)
        .then(response => response.json())
        .catch(RequestHandler.handleError)
    );
  }

  private static getLocalResource(path: string): Promise<Object> {
    return new Promise<Object>((resolve, reject) => {
      return localResources.hasOwnProperty(path) 
        ? resolve(localResources[path]) 
        : resolve({ error: "Could not find the requested resource" });
    })
  }

  public static get(path: string): Promise<Object> {
    return RequestHandler.useLocalLookup 
      ? RequestHandler.getLocalResource(path) 
      : RequestHandler.getResource(path);
  }

}