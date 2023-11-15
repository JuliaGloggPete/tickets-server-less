const { sendResponse } = require('../../responses/index');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    const eventToGo = JSON.parse(event.body);
    const timestamp = new Date().getTime();


    //const indexEvent = eventToGo.purchased.length




// först scanna TABEL EVENT - antal? > 0? ->


    const newPurchase = {
        biljettnummer: timestamp + "köpt" + (
            eventToGo.purchased ? eventToGo.purchased.length + 1 : 1
        ),
        name: "Julia",
        email: "julia@julia.se"
    };

    try {
        await db.update({
            TableName: 'event-db',
            Key: { id: eventToGo.id }, 
            UpdateExpression: 'SET #purchased = list_append(if_not_exists(#purchased, :empty_list), :newPurchase)',
            ExpressionAttributeNames: { '#purchased': 'purchased' },
            ExpressionAttributeValues: {
                ':newPurchase': [newPurchase],
                ':empty_list': [],
            },
        }).promise();

        return sendResponse(200, { success: true });
    } catch (error) {
        console.error('Error updating item:', error);
        return sendResponse(500, { success: false });
    }
};

/*const { sendResponse } = require('../../responses/index')
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();


exports.handler = async(event, context) => {

    const eventToGo = JSON.parse(event.body);

    const timestamp = new Date().getTime();

    eventToGo.purchased = [`${eventToGo.artist.trim()} ${timestamp}`];





try{
    await db.put({
        TableName: 'event-db',
        Item: eventToGo,
        


    }).promise()


    return sendResponse(200,{success: true})



  } catch (error){
    return sendResponse(500, {success: false})
  }


}*/