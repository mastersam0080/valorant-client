// Main class for interacting with the VALORANT API

import { local } from "./reader.js";
import { HTTP } from "./http.js";

import type { Request } from "./http.js";

class Client {
  // Values needed to connect to VALORANT
  _region: string | undefined;
  _shard: string | undefined;
  _puuid: string | undefined;
  _port: string | undefined;
  _password: string | undefined;
  _protocol: string | undefined;
  _token: string | undefined;
  _jwt: string | undefined;
  _version: string | undefined;

  // Function to send requests to VALORANT services and endpoints
  request: Request;

  constructor() {
    this.request = new HTTP(this).request;
  }

  /**
   * Reads values from the local log and lock files and gets the remaining
   * values from local and external APIs.
   *
   * Stores all values and connects to VALORANT.
   */
  async connect() {
    // Read values from the lockfile and ShooterGame.log
    const values = await local();
    this._region = values.region;
    this._shard = values.shard;
    this._port = values.port;
    this._password = values.password;
    this._protocol = values.protocol;
  }
}

export { Client };
