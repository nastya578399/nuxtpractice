export default function(context, inject) {
  const appId = 'F9PCD360FH';
  const apiKey = 'b83b39b3ef3fa5c5dd143960b3a934fe';

  inject('dataApi', {
    getHome
  })
  async function getHome(homeId) {
    const response = await fetch(`http://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
      headers:{
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
      }
    })

    const json = await response.json()
    return json 
  }
}