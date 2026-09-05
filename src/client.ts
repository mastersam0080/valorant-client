// Main class for interacting with the VALORANT API

import { Contract } from "./endpoints/contract.js";
import { Game } from "./endpoints/game.js";
import { Loadout } from "./endpoints/loadout.js";
import { Party } from "./endpoints/party.js";
import { Pregame } from "./endpoints/pregame.js";
import { Pvp } from "./endpoints/pvp.js";
import { Store } from "./endpoints/store.js";

import HTTP from "./http.js";
import { local } from "./reader.js";

import type { EntitlementsTokenResponse } from "valorant-api-types";
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

  // Classes that implement VALORANT endpoints
  pregame: Pregame;
  game: Game;
  loadout: Loadout;
  contract: Contract;
  store: Store;
  party: Party;
  pvp: Pvp;

  constructor() {
    this.request = new HTTP(this).request;
    this.pregame = new Pregame(this);
    this.game = new Game(this);
    this.loadout = new Loadout(this);
    this.contract = new Contract(this);
    this.store = new Store(this);
    this.party = new Party(this);
    this.pvp = new Pvp(this);
  }

  /**
   * Reads values from local log and lock files and gets the remaining values from
   * local and external APIs before storing them and connecting to VALORANT.
   */
  async connect() {
    // Read values from the lockfile and ShooterGame.log
    const values = await local();
    this._region = values.region;
    this._shard = values.shard;
    this._port = values.port;
    this._password = values.password;
    this._protocol = values.protocol;

    // Fetch missing values from local and external APIs
    await Promise.all([this.authenticate(), this.version()]);
  }

  /**
   * Fetches the client version from a third-party API.
   *
   * Documented at https://dash.valorant-api.com/endpoints/version
   */
  private async version() {
    const response = await fetch("https://valorant-api.com/v1/version");

    // Unlikely to fail
    if (!response.ok) throw new Error("Failed to fetch the client version.");

    const { data }: any = await response.json();

    this._version = data.riotClientVersion;
  }

  /**
   * Fetches the access token, entitlement token, and player UUID from the local
   * entitlements endpoint.
   *
   * Documented at https://valapidocs.techchrism.me/endpoint/entitlements-token
   */
  private async authenticate() {
    const response = await this.request<EntitlementsTokenResponse>(
      "local",
      "/entitlements/v1/token",
    );

    this._token = response.accessToken;
    this._jwt = response.token;
    this._puuid = response.subject;
  }
}

export { Client };
