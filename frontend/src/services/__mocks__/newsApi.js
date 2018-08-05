const newHeadlines = [{  'author': 'foo',
                     'description': 'hello',
                     'key': 'abcde',
                     'source': { 'name': 'cool name'},
                     'title':'best article',
                     'url': 'www.google.ca',
                     'urlToImage': null
                  }];

const updatedUrls = [ 'www.google.ca' ]

export default async (newsPage) => {
   return await new Promise ((resolve, reject) => {
      resolve({ newHeadlines, updatedUrls });
   });
};