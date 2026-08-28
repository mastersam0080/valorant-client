import { ITEM_TYPES } from "../item.js";

import type { Client } from "../client.js";
import type { Request } from "../http.js";
import type { ItemType } from "../item.js";
import type {
  OwnedItemsResponse,
  PricesResponse,
  StorefrontResponse,
  WalletResponse,
} from "valorant-api-types";

class Store {
  request: Request;

  constructor(private readonly client: Client) {
    this.request = client.request;
  }

  /**
   * Prices
   *
   * Get the current store prices for all items
   *
   * Service: pd
   * Endpoint: /store/v1/offers/
   * Documentation: https://valapidocs.techchrism.me/endpoint/prices
   */
  async catalog() {
    return this.request<PricesResponse>("pd", "/store/v1/offers/");
  }

  /**
   * Storefront
   *
   * Get the currently available items in the store
   *
   * Service: pd
   * Endpoint: /store/v2/storefront/{puuid}
   * Documentation: https://valapidocs.techchrism.me/endpoint/storefront
   */
  async today() {
    return this.request<StorefrontResponse>(
      "pd",
      "/store/v2/storefront/" + this.client._puuid,
    );
  }

  /**
   * Wallet
   *
   * Get the current wallet balance for the user
   *
   * Service: pd
   * Endpoint: /store/v1/wallet/{puuid}
   * Documentation: https://valapidocs.techchrism.me/endpoint/wallet
   */
  async wallet() {
    return this.request<WalletResponse>(
      "pd",
      "/store/v1/wallet/" + this.client._puuid,
    );
  }

  /**
   * Owned Items
   *
   * List what the player owns (agents, skins, buddies, ect.)
   *
   * Service: pd
   * Endpoint: /store/v1/entitlements/{puuid}/{ItemTypeID}
   * Documentation: https://valapidocs.techchrism.me/endpoint/owned-items
   */
  async owned(ItemType: ItemType) {
    const ItemTypeID = ITEM_TYPES[ItemType];

    return this.request<OwnedItemsResponse>(
      "pd",
      `/store/v1/entitlements/${this.client._puuid}/${ItemTypeID}`,
    );
  }
}

export { Store };
