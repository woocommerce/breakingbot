import type { PriorityConfig } from "./types.js";

export const priorityConfig: PriorityConfig = {
  default: 2,
  priorities: {
    1: {
      name: "SEV1",
      emoji: "fire",
      description:
        "Significant impact or loss of service affecting every or significant number of merchants, including: Noticeable disruption that either leads to a critical impact on business operations or directly results in revenue loss, The experience of either the merchant or the shopper, or both, are severely affected to the extent that normal operations are not able to proceed, or Fatal errors on the store triggered in normal use, except for the cases of some heavy/hacky customizations. Broken critical flows for a small subset of merchants (edge cases) where no workaround available even by downgrading a plugin. Data loss or data corruption. Inability to build and release new versions. Compliance, regulatory, or legal issues.",
      aliases: ["hi", "high", "critical", "crit"],
      nag: {
        nagIntervalsSeconds: {
          noComms: 1800, // 30 minutes if no comms assigned
          noPoint: 600, // 10 minutes if no point assigned
          needCommUpdate: 14000, // comms update every 4 hours
          needInitialComm: 3600, // 1 hour if no initial comms update
        },
      },
      reportRequired: true,
      reviewRequired: true,
      isHighPriority: true,
    },
    2: {
      name: "SEV2",
      emoji: "fire",
      description:
        "Core functionality is affected for a small subset of merchants, however, temporary alternative methods for achieving similar functionality are available, including plugin downgrade to previous versions. Non-critical features within the product are experiencing a loss of functionality for all or significant number of merchants, however, the product remains operable. Features or functionality that significantly impact reliability, stability, performance, or developer productivity.",
      aliases: ["mid", "med", "medium", "normal"],
      nag: {
        nagIntervalsSeconds: {
          noComms: 1800, // 30 minutes if no comms assigned
          noPoint: 1800, // 30 minutes if no point assigned
          needCommUpdate: 28000, // comms update every 8 hours
          needInitialComm: 3600, // 1 hour if no initial comms update
        },
      },
      reportRequired: true,
      reviewRequired: true,
      isHighPriority: true,
    },
    3: {
      name: "SEV3",
      emoji: "dash",
      description:
        "Non-critical features within the product are experiencing a loss of functionality for a small subset of merchants, or workarounds are available without the need to downgrade a plugin. This issues is high priority, but can wait until the next release.",
      aliases: ["lo", "low", "lite", "light", "backlog", "none", "wontfix"],
    },
  },
} as const;
