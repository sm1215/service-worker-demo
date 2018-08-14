var CACHE_NAME = 'myList';
var urlsToCache = [
  'data.js'
  // 'service-worker/data.js'
]
var cacheWhitelist = ['data.js'];

// Sample
// var urlsToCache = [
//   '/',
//   '/styles/main.css',
//   '/script/main.js'
// ];

self.addEventListener('install', function(event) {
  // Perform install steps

  // After installation, we get a callback function that can be used for the following:
  // 1. Open a cache.
  // 2. Cache our files.
  // 3. Confirm whether all the required assets are cached or not.

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  )

  // If all files are successfully cached, then the service worker will be installed
  // If *any* files fail to download, the installation of the service worker fails.

  // This means, you can count on all of your files being present on success but the trade is -
    // Caching a large amount of files can increase the chances that one file will fail and 
    // this causes the whole service worker install to fail.
});

// Listen to fetch events
self.addEventListener('fetch', function(event) {
  event.respondWith(

    // Try to see if anything that was requested matches what's been cached
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if(response) {
          return response;
        }

        // Otherwise make a network request
        // Important: Clone the request. A request is a stream and can only be consumed once.
        // Since we are consuming this once by cache and once by browser for fetch, we need to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            // 1. Ensure the response is valid and has a status of 200
            // 2. Make sure the response is *basic*, which indicates that it's a request from our origin.
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Important: Clone the response. A response is a stream and because we want the browser to 
            // consume the response as well as the cache consuming the response, we need to clone it so we have two streams. 
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        )

        // return fetch(event.request);
      })
  )
});

// This portion is used when the service worker itself is updated
// This is a good opporunity for to introduce cache management
self.addEventListener('activate', function(event) {

  //  Sample
  // var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheNames) {
          if(cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
});

// Service Worker lifecycle

/*
* No service worker
* 1) Installing
* 2A) Activated - continues to step 3
* 2B) Error - stops
* 3) Activated
* 4) Idle - listens for fetch requests
* 5A) Terminated
* 5B) Fetch / Message
*/



