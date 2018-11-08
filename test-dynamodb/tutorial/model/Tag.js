module.exports = {
  TableName: 'Tag',
  KeySchema: [
    {
      AttributeName: 'Tag',
      KeyType: 'HASH'
    }
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'Tag',
      AttributeType: 'S'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
}
