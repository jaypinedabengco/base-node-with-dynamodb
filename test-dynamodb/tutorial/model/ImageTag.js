module.exports = {
  TableName: 'ImageTag',
  KeySchema: [
    {
      AttributeName: 'Tag',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'ImageId',
      KeyType: 'RANGE'
    }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'ImageId-index',
      KeySchema: [
        {
          AttributeName: 'ImageId',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'Tag',
          KeyType: 'RANGE'
        }
      ],
      Projection: {
        ProjectionType: 'KEYS_ONLY'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: 'VoteCount-index',
      KeySchema: [
        {
          AttributeName: 'Tag',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'VoteCount',
          KeyType: 'RANGE'
        }
      ],
      Projection: {
        ProjectionType: 'ALL'
      }
    }
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'Tag',
      AttributeType: 'S'
    },
    {
      AttributeName: 'ImageId',
      AttributeType: 'S'
    },
    {
      AttributeName: 'VoteCount',
      AttributeType: 'N'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
}
