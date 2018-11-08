const dynamoDBProvider = require('./../../provider/aws/dynamoDB')
const tableToAdd = require('./tableToAdd')

module.exports = {
  TableName: tableToAdd.TableName,
  Item: {
    ID: dynamoDBProvider.createRandomId(),
    Type: 'Blah'
  }
}