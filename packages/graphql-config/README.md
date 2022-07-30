# `@relay-graphql-js/graphql-config`

[![npm](https://img.shields.io/npm/v/vscode-apollo-relay.svg)](https://www.npmjs.com/package/vscode-apollo-relay)
[![build](https://img.shields.io/travis/relay-tools/vscode-apollo-relay/master.svg)](https://travis-ci.org/relay-tools/vscode-apollo-relay/builds)

Simple configuration for [`graphql-config`](https://graphql-config.com) compatibility for Relay projects.

Features:

- Read all user configuration from [relay-config], if the project is setup with it.
- Provides definitions for all Relay directives for validation and auto-completion purposes.
- Provides validation of `@argumentDefinitions` and `@arguments` directives.
- uses your locally installed `graphql` version!

[Changelog](https://github.com/relay-tools/relay-graphql-js/blob/master/packages/graphql-config/CHANGELOG.md)

## Install

```sh
# using npm
npm install --save-dev @relay-graphql-js/graphql-config

# using yarn
yarn add --dev @relay-graphql-js/graphql-config
```
(assuming `graphql-config` is installed already, which is used only for types)

## Usage

In your `graphql.config.ts` file:

```js
import { generateConfig } from "@relay-graphql-js/graphql-config"
const config = generateConfig();

export default config
```

Or, in your `graphql.config.js` file:

```js
const { config } = require("@relay-graphql-js/graphql-config").generateConfig()
module.exports = config
```

## Limitations

This _does not_ support relay environments => `graphql-config` projects, _yet_. Open a PR if you want it to!
