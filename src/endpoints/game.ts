import type { Client } from "../client.js";
import type { Request } from "../http.js";
import type {
  CurrentGameLoadoutsResponse,
  CurrentGameMatchResponse,
  CurrentGamePlayerResponse,
} from "valorant-api-types";

class Game {
  private readonly request: Request;

  constructor(private readonly client: Client) {
    this.request = client.request;
  }

  /**
   * Current Game Player
   *
   * Get the current game match ID for the provided player
   *
   * Service: glz
   * Endpoint: /core-game/v1/players/{puuid}
   * Documentation: https://valapidocs.techchrism.me/endpoint/current-game-player
   */
  async current() {
    return this.request<CurrentGamePlayerResponse>(
      "glz",
      "/core-game/v1/players/" + this.client._puuid,
    );
  }

  /**
   * Current Game Match
   *
   * Get the current game match info
   *
   * Service: glz
   * Endpoint: /core-game/v1/matches/{current game match id}
   * Documentation: https://valapidocs.techchrism.me/endpoint/current-game-match
   */
  async details() {
    const { MatchID } = await this.current();

    return this.request<CurrentGameMatchResponse>(
      "glz",
      "/core-game/v1/matches/" + MatchID,
    );
  }

  /**
   * Current Game Loadouts
   *
   * Get the current game loadout info for all players in the match
   *
   * Service: glz
   * Endpoint: /core-game/v1/matches/{current game match id}/loadouts
   * Documentation: https://valapidocs.techchrism.me/endpoint/current-game-loadouts
   */
  async loadouts() {
    const { MatchID } = await this.current();

    return this.request<CurrentGameLoadoutsResponse>(
      "glz",
      "/core-game/v1/matches/" + MatchID + "/loadouts",
    );
  }

  /**
   * Current Game Quit
   *
   * Quits the current game
   *
   * Service: glz
   * Endpoint: /core-game/v1/players/{puuid}/disassociate/{current game match id}
   * Documentation: https://valapidocs.techchrism.me/endpoint/current-game-quit
   */
  async disconnect() {
    const { MatchID } = await this.current();

    return this.request(
      "glz",
      `/core-game/v1/players/${this.client._puuid}/disassociate/${MatchID}`,
      "POST",
    );
  }
}

export { Game };
