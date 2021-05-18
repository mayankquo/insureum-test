#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

# imports
. scripts/utils.sh

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/msp/tlscacerts/tlsca.insureum.com-cert.pem
export PEER0_INSURER_CA=${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls/ca.crt
export PEER0_ANALYST_CA=${PWD}/organizations/peerOrganizations/analyst.insureum.com/peers/peer0.analyst.insureum.com/tls/ca.crt
export ORDERER_ADMIN_TLS_SIGN_CERT=${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/server.crt
export ORDERER_ADMIN_TLS_PRIVATE_KEY=${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/server.key

# Set environment variables for the peer org
setGlobals() {
  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  infoln "Using organization ${USING_ORG}"
  if [ $USING_ORG == insurer ]; then
    export CORE_PEER_LOCALMSPID="InsurerMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_INSURER_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/insurer.insureum.com/users/Admin@insurer.insureum.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
  elif [ $USING_ORG == analyst ]; then
    export CORE_PEER_LOCALMSPID="AnalystMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ANALYST_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/analyst.insureum.com/users/Admin@analyst.insureum.com/msp
    export CORE_PEER_ADDRESS=localhost:9051

  else
    errorln "ORG Unknown"
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

# Set environment variables for use in the CLI container 
setGlobalsCLI() {
  setGlobals $1

  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  if [ $USING_ORG == insurer ]; then
    export CORE_PEER_ADDRESS=peer0.insurer.insureum.com:7051

  else
    errorln "ORG Unknown"
  fi
}

# parsePeerConnectionParameters $@
# Helper function that sets the peer connection parameters for a chaincode
# operation
parsePeerConnectionParameters() {
  PEER_CONN_PARMS=()
  PEERS=""
  while [ "$#" -gt 0 ]; do
    setGlobals $1
    PEER="peer0.$1"
    ## Set peer addresses
    if [ -z "$PEERS" ]
    then
	PEERS="$PEER"
    else
	PEERS="$PEERS $PEER"
    fi
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" --peerAddresses $CORE_PEER_ADDRESS)
    ## Set path to TLS certificate
    if [ $1 == insurer ]; then
      CA=PEER0_INSURER_CA
    fi
    TLSINFO=(--tlsRootCertFiles "${!CA}")
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" "${TLSINFO[@]}")
    # shift by one to get to the next organization
    shift
  done
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}
