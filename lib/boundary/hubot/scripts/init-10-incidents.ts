// Description:
//   A hubot script to load incident data from durable storage into the bot
//
// Configuration:
//   None
//
// Commands:
//   None
//
// Author:
//   WPVIP

import { sql } from "drizzle-orm";
import { newIncidentMachine } from "../../../core/fsm.js";
import { findIncidentsInProgressDb } from "../../../data/incident.js";
import type { BreakingBot, IncidentIndex } from "../../../types/index.js";

// biome-ignore lint/style/noDefaultExport: hubot requires it
export default async (robot: BreakingBot) => {
  robot.on("postgres.online", async () => {
    // Add the test_lead column before loading incidents
    try {
      await robot.db.execute(
        sql`ALTER TABLE incidents ADD COLUMN IF NOT EXISTS test_lead TEXT;`
      );
      robot.logger.info("Added test_lead column to incidents table");
    } catch (error) {
      robot.logger.error("Error adding test_lead column:", error);
      // Continue anyway - the column might already exist
    }

    const incidents = await findIncidentsInProgressDb(robot.db);

    robot.incidents = incidents.reduce((acc: IncidentIndex, incident) => {
      if (!incident.chatRoomUid) {
        console.error(`Incident ${incident.id} is missing a chat room!`);
        process.exit(1);
      }

      acc[incident.chatRoomUid] = newIncidentMachine(incident);

      return acc;
    }, {});

    robot.emit("incidents.online");
  });
};
