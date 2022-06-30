const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats:"paper",
  },
  {
    name:"rock",
    beats:"scissors",
  },
];

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// myapi.com?choice=rock
async function handleRequest(request) {
  const {searchParams} = new URL(request.url)
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}
