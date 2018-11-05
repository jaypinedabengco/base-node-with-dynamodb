const assert = require('assert')
const dynamoDBProvider = require('../provider/aws/dynamoDB')
const itemToAdd = require('./data/itemToAdd')

describe('Add Item', async () => {
  let documentClient = null

  it('should get a dynamodb document client instance', async () => {
    documentClient = await dynamoDBProvider.getDocumentClient()
    assert(!!documentClient)
  })

  // if not exist
  it(`should add item to '${itemToAdd.TableName}'`, async () => {

    let success = await new Promise((resolve, reject) => {
      documentClient.put(itemToAdd, (err, data) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        return resolve(data)
      })
    })
    assert(!!success)
  })
})
