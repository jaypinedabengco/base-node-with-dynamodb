const assert = require('assert')
const dynamoDBProvider = require('../../provider/aws/dynamoDB')
const ImageTable = require('./model/Image')
const ImageTagTable = require('./model/ImageTag')
const TagTable = require('./model/Tag')

describe('Create Tutorial Tables', async () => {
  let dynamodb = null

  before(() => {
    // get db
    dynamodb = dynamoDBProvider.dynamodb
    // delete existing table?
  })

  it('should get a dynamodb instance', () => {
    assert(!!dynamodb)
  })

  it(`should create '${ImageTable.TableName}' table if not exist`, async () => {
    // check first if exists
    const isAlreadyExists = await _tableAlreadyExist(dynamodb, ImageTable.TableName)

    if (!isAlreadyExists) {
      await dynamodb.createTable(ImageTable).promise()
      // no error
      assert(true)
    }
  })

  it(`should create '${ImageTagTable.TableName}' table if not exist`, async () => {
    // check first if exists
    const isAlreadyExists = await _tableAlreadyExist(dynamodb, ImageTagTable.TableName)

    if (!isAlreadyExists) {
      await dynamodb.createTable(ImageTagTable).promise()
      // no error
      assert(true)
    }
  })


  it(`should create '${TagTable.TableName}' table if not exist`, async () => {
    // check first if exists
    const isAlreadyExists = await _tableAlreadyExist(dynamodb, TagTable.TableName)

    if (!isAlreadyExists) {
      await dynamodb.createTable(TagTable).promise()
      // no error
      assert(true)
    }
  })

})

/**
 * 
 * @param {*} dynamodb 
 * @param {*} tableName 
 */
const _tableAlreadyExist = async (dynamodb, tableName) => {
  // check first if exists
  return await dynamodb
    .describeTable({ TableName: tableName })
    .promise()
    .then(() => console.log(`Table '${tableName}' already exists`))
    .then(() => true)
    .catch(err => {
      if (err.code === 'ResourceNotFoundException') {
        // do nothing
        return false
      }
      return Promise.reject(err)
    })
}
