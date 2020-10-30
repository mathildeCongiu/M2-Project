const mongoose = require('mongoose');
require('dotenv').config()
const Action = require('../models/action');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Task = require('../models/task');

Action.collection.drop();
Task.collection.drop();

const actions = [
    {
        title: "See the reality" ,
        description: "To start becoming green is not that easy. The first step for you is to realize what is happening currently in the world and to decide to do some personal actions to change that way of facts: start reading articles about climate change, watch some documentaries of plastic in the ocean…",
        // tasks: [mongoose.Types.ObjectID],
        dino: {
            name: "Greg the Egg",
            img: "images/egg.png",
            }
      },
      {
        title: "Kill Plastic" ,
        description: "Now let’s go a step further: try not to use plastic anymore. For sure, you got a collection of plastic bags at home, so reuse it when you go shopping or even better: use the textile bag. There are bulk shops everywhere now!",
        // tasks: [mongoose.Types.ObjectID],
        dino: {
            name: "Marin the Spin",
            img: "images/dino-04-background.png",
            }
      },
      {
        title: "Go local" ,
        description: "This is one of the simplest steps of all. The closer the products you buy, better for the planet. These products need less transportation so they contaminate less. Seasonal products such as fruits are good examples to start becoming greener. And this step is not just helping the planet, it also promotes the local economy.",
        // tasks: [mongoose.Types.ObjectID],
        dino: {
            name: "Toto the diplo",
            img: "images/dino-01-background.png",
            }
      },
      {
        title: "Stop meat" ,
        description: "Are you flexitarian or vegetarian and you want to level-up? With this action, you will be helping even more the environment and you will feel healthier and healthier every day!",
        // tasks: [mongoose.Types.ObjectID],
        dino: {
            name: "Daniex the T-Rex",
            img: "images/dino-02-background.png",
            }
      },
      {
        title: "Walk and ride" ,
        description: "One of the big issues for the next decades will be the massive huge of transportation, from planes to cars. At your individual level, you can change some habits: in the city, use public transportation or even better, use your own bicycle (it is good for your own health also!). And for a longer trip, try to use the train before the plane, each time that it is possible. ",
        // tasks: [mongoose.Types.ObjectID],
        dino: {
            name: "Lean the Archae",
            img: "images/dino-03-background.png",
            }
      },
      {
        title: "Start recycling" ,
        description: "A first big cornerstone for you to become a bit greener is to start recycling. For sure, you heard about that! But be aware, each country and even each city has its own way of recycling. Check the colours of the bins not to mess it!",
          // tasks: [mongoose.Types.ObjectID],
        dino: {
            name: "Pato the Allo",
            img: "images/dino-07-background.png",
            }
      }, {
        title: "Conscious consuming" ,
        description: "In our current society, consumption is the basis of the economy: a massive amount of stimuli every day will try to convince you of the necessity to acquire any kind of product. Start thinking of what you really need and don’t buy the others! ", 
        // tasks: [mongoose.Types.ObjectID],
        dino: {
            name: "Oleg the Steg",
            img: "images/dino-05-background.png",
            }
      },
      {
        title: "Fix don't throw" ,
        description: "Sometimes, when some device is broken, we buy a new one instead of fixing the one we have, but this is a really bad practice because we are increasing our waste. It is always better trying to fix it and with this action, we are also helping our personal economy!",
        // tasks: [mongoose.Types.ObjectID],
        dino: {
            name: "Juli the Brachi",
            img: "images/dino-06-background.png",
            }
      }
    
]

const tasks = [

    {
        title: `Watch "Before the Flood"`,
        experience: 5,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Read articles from “Our Planet” page:
        https://www.ourplanet.com/
        `,
        experience: 5,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Read my city code for recycling`,
        experience: 5,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Buy a bin for each waste container I have in my city`,
        experience: 10,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Buy some textile bag`,
        experience: 10,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Go to the market with my own tupper-ware to store the products I buy such as fruits, meat, fish, eggs, instead of using the usual packaging`,
        experience: 15,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Buy reusable packaging for my sandwich and my children’s like ‘Boc-and-roll’ - https://rolleat.com`,
        experience: 10,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Buy a bicycle`,
        experience: 15,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Use public transport`,
        experience: 10,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Walk to my job
        `,
        experience: 15,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Make a list of all the things I have not used during the last year`,
        experience: 10,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `When shopping, buy just what I need or what I have in my shopping list and not fall to the temptation of buying sin products!`,
        experience: 15,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Subscribe to an ecological weekly local products basket of my city. (it sustains the local economy, small producers and it is greener! 3 in 1)`,
        experience: 15,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Check the seasonal products of my region (be aware, they are far different from a region to another)`,
        experience: 5,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Try plant-based food`,
        experience: 5,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Give my clothes I don’t use anymore to an association`,
        experience: 10,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Change the battery of my mobile phone instead of buying a new one`,
        experience: 15,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `Try to do a vegan cheese `,
        experience: 15,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },
      {
        title: `My next shoes will be from vegan leather`,
        experience: 15,
        isPublic: true
        // actions: [mongoose.Types.ObjectID]
      },

]

Action.create(actions)
  .then( action => console.log(action))
  .catch(err => console.log(err))

Task.create(tasks)
  .then( task => console.log(task))
  .catch(err => console.log(err))