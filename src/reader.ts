import path from "node:path";
import fs from "fs/promises";

// Capture region and shard from ShooterGame.log
const REGEX = /https:\/\/glz-(?<region>.+?)-1\.(?<shard>.+?)\.a\.pvp\.net/;

// %LocalAppData%
const LOCALAPPDATA = process.env.LOCALAPPDATA!;

/**
 * Reads the locally available values needed to connect to VALORANT.
 *
 * Reads the Riot Client lockfile and VALORANT's ShooterGame.log to get them.
 *
 * @returns The values needed to connect to VALORANT.
 */
async function read() {
  // %LocalAppData%\Riot Games\Riot Client\Config\lockfile
  const lockfile = path.join(
    LOCALAPPDATA,
    "Riot Games",
    "Riot Client",
    "Config",
    "lockfile",
  );

  // %LocalAppData%\VALORANT\Saved\Logs\ShooterGame.log
  const shootergame = path.join(
    LOCALAPPDATA,
    "VALORANT",
    "Saved",
    "Logs",
    "ShooterGame.log",
  );

  const lock = await fs.readFile(lockfile, "utf8");
  const log = await fs.readFile(shootergame, "utf8");

  // Name and PID aren't needed; name:pid:port:password:protocol
  const [, , port, password, protocol] = lock.split(":");

  // Region and shard can be different
  const match = log.match(REGEX);

  const region = match?.groups?.region;
  const shard = match?.groups?.shard;

  // Java ahh pattern
  if (port && password && protocol && region && shard) {
    return { port, password, protocol, region, shard };
  }

  throw new Error("Failed to read values from lockfile and ShooterGame.log");
}

export { read };
