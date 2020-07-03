import querystring from "querystring";
import axios from "axios";

export async function handler(event, context) {
  
    // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const id = params.id || "ERROR";

  try {
      const response = await axios.put(`http://dev.cartegriseminute.net/apiecom/partenaire/pointDeVente/${id}/finliserInscription`, params)
    const data = response.data
    return {
      statusCode: 200,
      body: JSON.stringify({ data: data })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}

