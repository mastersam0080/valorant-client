import type { Client } from "../client.js";
import type { Request } from "../http.js";
import type {
  PartyDeclineResponse,
  PartyInviteResponse,
  PartyPlayerResponse,
  PartyRequestResponse,
  PartyResponse,
  PartySetMemberReadyResponse,
  SetPartyAccessibilityResponse,
} from "valorant-api-types";

class Party {
  private readonly _request: Request;

  constructor(private readonly client: Client) {
    this._request = client.request;
  }

  /**
   * Party Player
   *
   * Get the party information for the given player
   *
   * Service: glz
   * Endpoint: /parties/v1/players/{puuid}
   * Documentation: https://valapidocs.techchrism.me/endpoint/party-player
   */
  async current() {
    return this._request<PartyPlayerResponse>(
      "glz",
      "/parties/v1/players/" + this.client._puuid,
    );
  }

  /**
   * Party
   *
   * Get the party information for the given party ID
   *
   * Service: glz
   * Endpoint: /parties/v1/parties/{party id}
   * Documentation: https://valapidocs.techchrism.me/endpoint/party
   */
  async details() {
    const { CurrentPartyID } = await this.current();

    return this._request<PartyResponse>(
      "glz",
      "/parties/v1/parties/" + CurrentPartyID,
    );
  }

  /**
   * Party Remove Player
   *
   * Remove a player from the current party
   *
   * Service: glz
   * Endpoint: /parties/v1/players/{puuid}
   * Documentation: https://valapidocs.techchrism.me/endpoint/party-remove-player
   */
  async remove(PlayerUUID: string) {
    return this._request("glz", "/parties/v1/players/" + PlayerUUID, "DELETE");
  }

  /**
   * Party Set Member Ready
   *
   * Set the ready status of a player in the current party
   *
   * Service: glz
   * Endpoint: /parties/v1/parties/{party id}/members/{puuid}/setReady
   * Documentation: https://valapidocs.techchrism.me/endpoint/party-set-member-ready
   */
  async ready(ready: boolean) {
    const { CurrentPartyID } = await this.current();

    return this._request<PartySetMemberReadyResponse>(
      "glz",
      `/parties/v1/parties/${CurrentPartyID}/members/${this.client._puuid}/setReady`,
      "POST",
      { ready },
    );
  }

  /**
   * Set Party Accessibility
   *
   * Set the accessibility of the party
   *
   * Service: glz
   * Endpoint: /parties/v1/parties/{party id}/accessibility
   * Documentation: https://valapidocs.techchrism.me/endpoint/set-party-accessibility
   */
  async status(accessibility: "OPEN" | "CLOSED") {
    const { CurrentPartyID } = await this.current();

    return this._request<SetPartyAccessibilityResponse>(
      "glz",
      `/parties/v1/parties/${CurrentPartyID}/accessibility`,
      "POST",
      { accessibility },
    );
  }

  /**
   * Party Invite
   *
   * Invite a player to the party by name and tagline
   *
   * Service: glz
   * Endpoint: /parties/v1/parties/{party id}/invites/name/{name}/tag/{tagline}
   * Documentation: https://valapidocs.techchrism.me/endpoint/party-invite
   */
  async invite(name: string, tag: string) {
    const { CurrentPartyID } = await this.current();

    return this._request<PartyInviteResponse>(
      "glz",
      `/parties/v1/parties/${CurrentPartyID}/invites/name/${name}/tag/${tag}`,
      "POST",
    );
  }

  /**
   * Party Request
   *
   * Requests to join the specified party ID
   *
   * Service: glz
   * Endpoint: /parties/v1/parties/{party id}/request
   * Documentation: https://valapidocs.techchrism.me/endpoint/party-request
   */
  async request(PartyID: string) {
    return this._request<PartyRequestResponse>(
      "glz",
      `/parties/v1/parties/${PartyID}/request`,
      "POST",
    );
  }

  /**
   * Party Decline
   *
   * Decline a party invite request
   *
   * Service: gkz
   * Endpoint: /parties/v1/parties/{party id}/request/{request id}/decline
   * Documentation: https://valapidocs.techchrism.me/endpoint/party-decline
   */
  async decline(RequestID: string) {
    const { CurrentPartyID } = await this.current();

    return this._request<PartyDeclineResponse>(
      "glz",
      `/parties/v1/parties/${CurrentPartyID}/request/${RequestID}/decline`,
      "POST",
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

export { Party };
