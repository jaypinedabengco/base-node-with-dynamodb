const assert = require('assert')
const dynamoDBProvider = require('../../provider/aws/dynamoDB')

describe('Get Image Examples', () => {
  let documentClient = null
  let dynamodb = null

  before(() => {
    documentClient = dynamoDBProvider.documentClient
    dynamodb = dynamoDBProvider.dynamodb
  })

  it(`Get image with Id of 'id-123.png'`, async () => {
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
})

describe('Scan Image Examples', () => {
  let documentClient = null
  let dynamodb = null

  before(() => {
    documentClient = dynamoDBProvider.documentClient
    dynamodb = dynamoDBProvider.dynamodb
  })

  it(`Scan all images'`, async () => {
    let params = {
      TableName: 'Image',
      Limit: 200 // Limits the number of results per page
    }
    const result = await documentClient.scan(params).promise()
    console.log(result)

    // next
    if (result.LastEvaluatedKey) {
      params.ExclusiveStartKey = result.LastEvaluatedKey
      const nextResult = await documentClient.scan(params).promise()
      console.log(nextResult)
    } else {
      console.log('no more next')
    }
  })

  it(`Scan all images with 'GroupId' of 'group123'`, async () => {
    let params = {
      TableName: 'Image',
      Limit: 200,
      //   AttributesToGet: ['Id', 'GroupId', 'Information'],
      ExpressionAttributeValues: {
        ':value': 'group123'
      },
      FilterExpression: 'GroupId = :value'
    }
    const result = await documentClient.scan(params).promise()
    console.log(result)
  })

  it(`Scan all images with value that starts with 'Reference' of 'blah-test-this-1'`, async () => {
    let params = {
      TableName: 'Image',
      Limit: 200,
      AttributesToGet: ['Id', 'Reference', 'GroupId'],
      ScanFilter: {
        Reference: {
          ComparisonOperator: 'BEGINS_WITH',
          AttributeValueList: ['blah-test-this-1']
        }
      }
    }
    const result = await documentClient.scan(params).promise()
    console.log(result)
  })

  it(`Scan all images with value that starts with 'Id' of 'image-001'`, async () => {
    let params = {
      TableName: 'Image',
      Limit: 200,
      AttributesToGet: ['Id', 'Reference', 'GroupId'],
      ScanFilter: {
        Id: {
          ComparisonOperator: 'BEGINS_WITH',
          AttributeValueList: ['image-001']
        }
      }
    }
    const result = await documentClient.scan(params).promise()
    console.log(result)
  })

  it(`Query all ImageTags that has Tag of 'Sample 101'`, async () => {
    let params = {
      TableName: 'ImageTag',
      KeyConditionExpression: 'Tag = :tag',
      ExpressionAttributeValues: {
        ':tag': {
          S: 'Sample 101'
        }
      }
    }
    const result = await dynamodb.query(params).promise()
    console.log(JSON.stringify(result))
  })

  it(`Query all ImageTags that has ImageId of 'image-008.png'`, async () => {
    let params = {
      TableName: 'ImageTag',
      KeyConditionExpression: 'ImageId = :id',
      ExpressionAttributeValues: {
        ':id': {
          S: 'image-008.png'
        }
      }
    }
    const result = await dynamodb.query(params).promise()
    console.log(JSON.stringify(result))
  })
})
