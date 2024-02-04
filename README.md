# Blackdog Configurator

Blackdog Configurator is the frontend for the Blackdog project. It is a web application that allows users to configure their own Blackdog instance.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. The instructions assume you are using [Visual Studio Code](https://code.visualstudio.com/) (VSCode) as your IDE.

### Prerequisites

Blackdog Configurator is designed to run within a dev container. To set up the dev container, you need to have [Docker](https://www.docker.com/) installed on your machine. You also need to have the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed in [Visual Studio Code](https://code.visualstudio.com/).

Blackdog Configurator is a web application written in [React](https://reactjs.org/). To run it, you need to have [Node.js](https://nodejs.org/en/) installed on your machine.

### Installing and Configuring

1. Clone the repository.

2. Run `npm install` in the project directory.

3. Copy the `/.devcontainer/.env.example` file and rename it to `.env`. This file contains environment variables that are used by the project. The `.env` file is ignored by git, so you can safely store sensitive information in it.

4. Similarly, copy the `/src/.env.local.example` file and rename it to `.env.local`. This file contains additional environment variables needed for local development.

### Running

1. **Run Docker on your machine.** Docker needs to be actively open in the background.

2. **Ensure a `.env.local` file exists and is reflects your machine's environment varibles.** See the "[Installing and Configuring](#installing-and-configuring)" section above for more information.

3. **Open the project in the dev container.** With VSCode, you can do this by opening VSCode and clicking the green button in the bottom left corner. Select "Remote-Containers: Reopen in Container". This will open a new window with the project running in a dev container.

4. **Run the project.** In the VSCode terminal, run `npm run dev`. This will start the project in development mode. The project will be available at `localhost:3000`.
