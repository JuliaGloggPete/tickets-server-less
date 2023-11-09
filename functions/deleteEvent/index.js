const { sendResponse } = require('../../responses/index')
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();


  exports.handler = async(event, context) =>{

    const {eventToGoId} = event.pathParameters;





try{
    await db.delete({
        TableName: 'event-db',
        Key: {id: eventToGoId},
        


    }).promise()


    return sendResponse(200,{success: true})



  } catch (error){
    return sendResponse(500, {success: false, message: 'could not delete'})
  }


}