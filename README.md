# Rust Spy discord bot

This is a discord bot to track player activity in the survival game Rust. The following commands are implemented

- `/checkplayer {BattleMetricsPlayerId}` checks if the specified player is online
- `/spyon {BattleMetricsPlayerId}` spy on the specified player and notify of any changes in their status
- `/removespy {BattleMetricsPlayerId}` stop spying on the specified player
- `/list` List the status of all players that are currently being spied on


# Setup 

The code depends on a few values set in a .env file you must create yourself

- `APP_ID` - the app id of your discord app created in the discord dev portal
- `DISCORD_TOKEN` - the token for your discord app created in the discord dev portal
- `GUILD_ID` - the guild id for the discord server you want to send messages in
- `RUST_SERVER_ID` - The battlemetrics.com server id corresponding to the rust server you wish to check for player activity
- `DISCORD_NOTIFICATION_CHANNEL_ID` - The discord channel id for the discord channel you want to notify when player status changes(bot must be installed and have perms)

`npm install` to install dependencies

`npm run start` to start the app server

`npm run deploy` to deploy the commands to your discord app