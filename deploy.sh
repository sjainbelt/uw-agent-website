#!/bin/bash
set -euo pipefail

PROJECT_ID=${PROJECT_ID:-belt-prod-us}
BUCKET=${BUCKET:-uw-agent-website}
DIST_DIR=${DIST_DIR:-dist}

npm run build

gcloud config set project "$PROJECT_ID"
gcloud storage rsync -R "$DIST_DIR/" "gs://$BUCKET/"
gcloud storage objects update "gs://$BUCKET/index.html" --cache-control="no-cache, max-age=0"

echo "Deployment successful: gs://$BUCKET"
