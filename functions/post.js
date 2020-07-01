exports.handler = (event, context, callback) => {
 console.log(‘Received event:’, event);
 var response = {
 "isBase64Encoded": false,
 "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://cartegriseminute.fr'},
 "statusCode": 200,
 "body": "{\"result\": \"Success.\"}"
 };
 callback(null, response);
};
