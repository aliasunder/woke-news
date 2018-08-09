const newHeadlines = [{ 'author': 'foo',
                        'description': 'hello',
                        'key': 'abcde',
                        'politicalLabels': [ {'label': 'liberal'}],
                        'source': { 'name': 'cool name'},
                        'title':'best article',
                        'url': 'www.google.ca',
                        'urlToImage': null
                     }];

export default async (headlinesInState, updatedHeadlines, updatedUrls) => {
   return await new Promise ((resolve, reject) => {
      resolve(newHeadlines);
   });
};