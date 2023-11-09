
const { sendResponse } = require('../../responses/index')
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();


exports.handler = async(event, context) => {

    const eventToGo = JSON.parse(event.body);

    const timestamp = new Date().getTime();

    eventToGo.id = `${timestamp}`





try{
    await db.put({
        TableName: 'event-db',
        Item: eventToGo,
        


    }).promise()


    return sendResponse(200,{success: true})



  } catch (error){
    return sendResponse(500, {success: false})
  }


}