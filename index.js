const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
  const { searchParams } = new URL(request.url) // myapi.com?choice=rock -- this is searchParams
  const requestChoice = searchParams.get('choice') //requestChoice from searchParams.get('choice')
  const userChoice = CHOICES.find((choice)=> choice.name === requestChoice); //find userChoice from user definition.

  return new Response(JSON.stringify(getResults([userChoice, getRandom()])), { //gets back userChoice and randomChoice, feeds to getResults, then strigifies it and sends this as a New Response to the backend of the application
    headers: { 'content-type': 'application/json' }, //for the headers we return content-type: application-json as an object
  })
}

function getRandom(){ //random function
  const rand=Math.floor(Math.random() * CHOICES.length) //random number between 0,1, and 2 since only 3 objects in CHOICES array
  return CHOICES[rand] //returns randomchoice b/w 0,1 or 2.
}

function getResults(choices){ //passing in array of 2 choices(usersChoice, aiChoice)
  const userWins = isWinner(choices); //
  const aiWins = isWinner([...choices].reverse()); //make a copy of the array and then reverse the order, pass it into isWinner and store in aiWins
  const result = userWins ?"You Win": aiWins ? "You Lose": "Draw"; //terniary operator for comparison:
                //if userWins return You Win or if aiWins return YouLose, if none then return Draw
  
  const results ={ //returns a results object with user:choice, ai:choice and result:win,lose or draw
    user: choices[0],
    ai: choices[1],
    result: result,
  }

  return results;
}

function isWinner(choices){ //function isWinner passing in choices
  return choices[0].beats === choices[1].name; //see if choices[0] beats choices[1] meaning if UserChoice beats AIChoice
}