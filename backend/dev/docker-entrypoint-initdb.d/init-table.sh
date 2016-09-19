#!/bin/bash
set -e

# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
#     CREATE DATABASE IF NOT EXISTS niji;
#     GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
# EOSQL
