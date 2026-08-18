# Install this configuration

This repository contains OMP preferences and skills only. It does not include authentication, API keys, sessions, databases, caches, or generated artifacts.

## Prerequisite

Install Oh My Pi first using its [official installation instructions](https://github.com/can1357/oh-my-pi#install).

## New host

Clone the repository into OMP's default user agent directory, then start OMP normally:

```sh
git clone https://github.com/Fractal-Tess/oh-my-pi.git ~/.omp/agent
omp
```

Authenticate with the providers available on that host. Authentication remains local and is intentionally not tracked by this repository.

## Existing host

Use a named OMP profile to preserve the existing default configuration:

```sh
mkdir -p ~/.omp/profiles/fractal-tess
git clone https://github.com/Fractal-Tess/oh-my-pi.git ~/.omp/profiles/fractal-tess/agent
omp --profile fractal-tess
```

The named profile has its own credentials, sessions, caches, and configuration. Review `config.yml` before making it your default profile.

## Update

```sh
git -C ~/.omp/agent pull --ff-only
```

For a named profile, replace `~/.omp/agent` with that profile's `agent` directory.

## What is tracked

- `config.yml`
- `skills/`
- `README.md` and this guide

Everything else in the OMP agent directory is ignored because it can contain machine-local runtime state or credentials.
