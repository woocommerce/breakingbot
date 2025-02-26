import * as dotenv from "dotenv";
import { priorityConfig } from "./priorities.js";
import type { AppConfig, SlackConfig } from "./types.js";

// Load .env file only in development
dotenv.config();

if (typeof process.env.SLACK_DEV_BREAKING_CHANNEL_ID !== "string") {
  console.error(
    "Error: SLACK_DEV_BREAKING_CHANNEL_ID must be set in .env file"
  );
  process.exit(1);
}

if (typeof process.env.SLACK_DEV_BASE_URL !== "string") {
  console.error("Error: SLACK_DEV_BASE_URL must be set in .env file");
  process.exit(1);
}

if (typeof process.env.SLACK_BREAKING_ROOM_PREFIX !== "string") {
  console.error("Error: SLACK_BREAKING_ROOM_PREFIX must be set in .env file");
  process.exit(1);
}

if (typeof process.env.RUNBOOK_ROOT_URL !== "string") {
  console.error("Error: RUNBOOK_ROOT_URL must be set in .env file");
  process.exit(1);
}

const devSlackConfig: SlackConfig = {
  type: "Slack",
  baseUrl: process.env.SLACK_DEV_BASE_URL,
  userIdRegexPattern: /(<@[UW][A-Z0-9]{5,19}>)|\b([UW][A-Z0-9]{5,19})\b/g,
} as const;

export const devConfig: AppConfig = {
  breakingInitialUsers: [],
  breakingMainRoom: process.env.SLACK_DEV_BREAKING_CHANNEL_ID,
  breakingRoomPrefix: process.env.SLACK_BREAKING_ROOM_PREFIX,
  commPlatform: devSlackConfig,
  priorities: priorityConfig,
  runbookRootUrl: process.env.RUNBOOK_ROOT_URL,
  runbookPointUrl: process.env.RUNBOOK_POINT_URL,
  runbookCommsUrl: process.env.RUNBOOK_COMMS_URL,
  runbookEngLeadUrl: process.env.RUNBOOK_ENG_LEAD_URL,
  runbookTestLeadUrl: process.env.RUNBOOK_TEST_LEAD_URL,
} as const;
