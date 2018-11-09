const assert = require('assert')
const dynamoDBProvider = require('../../provider/aws/dynamoDB')

describe('Fetch Images', () => {
  let documentClient = null
  let dynamodb = null

  before(() => {
    documentClient = dynamoDBProvider.documentClient
    dynamodb = dynamoDBProvider.dynamodb
  })

  it(`Get image with id of 'id-123.png'`, async () => {
    const getParams = {
      TableName: 'Image',
      Key: {
        Id: 'id-123.png'
      },
      AttributesToGet: ['Id'],
      ConsistentRead: false, // optional (true | false)
      ReturnConsumedCapacity: 'NONE' // optional (NONE | TOTAL | INDEXES)
    }
    const result = await documentClient.get(getParams).promise()

    // is object and has value
    assert(result instanceof Object && !!result.Item, 'Image Exist')
    assert.strictEqual(result.Item.Id, getParams.Key.Id, 'Same Id')
  })

  it(`Fetch images with ids that starts with 'image-00'`, async () => {
      
  })
})
