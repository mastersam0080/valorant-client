import type { Client } from "../client.js";
import type { Request } from "../http.js";
import type {
  ActivateContractResponse,
  ContractsResponse,
  ItemUpgradesResponse,
} from "valorant-api-types";

class Contract {
  request: Request;

  constructor(private readonly client: Client) {
    this.request = client.request;
  }

  /**
   * Item Upgrades
   *
   * Get details for item upgrades
   *
   * Service: pd
   * Endpoint: /contract-definitions/v3/item-upgrades
   * Documentation: https://valapidocs.techchrism.me/endpoint/item-upgrades
   */
  async upgrades() {
    return this.request<ItemUpgradesResponse>(
      "pd",
      "/contract-definitions/v3/item-upgrades",
    );
  }

  /**
   * Contracts
   *
   * Get contract details including agents, battlepass, missions, and recent games
   *
   * Service: pd
   * Endpoint: /contracts/v1/contracts/{puuid}
   * Documentation: https://valapidocs.techchrism.me/endpoint/contracts
   */
  async list() {
    return this.request<ContractsResponse>(
      "pd",
      "/contracts/v1/contracts/" + this.client._puuid,
    );
  }

  /**
   * Activate Contract
   *
   * Activate a specific contract by ID
   *
   * Service: pd
   * Endpoint: /contracts/v1/contracts/{puuid}/special/{contract id}
   * Documentation: https://valapidocs.techchrism.me/endpoint/activate-contract
   */
  async activate(ContractID: string) {
    return this.request<ActivateContractResponse>(
      "pd",
      `/contracts/v1/contracts/${this.client._puuid}/special/${ContractID}`,
      "POST",
    );
  }
}

export { Contract };
