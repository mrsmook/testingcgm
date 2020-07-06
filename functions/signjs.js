const xmlrpc = require ("davexmlrpc");


const urlEndpoint = "https://selim@cartegriseminute.fr:Eminam1919@sign.test.cryptolog.com/sign/rpc/";
const verb = "signer.sign";
const params = {
        "#base64":"aGVsbG8gd29ybGQ="
    }
;
const format = 'xml';


exports.handler = function(event, context, callback) {
    xmlrpc.client (urlEndpoint, verb, params, format, function (err, data) {
        if (err) {
            callback(err, {
                statusCode: 500,
                body: JSON.stringify({ msg: err }) // Could be a custom message or object i.e. JSON.stringify(err)
            });
        }
        else {
            callback(data, {
                statusCode: 200,
                body: JSON.stringify({ msg: data }) // Could be a custom message or object i.e. JSON.stringify(err)
            });
        }
    });
}