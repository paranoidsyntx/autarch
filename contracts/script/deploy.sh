#!/usr/bin/env bash
# Usage: ./script/deploy.sh

set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

ETHERSCAN_API_KEY="${ETHERSCAN_API_KEY:?Set ETHERSCAN_API_KEY for verification}"

exec forge script script/Deploy.s.sol:Deploy \
  --rpc-url "$RPC_URL" \
  --broadcast \
  --verify \
  --verifier etherscan \
  --etherscan-api-key "$ETHERSCAN_API_KEY"