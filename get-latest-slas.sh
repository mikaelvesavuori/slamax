#!/bin/bash

# Setting up essential variables and getting name of latest release
SLA_LATEST_RELEASE_PAGE="https://api.github.com/repos/mikaelvesavuori/cloud-sla/releases/latest"
SLA_URL_DETAILS=$(curl -s $SLA_LATEST_RELEASE_PAGE | grep "browser_download_url.*tar.gz")
SLA_DOWNLOAD_URL=$(echo "{$SLA_URL_DETAILS}" | jq '.browser_download_url' -r)
SLA_FILE_NAME=$(echo $SLA_DOWNLOAD_URL | sed 's|.*/||')

# Download and untar file then get folder name
curl -fsSL $SLA_DOWNLOAD_URL -O
tar -xf $SLA_FILE_NAME
SLA_FOLDER_NAME=$(echo $SLA_FILE_NAME | sed -e 's/.tar.gz//')

# Copy SLA data into our source code and remove the rest of the downloaded materials
cp -R $SLA_FOLDER_NAME/data/ src/domain/data/
rm -rf $SLA_FOLDER_NAME
rm $SLA_FILE_NAME
