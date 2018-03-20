# 8base-api-cli
The 8base API Command Line Interface (CLI)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [auth:confirm](#authconfirm)
  - [auth:login](#authlogin)
  - [auth:logout](#authlogout)
  - [auth:sicolo](#authsicolo)
  - [auth:signup](#authsignup)
  - [auth:whoami](#authwhoami)
  - [config](#config)
  - [config:get](#configget)
  - [config:set](#configset)
  - [schema:export](#schemaexport)
  - [schema:import](#schemaimport)
  - [tables:drop](#tablesdrop)
  - [tables:fill](#tablesfill)

## Installation

### Globally
Install CLI globally with

```bash
$ yarn global add @8base/api-cli
```

Now you can run CLI using following command anywhere

```bash
$ 8base-api-cli
```

### Locally
Install CLI locally to your `node_modules` folder with

```bash
$ yarn add @8base/api-cli --dev
```

You should be able to run CLI with

```bash
$ node_modules/.bin/8base-api-cli
```

## Usage
```
Usage: 8base-api-cli <command> [options]

Commands:
  8base-api-cli auth:confirm   Confirm with passed credentials.
  8base-api-cli auth:login     Login with passed credentials.
  8base-api-cli auth:logout    Logout and clear saved credentials.
  8base-api-cli auth:sicolo    Sign up, confirm and login with passed credentials.
  8base-api-cli auth:signup    Sign up with passed credentials.
  8base-api-cli auth:whoami    Display the current auth parameters.
  8base-api-cli config         Display a config.
  8base-api-cli config:get     Display a config value with passed name.
  8base-api-cli config:set     Set a config value with passed name.
  8base-api-cli schema:export  Export tables to the schema file.
  8base-api-cli schema:import  Import tables by passed schema file.
  8base-api-cli tables:drop    Drop all user tables.
  8base-api-cli tables:fill    Fill all user tables with mock data.

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Commands

### auth:confirm

Confirm with passed credentials.

```
Options:
  --email                                                    [string] [required]
  --code                                                     [string] [required]
  --password                                                 [string] [required]
  --save                                               [boolean] [default: true]
```

### auth:login

Login with passed credentials.

```
Options:
  --email                                                    [string] [required]
  --password                                                 [string] [required]
  --save                                               [boolean] [default: true]
```

### auth:logout

Logout and clear saved credentials.

### auth:sicolo

Sign up, confirm and login with passed credentials.

```
Options:
  --email                                                    [string] [required]
  --password                                                 [string] [required]
  --firstName                                         [string] [default: "Ivan"]
  --lastName                                        [string] [default: "Ivanov"]
  --organization                                     [string] [default: "8base"]
  --host                                    [string] [default: "imap.yandex.ru"]
  --save                                               [boolean] [default: true]
```

### auth:signup

Sign up with passed credentials.

```
Options:
  --email                                                    [string] [required]
  --password                                                 [string] [required]
  --firstName                                         [string] [default: "Ivan"]
  --lastName                                        [string] [default: "Ivanov"]
  --organization                                     [string] [default: "8base"]
```

### auth:whoami

Display the current auth parameters.

### config

Display a config.

### config:get

Display a config value with passed name.

```
Options:
  --name                                                     [string] [required]
```

### config:set

Set a config value with passed name.

```
Options:
  --name                                                     [string] [required]
  --value                                                    [string] [required]
```

### schema:export

Export tables to the schema file.

```
Options:
  --file                          [string] [required] [default: "./EXPORT.json"]
```

### schema:import

Import tables by passed schema file.

```
Options:
  --file                          [string] [required] [default: "./IMPORT.json"]
```

### tables:drop

Drop all user tables.

### tables:fill

Fill all user tables with mock data.