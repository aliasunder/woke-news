const mockData = [{  'author': 'foo',
                     'description': 'hello',
                     'key': 'abcde',
                     'politicalLabels': [ {'label': 'liberal'}],
                     'sentiment': 0.456782,
                     'source': { 'name': 'cool name'},
                     'title':'best article',
                     'url': 'www.google.ca',
                     'urlToImage': null
                  }];

export default async (headlinesInState, updatedHeadlines, updatedUrls) => {
   return await new Promise ((resolve, reject) => {
      resolve(mockData);
   });
};