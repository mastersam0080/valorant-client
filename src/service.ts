// All VALORANT endpoints belong to one of these services
type Service = "local" | "pd" | "glz" | "shared";

// Template for the X-Riot-ClientPlatform header
const PLATFORM_TEMPLATE = {
  platformType: "PC",
  platformOS: "Windows",
  platformOSVersion: "10.0.19042.1.256.64bit",
  platformChipset: "Unknown",
};

// Platform information encoded in Base64 for the X-Riot-ClientPlatform header
const CLIENT_PLATFORM = Buffer.from(JSON.stringify(PLATFORM_TEMPLATE)).toString(
  "base64",
);

/**
 * Returns the base URL for a VALORANT service using values read locally from
 * the Riot Client lockfile and VALORANT's ShooterGame.log.
 *
 * @param type Service to return base URL for
 * @param region Region used by VALORANT endpoints
 * @param shard Shard used by VALORANT endpoints
 * @param port Port from the Riot Client lockfile
 */
function base(type: Service, region?: string, shard?: string, port?: string) {
  return {
    shared: `https://shared.${shard}.a.pvp.net`,
    pd: `https://pd.${shard}.a.pvp.net`,
    local: `https://127.0.0.1:${port}`,
    glz: `https://glz-${region}-1.${shard}.a.pvp.net`,
  }[type];
}

/**
 * Returns authentication headers for a VALORANT endpoint.
 *
 * Remote services need an access token, entitlement token, and client version,
 * while the local service only requires a password.
 *
 * @param type Service to return headers for
 * @param password Password from the Riot Client lockfile
 * @param token Access token
 * @param jwt Entitlement token
 * @param version VALORANT client version
 */
function headers(
  type: Service,
  password?: string,
  token?: string,
  jwt?: string,
  version?: string,
) {
  if (type === "local")
    return {
      Authorization:
        "Basic " + Buffer.from("riot:" + password).toString("base64"),
    };

  // Remote services use the same headers
  return {
    Authorization: "Bearer " + token,
    "X-Riot-Entitlements-JWT": jwt,
    "X-Riot-ClientVersion": version,
    "X-Riot-ClientPlatform": CLIENT_PLATFORM,
  };
}

export type { Service };
export { base, headers };
