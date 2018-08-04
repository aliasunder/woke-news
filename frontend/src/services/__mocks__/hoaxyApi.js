const mockData = [{  'canoninical_url': 'https://www.google.com',
                     'date_published' : "2017-02-24T00:00:00:000Z",
                     'domain': 'google.com',
                     'site-type': 'claim',
                     'sentiment': 0.456782,
                     'title':'best article'
                  }];

export default async (targetValue) => {
   return await new Promise ((resolve, reject) => {
      resolve(mockData);
   });
};