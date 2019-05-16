addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const username = 'ANY-USERNAME';
const password = 'ANY-PASSWORD';
const hash = btoa(`${username}:${password}`);

async function handleRequest(request) {
  const authorizationHeader = request.headers.get('Authorization')
  if (!authorizationHeader || authorizationHeader !== `Basic ${hash}`) {
    return new Response(null, {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic'
      }
    });
  }
  
  return fetch(request);
}

