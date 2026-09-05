import type { Client } from "../client.js";
import type { Request } from "../http.js";
import type {
  AccountXPResponse,
  ConfigEndpointResponse,
  FetchContentResponse,
  LeaderboardResponse,
  PenaltiesResponse,
  PlayerMMRResponse,
} from "valorant-api-types";

class Pvp {
  private readonly request: Request;

  constructor(private readonly client: Client) {
    this.request = client.request;
  }

  /**
   * Fetch Content
   *
   * Get a list of seasons, acts, and events
   *
   * Service: shared
   * Endpoint: /content-service/v3/content
   * Documentation: https://valapidocs.techchrism.me/endpoint/fetch-content
   */
  async content() {
    return this.request<FetchContentResponse>(
      "shared",
      "/content-service/v3/content",
    );
  }

  /**
   * Account XP
   *
   * Get the account level, XP, and XP history for the current player. This endpoint only works with the authenticated player's PUUID.
   *
   * Service: pd
   * Endpoint: /account-xp/v1/players/{puuid}
   * Documentation: https://valapidocs.techchrism.me/endpoint/account-xp
   */
  async xp() {
    return this.request<AccountXPResponse>(
      "pd",
      "/account-xp/v1/players/" + this.client._puuid,
    );
  }

  /**
   * Player MMR
   *
   * Get a player's MMR and history
   *
   * Service: pd
   * Endpoint: /mmr/v1/players/{puuid}
   * Documentation: https://valapidocs.techchrism.me/endpoint/player-mmr
   */
  async mmr() {
    return this.request<PlayerMMRResponse>(
      "pd",
      "/mmr/v1/players/" + this.client._puuid,
    );
  }

  /**
   * Leaderboard
   *
   * Get the leaderboard for a given season
   *
   * Service: pd
   * Endpoint: /mmr/v1/leaderboards/affinity/na/queue/competitive/season/{season id}?startIndex={startIndex}&size={size}&query={query}
   * Documentation: https://valapidocs.techchrism.me/endpoint/leaderboard
   */
  async leaderboard(
    SeasonID: string,
    StartIndex: number = 0,
    Size: number = 25,
  ) {
    return this.request<LeaderboardResponse>(
      "pd",
      `/mmr/v1/leaderboards/affinity/na/queue/competitive/season/${SeasonID}?startIndex=${StartIndex}&size=${Size}`,
    );
  }

  /**
   * Penalties
   *
   * Get the matchmaking penalties for the given player
   *
   * Service: pd
   * Endpoint: /restrictions/v3/penalties
   * Documentation: https://valapidocs.techchrism.me/endpoint/penalties
   */
  async penalties() {
    return this.request<PenaltiesResponse>("pd", "/restrictions/v3/penalties");
  }

  /**
   * Config
   *
   * Get the config for the given player
   *
   * Service: pd
   * Endpoint: /v1/config/{region}
   * Documentation: https://valapidocs.techchrism.me/endpoint/config
   */
  async config() {
    return this.request<ConfigEndpointResponse>(
      "pd",
      "/v1/config/" + this.client._region,
    );
  }

  /**
   * Name
   *
   * Description
   *
   * Service: service
   * Endpoint: endpoint
   * Documentation: link
   */
  // async example() {}
}

export { Pvp };
