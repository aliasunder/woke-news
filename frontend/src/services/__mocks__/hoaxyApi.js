const searchData = [{   'canoninical_url': 'https://www.google.com',
                        'date_published' : "2017-02-24T00:00:00:000Z",
                        'domain': 'google.com',
                        'site_type': 'claim',
                        'title':'best article'
                     }];

export default async (targetValue) => {
   return await new Promise ((resolve, reject) => {
      resolve(searchData);
   });
};