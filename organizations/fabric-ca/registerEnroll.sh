#!/bin/bash

function createInsurer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/insurer.insureum.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/insurer.insureum.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca-insurer --tls.certfiles "${PWD}/organizations/fabric-ca/insurer/tls-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-insurer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-insurer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-insurer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-insurer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/insurer.insureum.com/msp/config.yaml"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-insurer --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/insurer/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-insurer --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/insurer/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-insurer --id.name insureradmin --id.secret insureradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/insurer/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-insurer -M "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/msp" --csr.hosts peer0.insurer.insureum.com --tls.certfiles "${PWD}/organizations/fabric-ca/insurer/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/insurer.insureum.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-insurer -M "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls" --enrollment.profile tls --csr.hosts peer0.insurer.insureum.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/insurer/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls/server.key"

  mkdir -p "${PWD}/organizations/peerOrganizations/insurer.insureum.com/msp/tlscacerts"
  cp "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/insurer.insureum.com/msp/tlscacerts/ca.crt"

  mkdir -p "${PWD}/organizations/peerOrganizations/insurer.insureum.com/tlsca"
  cp "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/insurer.insureum.com/tlsca/tlsca.insurer.insureum.com-cert.pem"

  mkdir -p "${PWD}/organizations/peerOrganizations/insurer.insureum.com/ca"
  cp "${PWD}/organizations/peerOrganizations/insurer.insureum.com/peers/peer0.insurer.insureum.com/msp/cacerts/"* "${PWD}/organizations/peerOrganizations/insurer.insureum.com/ca/ca.insurer.insureum.com-cert.pem"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-insurer -M "${PWD}/organizations/peerOrganizations/insurer.insureum.com/users/User1@insurer.insureum.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/insurer/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/insurer.insureum.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/insurer.insureum.com/users/User1@insurer.insureum.com/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://insureradmin:insureradminpw@localhost:7054 --caname ca-insurer -M "${PWD}/organizations/peerOrganizations/insurer.insureum.com/users/Admin@insurer.insureum.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/insurer/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/insurer.insureum.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/insurer.insureum.com/users/Admin@insurer.insureum.com/msp/config.yaml"
}

function createOrderer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/insureum.com

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/insureum.com

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/ordererOrganizations/insureum.com/msp/config.yaml"

  infoln "Registering orderer"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the orderer admin"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the orderer msp"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/msp" --csr.hosts orderer.insureum.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/insureum.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/msp/config.yaml"

  infoln "Generating the orderer-tls certificates"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls" --enrollment.profile tls --csr.hosts orderer.insureum.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/ca.crt"
  cp "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/signcerts/"* "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/server.crt"
  cp "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/keystore/"* "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/server.key"

  mkdir -p "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/msp/tlscacerts/tlsca.insureum.com-cert.pem"

  mkdir -p "${PWD}/organizations/ordererOrganizations/insureum.com/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/insureum.com/orderers/orderer.insureum.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/insureum.com/msp/tlscacerts/tlsca.insureum.com-cert.pem"

  infoln "Generating the admin msp"
  set -x
  fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/insureum.com/users/Admin@insureum.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/insureum.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/insureum.com/users/Admin@insureum.com/msp/config.yaml"
}
