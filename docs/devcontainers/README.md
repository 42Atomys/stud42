# Devcontainers on S42 Project

To make the local development of S42 easier, we use [devcontainers on vscode](https://code.visualstudio.com/docs/remote/containers).

The strategy is to scope all development on a container to prevent any conflict with your machine setup or permission on your machine (If you work on the project at school for example).

The devcontainer allow us to have a full permission workspace and a developement process similar for everyone across the globe, freezed in the time.

Inside the devcontainers, the database, rabbitmq and others dependencies is automatically setup and linked with the app. You dont need to do boring env setup or docker-compose, devcontainers already do that for you. You needs to do some edit to your env config to add credentials to external services like Github, Discord, 42, ...

## Setup your credentials

Like say before, you needs to add some credentials listed on the file `.devcontainer/.env.example` by creating a `.devcontainer/.env` file (this file is ignored but not the example).

**DO NOT EDIT THE `.env.example` FILE. NEVER PUSH YOUR CREDENTIALS ON ANY COMMITS**

### Oauth2 credentials

To develop on S42, you need to have your OAuth2 applications with her credentials. Each OAuth2 provide to you an ID and a SECRET. In the next sub section, we give you the endpoint for each provider.

#### 42

**Endpoint**: https://profile.intra.42.fr/oauth/applications/new

**Environment keys**: `FORTY_TWO_CLIENT_ID` and `FORTY_TWO_CLIENT_SECRET`

#### Github

**Endpoint**: https://github.com/settings/applications/new

**Environment keys**: `GITHUB_ID` and `GITHUB_SECRET`

#### Discord

**Endpoint**: https://discord.com/developers/applications

**Environment keys**: `DISCORD_ID` and `DISCORD_SECRET`

_Discord bot needs to have a token generated and given on `DISCORD_TOKEN` key. To generate your bot token, see bot section on your discord developer application page._

## Launch and debug

To launch and debug services, apps or interface, we have already add all [Debugger profiles](https://code.visualstudio.com/docs/editor/debugging) for each services.

All services except the interface actually can be run separately without dependencies on other service. So you can juste start the debug profile for the service you want to edit with the Debugger of VSCode.

For interface, run the api on your terminal and start the interface with the debugger do the coffee for you. _In the future, the interface fetch data from the sandbox like jwtks-service._

## Knows Issues

### yarn and sudo permissions

Due to the yarn implementation and no-root user on the container, yarn dont have permission to write on `node_modules`.

The workarround is to run yarn install and update operations under `sudo`.

yarn scripts can be done without sudo it.

### ssh and gitconfig forward

Actually gitconfig and ssh key is not forwarded to your devcontainer.
You need to redefine it on container or perform all git commands outside of the
container (on your machine).