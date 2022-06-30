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
  const requestChoice = searchParams.get('choice')
  const userChoice = CHOICES.find((choice)=> choice.name === requestChoice);

  return new Response(JSON.stringify(getResults([userChoice, getRandom()])), {
    headers: { 'content-type': 'application/json' },
  })
}

function getRandom(){
  const rand=Math.floor(Math.random() * CHOICES.length) //random number between 0,1, and 2 since only 3 objects in CHOICES array
  return CHOICES[rand]
}

function getResults(choices){
  const userWins = isWinner(choices);
  const aiWins = isWinner([...choices].reverse());
  const result = userWins ?"You Win": aiWins ? "You Lose": "Draw";

  const results ={
    user: choices[0],
    ai: choices[1],
    result: result,
  }

  return results;
}

function isWinner(choices){
  return choices[0].beats === choices[1].name;
}