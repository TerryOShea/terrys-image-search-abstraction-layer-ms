A microservice kind of like (and reliant upon) Google Image Search--you can search for a term and a results page and get back 
the URLs of 10 relevant images along with snippets of info about them, thumbnail URLs, and the context (another URL, the news
article from which a picture was taken e.g.). You can also see what the 10 most recent searches were. 

For example: 

'https://image-search-abstraction-layer-ms-terryoshea.c9users.io/new_search?search=meerkats&page=2'
  outputs
[{"url":"http://zoonooz.sandiegozoo.org/wp-content/uploads/2016/02/MeerkatHero.jpg","snippet":"MeerkatHero","thumbnail":
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-ozasm0ckfDfHDoef5TcJ9JOq_oWehKuRkqp7odfAbmMst2V2xXBUcaZ","context":
"http://zoonooz.sandiegozoo.org/zoonooz/tiny-mighty-meerkats/"},{...}...]