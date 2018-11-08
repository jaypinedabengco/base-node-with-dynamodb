const assert = require('assert')
const dynamoDBProvider = require('../provider/aws/dynamoDB')
const tableToAdd = require('./data/tableToAdd')

describe('Create Image Table', async () => {
  let dynamoDB = null

  it('should get a dynamodb instance', async () => {
    dynamoDB = await dynamoDBProvider.getDynamoDB()
    assert(!!dynamoDB)
  })

  // if not exist
  it('should create a table named ' + tableToAdd.TableName, async () => {
    let alreadyExist = await new Promise((resolve, reject) => {
      dynamoDB.describeTable({ TableName: tableToAdd.TableName }, err => {
        if (err) {
          if (err.code === 'ResourceNotFoundException') {
            return resolve(false)
          }
          // other error
          return reject(err)
        }
        return resolve(true)
      })
    })

    if (alreadyExist) {
      console.log('table already exists')
      return assert(true)
    }

    let success = await new Promise((resolve, reject) => {
      dynamoDB.createTable(tableToAdd, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
    assert(!!success)
  })
})
