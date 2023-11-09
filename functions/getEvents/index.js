
const { sendResponse } = require('../../responses/index')
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();



  exports.handler = async(event, context) =>{

    const {Items} = await db.scan({
        TableName:'event-db'

    }).promise()


    return sendResponse(200,{success: true, events : Items})



  }


