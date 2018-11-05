const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')

// configure for local use
AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'http://localhost:8000'
})

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

exports.getDynamoDB = getDynamoDB
exports.createRandomId = createRandomId
exports.getDocumentClient = getDocumentClient