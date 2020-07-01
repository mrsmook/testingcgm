
exports.handler = async (event, context, callback) => {
  try {
    const { data } = await axios.get("https://dev.cartegriseminute.net/apigeo/cgDonnees/getDonnees?immatriculation=CD-125-GT&contrat=2", { headers: { "Authorization": "eUs0ejBhem1zd3huVEdJUElBd2Y4anhrWWFVTjJtSnhKUEFHc0hKRXkyZkVtS2ZMVWpqakF2bTMwVzdJa1IvSHpmL0NEWk14TUxMdmFuQWdncTZacmk5RFU5WUpnVUppOVpmUmUvT0I4TjZyVVlvMFJRM2Z5Y0ZNdkRrVmRXNjFSNFk3alVESW10eUFWSTljRWMyNTdTK2NieWpUUVFUR0hEZkwxM3A3UGFHMWdzN3JIRytUR3JYMVNuc1BYSTZTMVltWFVDMUNrU2NmZThna1NZTFhyRmhlZGZBSHFjVzhldHZuTVMxSW9kSEcrZmFpbEFlWTU3VlpXTjB1elhYQXRYd2tVYjhhVitlOHVlcVpyUHJsRXM0enpJdWlqblMyZi9pMzdqejVhYnBMSk9GdTRmbkRlUzc4SlR2SEwySHRGY3RJMGVLMS9taitlTGhwMnJQZEl4by8wbFhEOERldzRzVFhydGp5OHd5d2tpSHE1bmMzd2RhbXE0bUNCM3hNZUtRVEhHaVNTdmlXM003cWdid1pFWnR0T2dNUWpFYjZCVC9EQzgvOUpUczNHOEVRUTZ3VEdMaS95bmVGMlR5QWJxU3ZOYlEzaUJBK2lNUEpTMUZObTg5dmJ1Y2VRemZqZHFlbUpyVStWcFhzNnJHQzRxNFcyQU1VZ0xaRXc0R3hLUGtrQlhEYWRoSytrN1pBWkYzVnk3QTJyY1lkU0d4NE1tUzdFUHdHYnVUbWo0ZGRmWFgyeFo2b3FaclJTWnRTWFZYckt5Wm5IQSt2Y3d1VmE2bFBLdDllVHpKSlhENVNwODlLZ0RtdGFjdWNIRVp1cHZ1bXhyUkMxUXRwS1JyMERUblFMdndFQU1DOE4zUmJDbGNpNXRQS3pIUHJLVmlmWi9uQnIrMnBTNVRJV1BxbHhoZzdlTHpDZlVoTnYvMzg=" } });

    let response = [];

    // Grab the items and re-format to the fields we want
    if (data.length) {
      response = data.immat;
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  } catch (err) {
    callback(err);
  }
};
