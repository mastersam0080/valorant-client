import type { Client } from "../client.js";
import type { Request } from "../http.js";
import type {
  LockCharacterResponse,
  PregameLoadoutsResponse,
  PregameMatchResponse,
  PregamePlayerResponse,
  SelectCharacterResponse,
} from "valorant-api-types";

class Pregame {
  private readonly request: Request;

  constructor(private readonly client: Client) {
    this.request = client.request;
  }

  /**
   * Pre-Game Player
   *
   * Get the pre-game match ID for the provided player
   *
   * Service: glz
   * Endpoint: /pregame/v1/players/{puuid}
   * Documentation: https://valapidocs.techchrism.me/endpoint/pre-game-player
   */
  async current() {
    return this.request<PregamePlayerResponse>(
      "glz",
      "/pregame/v1/players/" + this.client._puuid,
    );
  }

  /**
   * Pre-Game Match
   *
   * Get Pre-Game match data
   *
   * Service: glz
   * Endpoint: /pregame/v1/matches/{pre-game match id}
   * Documentation: https://valapidocs.techchrism.me/endpoint/pre-game-match
   */
  async details() {
    const { MatchID } = await this.current();

    return this.request<PregameMatchResponse>(
      "glz",
      "/pregame/v1/matches/" + MatchID,
    );
  }

  /**
   * Pre-Game Loadouts
   *
   * Get Pre-Game loadout data
   *
   * Service: glz
   * Endpoint: /pregame/v1/matches/{pre-game match id}/loadouts
   * Documentation: https://valapidocs.techchrism.me/endpoint/pre-game-loadouts
   */
  async loadouts() {
    const { MatchID } = await this.current();

    return this.request<PregameLoadoutsResponse>(
      "glz",
      "/pregame/v1/matches/" + MatchID + "/loadouts",
    );
  }

  /**
   * Select Character
   *
   * Select an agent
   *
   * DO NOT USE THIS FOR INSTALOCKING
   * Riot doesn't like this. You may get banned or get the API restricted for the rest of us.
   *
   * Service: glz
   * Endpoint: /pregame/v1/matches/{pre-game match id}/select/{agent id}
   * Documentation: https://valapidocs.techchrism.me/endpoint/select-character
   */
  async select(AgentID: string) {
    const { MatchID } = await this.current();

    return this.request<SelectCharacterResponse>(
      "glz",
      `/pregame/v1/matches/${MatchID}/select/${AgentID}`,
      "POST",
    );
  }

  /**
   * Lock Character
   *
   * Lock an agent
   *
   * DO NOT USE THIS FOR INSTALOCKING
   * Riot doesn't like this. You may get banned or get the API restricted for the rest of us.
   *
   * Service: glz
   * Endpoint: /pregame/v1/matches/{pre-game match id}/lock/{agent id}
   * Documentation: https://valapidocs.techchrism.me/endpoint/lock-character
   */
  async lock(AgentID: string) {
    const { MatchID } = await this.current();

    return this.request<LockCharacterResponse>(
      "glz",
      `/pregame/v1/matches/${MatchID}/lock/${AgentID}`,
      "POST",
    );
  }

  /**
   * Pre-Game Quit
   *
   * Quit the pre-game lobby
   *
   * Service: glz
   * Endpoint: /pregame/v1/matches/{pre-game match id}/quit
   * Documentation: https://valapidocs.techchrism.me/endpoint/pre-game-quit
   */
  async dodge() {
    const { MatchID } = await this.current();

    return this.request(
      "glz",
      "/pregame/v1/matches/" + MatchID + "/quit",
      "POST",
    );
  }
}

export { Pregame };
