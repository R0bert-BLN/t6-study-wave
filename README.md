***

# Local Dev Environment Setup

This repository uses a  containerized architecture. 
The stack includes **FrankenPHP (Laravel 13), Bun (React/Vite), PostgreSQL 16, Redis, RustFS (S3 compatible), OpenObserve, and Mailpit**.

### Requirements
*   **WSL2** (Ubuntu recommended)
*   **Docker Desktop** (with WSL2 integration enabled)
*   **Git**

---

### 1. Initialization

Clone the repository directly into your WSL filesystem (e.g., `~/projects/`).

```bash
git clone git@github.com:YourOrg/t6-study-wave.git
cd t6-study-wave
```

Set up your local environment variables. The defaults in `.env.example` are pre-configured for the Docker network.

```bash
cp .env.example .env
```

### 2. Build & Boot

We use self-bootstrapping `entrypoint.sh` scripts. On the first run, Docker will automatically download the Laravel/React skeletons, run `composer/bun install`, configure `.env` keys, and mount the isolated named volumes for `vendor` and `node_modules`.

```bash
docker compose up -d --build
```

### 3. Local Routing & Access

We use **Traefik** as a reverse proxy. Port binding to the host is disabled for individual services to prevent conflicts. All traffic is routed through port `80` using `.localhost` subdomains.

| Service | Local Endpoint |
| :--- | :--- |
| **Frontend (Vite/React)** | `http://studywave.localhost` |
| **Backend API (Laravel)** | `http://api.studywave.localhost` |
| **Traefik Dashboard** | `http://traefik.studywave.localhost/dashboard/` |
| **Mailpit (Emails)** | `http://mailpit.studywave.localhost` |
| **OpenObserve (Logs)** | `http://openobserve.studywave.localhost` |
| **RustFS (S3 Storage)** | `http://rustfs.studywave.localhost` |

---

### 4. Workflow & Common Commands

Since the application runs entirely inside Docker, all CLI commands (Artisan, Composer, Bun) must be executed within their respective containers.

**Backend Operations:**
We have registered custom Composer scripts in `composer.json` to handle linting (Laravel Pint), static analysis (Larastan/PHPStan), and testing (Pest).

```bash
# Generate app key
docker compose exec backend php artisan key:generate

# Run database migrations
docker compose exec backend php artisan migrate

# Run database seeder
docker compose exec backend php artisan db:seed

# Run the full QA suite (Pint -> PHPStan -> Pest)
docker compose exec backend composer check

```

**Frontend Operations:**
We use `bun` instead of `npm` or `yarn` for package management and script execution due to its performance benefits.

```bash
# Add a new dependency
docker compose exec frontend bun add <package-name>

# Add a dev dependency
docker compose exec frontend bun add -D <package-name>

# Run linter
docker compose exec frontend bun run lint
```

### 5. Troubleshooting & Teardown
Robert Balan
Mara Blejan
Andreea Anghel
