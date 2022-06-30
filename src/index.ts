import fetch from "cross-fetch";
import { DeclarativeSchema } from "../declarative";

export class Client {
  constructor(public readonly apiKey: string) {}

  async apply(schema: DeclarativeSchema) {
    const response = await fetch(
      "https://api.firstkindsoftware.com/v1/declarative",
      {
        method: "POST",
        headers: {
          "API-Key": this.apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(schema),
      }
    );
    if (response.ok) {
      return response;
    } else {
      throw new ClientError(response);
    }
  }

  applySync(schema: DeclarativeSchema) {
    (async () => {
      await this.apply(schema);
    })();
  }
}

export class ClientError extends Error {
  payload: Promise<string[]>;
  constructor(resp: Response) {
    super();
    this.payload = resp.json();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ClientError.prototype);
  }
}
