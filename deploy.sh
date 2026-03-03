#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Building the project..."
npm run build

echo "Setting GCP project to belt-prod-us..."
gcloud config set project belt-prod-us

echo "Deploying dist/ to gs://uw-agent-website..."
gcloud storage rsync -R dist/ gs://uw-agent-website/

echo "Setting cache-control for index.html..."
gcloud storage objects update gs://uw-agent-website/index.html --cache-control="no-cache, max-age=0"

echo "Deployment successful!"
