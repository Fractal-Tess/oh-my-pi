# Install this configuration

This repository contains OMP preferences and skills only. It does not include authentication, API keys, sessions, databases, caches, or generated artifacts.

## Prerequisite

Install Oh My Pi first using its [official installation instructions](https://github.com/can1357/oh-my-pi#install).

## Recommended: isolated profile

Create the profile directory and clone this repository **before starting that profile for the first time**:

```sh
mkdir -p ~/.omp/profiles/fractal-tess
git clone https://github.com/Fractal-Tess/oh-my-pi.git ~/.omp/profiles/fractal-tess/agent
omp --profile fractal-tess
```

Authenticate with the providers available on that host. The named profile keeps its credentials, sessions, caches, and runtime databases separate from the default profile.

## Existing default profile

Do not clone into a populated `~/.omp/agent`; OMP creates runtime state there. Clone the configuration elsewhere, then intentionally overlay only the tracked configuration and skills:

```sh
git clone https://github.com/Fractal-Tess/oh-my-pi.git ~/.config/oh-my-pi
cp ~/.config/oh-my-pi/config.yml ~/.omp/agent/config.yml
mkdir -p ~/.omp/agent/skills
cp -a ~/.config/oh-my-pi/skills/. ~/.omp/agent/skills/
```

Back up or review an existing `config.yml` first if it contains host-specific preferences you want to retain.

## Update

For the isolated profile:

```sh
git -C ~/.omp/profiles/fractal-tess/agent pull --ff-only
```

For an existing default profile, pull the clone under `~/.config/oh-my-pi` and repeat the explicit overlay above.

## What is tracked

- `config.yml`
- `skills/`
- `README.md` and this guide

Everything else in the OMP agent directory is ignored because it can contain machine-local runtime state or credentials.
