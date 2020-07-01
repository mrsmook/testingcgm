import querystring from "querystring";
import axios from "axios";

export async function handler(event, context) {
  
    // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string


  const params = querystring.parse(event.body);
  const id = params.id || "ERROR";
  const site = params.site || "ERROR";
  const env = params.env || "ERROR";
  const nom = params.nom || "ERROR";
  const mot_de_passe = params.mot_de_passe || "ERROR";
  const mot_de_passe_confirmation = params.mot_de_passe_confirmation || "ERROR";
  const contact_nom = params.contact_nom || "ERROR";  
  const contact_prenom = params.contact_prenom || "ERROR";
  try {

    const response = await axios.get(`http://dev.cartegriseminute.net/apiecom/pointDeVente/${id}/finliserInscription`, { headers: { Accept: "application/json",
                                                                                                                                                    Authorization: "eUs0ejBhem1zd3huVEdJUElBd2Y4anhrWWFVTjJtSnhKUEFHc0hKRXkyZkVtS2ZMVWpqakF2bTMwVzdJa1IvSHpmL0NEWk14TUxMdmFuQWdncTZacmk5RFU5WUpnVUppOVpmUmUvT0I4TjZyVVlvMFJRM2Z5Y0ZNdkRrVmRXNjFSNFk3alVESW10eUFWSTljRWMyNTdTK2NieWpUUVFUR0hEZkwxM3A3UGFHMWdzN3JIRytUR3JYMVNuc1BYSTZTMVltWFVDMUNrU2NmZThna1NZTFhyRmhlZGZBSHFjVzhldHZuTVMxSW9kSEcrZmFpbEFlWTU3VlpXTjB1elhYQXRYd2tVYjhhVitlOHVlcVpyUHJsRXM0enpJdWlqblMyZi9pMzdqejVhYnBMSk9GdTRmbkRlUzc4SlR2SEwySHRGY3RJMGVLMS9taitlTGhwMnJQZEl4by8wbFhEOERldzRzVFhydGp5OHd5d2tpSHE1bmMzd2RhbXE0bUNCM3hNZUtRVEhHaVNTdmlXM003cWdid1pFWnR0T2dNUWpFYjZCVC9EQzgvOUpUczNHOEVRUTZ3VEdMaS95bmVGMlR5QWJxU3ZOYlEzaUJBK2lNUEpTMUZObTg5dmJ1Y2VRemZqZHFlbUpyVStWcFhzNnJHQzRxNFcyQU1VZ0xaRXc0R3hLUGtrQlhEYWRoSytrN1pBWkYzVnk3QTJyY1lkU0d4NE1tUzdFUHdHYnVUbWo0ZGRmWFgyeFo2b3FaclJTWnRTWFZYckt5Wm5IQSt2Y3d1VmE2bFBLdDllVHpKSlhENVNwODlLZ0RtdGFjdWNIRVp1cHZ1bXhyUkMxUXRwS1JyMERUblFMdndFQU1DOE4zUmJDbGNpNXRQS3pIUHJLVmlmWi9uQnIrMnBTNVRJV1BxbHhoZzdlTHpDZlVoTnYvMzg=" } })
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

