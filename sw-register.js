// Notes taken from https://developers.google.com/web/fundamentals/primers/service-workers/

// If using Chrome, you can check the status of service workers by visiting:
// chrome://inspect/#service-workers

// Another useful address is chrome://serviceworker-internals and can show information about the SW lifecycle
// but could be phased out in the future and merged into the first URL above

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {

    // Calling register on every page load is fine, the browser figures out if the SW is already registered or not
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      
      // Success
      console.log(`SW registered successfully with scope ${registration.scope}`);

      // The scope of the SW is determined by the location of the SW file itself. 
      // Example:
      // 1) If registered at the root of a domain, SW has root level scope and can receive fetch events for everything on the domain.
      // 2) If registered at root/example, SW has a scope of example and will only see events for that page or it's children.

    }, function(error) {
      
      // Failed
      console.log(`SW registration failed`, error);
    })
  })
}
