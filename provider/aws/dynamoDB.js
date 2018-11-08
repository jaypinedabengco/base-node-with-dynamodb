const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')
const bluebird = require('bluebird')

// configure for local use
AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'http://localhost:8000'
})

// add promise
AWS.config.setPromisesDependency(bluebird);

const dynamodb = new AWS.DynamoDB()
const documentClient = new AWS.DynamoDB.DocumentClient()

///

const getDynamoDB = async () => {
  // can add some logic here..
  return dynamodb
}

const getDocumentClient = async () => {
  return documentClient
}

/**
 *
 */
const createRandomId = async () => {
  return uuidv4()
}

///

exports.dynamodb = dynamodb
exports.documentClient = documentClient
exports.getDynamoDB = getDynamoDB
exports.createRandomId = createRandomId
exports.getDocumentClient = getDocumentClient
