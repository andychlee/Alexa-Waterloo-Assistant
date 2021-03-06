/***************************************
This script creates a table on AWS DynamoDB
server. Modify the config variable to suit
your need.
***************************************/

var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

var create_params = {
    TableName : "UWParking",
    KeySchema: [       
        { AttributeName: "lot_name", KeyType: "HASH"},  //Partition key
        { AttributeName: "lot_type", KeyType: "RANGE"} // sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "lot_name", AttributeType: "S" },
        { AttributeName: "lot_type", AttributeType: "S"}
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

function createTable() {
    dynamodb.createTable(create_params, function(err, data) {
        if (err) {
            console.log("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

createTable();
