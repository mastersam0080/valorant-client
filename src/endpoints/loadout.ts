import type { Client } from "../client.js";
import type { Request } from "../http.js";

import type {
  PlayerLoadoutResponse,
  SetPlayerLoadoutResponse,
} from "valorant-api-types";

// Zod is in the dependency list of "valorant-api-types"
import type { z } from "zod";

// Why techchrism
import { setPlayerLoadoutEndpoint } from "valorant-api-types";

// Get the request body type from the endpoint's schema
type SetPlayerLoadoutBody = z.input<typeof setPlayerLoadoutEndpoint.body>;

class Loadout {
  private readonly request: Request;

  constructor(private readonly client: Client) {
    this.request = client.request;
  }

  /**
   * Player Loadout
   *
   * Get the player's current loadout. Only works for your own PUUID.
   *
   * Service: pd
   * Endpoint: /personalization/v2/players/{puuid}/playerloadout
   * Documentation: https://valapidocs.techchrism.me/endpoint/player-loadout
   */
  async current() {
    return this.request<PlayerLoadoutResponse>(
      "pd",
      "/personalization/v2/players/" + this.client._puuid + "/playerloadout",
    );
  }

  /**
   * Set Player Loadout
   *
   * Set the player's current loadout.
   *
   * Service: pd
   * Endpoint: /personalization/v2/players/{puuid}/playerloadout
   * Documentation: https://valapidocs.techchrism.me/endpoint/set-player-loadout
   */
  async set(loadout: SetPlayerLoadoutBody) {
    return this.request<SetPlayerLoadoutResponse>(
      "pd",
      "/personalization/v2/players/" + this.client._puuid + "/playerloadout",
      "POST",
      loadout,
    );
  }
}

export { Loadout };
