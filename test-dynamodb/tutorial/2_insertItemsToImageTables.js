const assert = require('assert')
const dynamoDBProvider = require('../../provider/aws/dynamoDB')
const ImageTable = require('./model/Image')
const ImageTagTable = require('./model/ImageTag')
const TagTable = require('./model/Tag')

describe('Insert Multiple Images', () => {
  let documentClient = null
  let dynamodb = null

  before(() => {
    documentClient = dynamoDBProvider.documentClient
    dynamodb = dynamoDBProvider.dynamodb
  })

  it('Successfully add 1 image then check if exist on db', async () => {
    const putParams = {
      TableName: ImageTable.TableName,
      Item: {
        Id: 'id-123.png',
        Date: new Date().toISOString(),
        Vote: 0,
        Information: "I'm here just to look at the starses"
      }
    }
    await documentClient.put(putParams).promise()

    const getParams = {
      TableName: putParams.TableName,
      Key: {
        Id: putParams.Item.Id
      },
      AttributesToGet: ['Information'],
      ConsistentRead: false, // optional (true | false)
      ReturnConsumedCapacity: 'NONE' // optional (NONE | TOTAL | INDEXES)
    }
    const result = await documentClient.get(getParams).promise()
    assert.strictEqual(result.Item.Information, putParams.Item.Information)
  })

  it('Batch save 25 images then check if exist on db', async () => {
    const tableName = ImageTable.TableName
    const putParams = {
      RequestItems: {
        [tableName]: []
      }
    }
    // create 25 names
    for (i = 0; i < 25; i++) {
      let item = {
        PutRequest: {
          Item: {
            Id: {
                S: `image-00${i + 1}.png`
            },
            Date: {
                S: new Date().toISOString()
            },
            Vote: {
                N: 0 + ""
            }, 
            Reference: {
                S: `blah-test-this-${i}`
            }, 
            GroupId: {
                S: 'group123'
            }
          }
        }
      }
      putParams.RequestItems[tableName].push(item)
    }
    
    await dynamodb.batchWriteItem(putParams).promise()
    
  })
})
