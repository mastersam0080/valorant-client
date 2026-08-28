import https from "node:https";

import axios from "axios";

import { base, headers } from "./service.js";

import type { Client } from "./client.js";
import type { Service } from "./service.js";

// Duh
type Method = "GET" | "POST" | "PUT" | "DELETE";

// Method defaults to GET; data is only needed for POST and PUT
type Request = <T>(
  type: Service,
  endpoint: string,
  method?: Method,
  data?: unknown,
) => Promise<T>;

// HTTPS agent with no certificate verification
const insecure = new https.Agent({ rejectUnauthorized: false });

/**
 * Lets you send requests to any Riot service or VALORANT endpoint using the
 * authentication values stored by a connected Client.
 */
class HTTP {
  constructor(private readonly client: Client) {}

  /**
   * Sends a request to a Riot service or VALORANT endpoint.
   *
   * Automatically gets the correct service URL and authentication headers.
   *
   * @param type Service the endpoint belongs to
   * @param endpoint Endpoint to send the request to
   * @param method HTTP method to use
   * @param data Data to send in the request body
   */
  request: Request = async (type, endpoint, method = "GET", data) => {
    // Disable certificate verification for local requests
    const agent = type === "local" ? insecure : undefined;

    const { _region, _shard, _port, _password, _token, _jwt, _version } =
      this.client;

    // Throw an error if the client is not connected
    if (!_port)
      throw new Error("Client is not connected. Call connect() first.");

    const config = {
      method,
      url: base(type, _region, _shard, _port) + endpoint,
      headers: headers(type, _password, _token, _jwt, _version),
      data,
      httpsAgent: agent,
    };

    const response = await axios.request(config);

    return response.data;
  };
}

export type { Request };
export { HTTP };
