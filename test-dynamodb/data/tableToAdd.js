module.exports = {
    TableName: 'answer',
    KeySchema: [
      {
        AttributeName: 'ID',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'Type',
        KeyType: 'RANGE'
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'ID',
        AttributeType: 'S'
      },
      {
        AttributeName: 'Type',
        AttributeType: 'S'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 2,
      WriteCapacityUnits: 2
    }
  }