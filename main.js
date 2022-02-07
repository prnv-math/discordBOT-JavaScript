//beginning of js code
const discord = require("discord.js");
const config = require("./config.json");

var jimp = require('jimp');

const { MongoClient } = require('mongodb');
const { FONT_SANS_10_BLACK } = require("jimp");
const url = 'mongodb://localhost:27017';
const dbClient = new MongoClient(url);

const dbName = 'jsdb';

const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", 'GUILD_MESSAGE_REACTIONS'] })

globalOBJ = {};
const prefix = "/"
console.log("running code")
ownerid = config.ownerid
console.log("code ownerid : " + ownerid)



	// .setColor('#0099ff')
	// .setTitle('Some title')
	// .setURL('https://discord.js.org/')
	// .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	// .setDescription('Some description here')
	// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
	// .addFields(
	// 	{ name: 'Regular field title', value: 'Some value here' },
	// 	{ name: '\u200B', value: '\u200B' },
	// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
	// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
	// )
	// .addField('Inline field title', 'Some value here', true)
	// .setImage('https://i.imgur.com/wSTFkRM.png')
	// .setTimestamp()
	// .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

async function dbmain() 
{
  await dbClient.connect();
  console.log('Connected successfully to ' + url);
  const db = dbClient.db(dbName);
  globalOBJ.collection = db.collection('documents');
  
  // globalOBJ.collection.deleteMany({});
  globalOBJ.collection.deleteMany({userid : {$nin : [ownerid, 0 , 1]}});
  
  globalOBJ.collection.updateOne({userid:ownerid}, {$set : {likes: 35,bottom : 'none' , rstatus : 'single', username : 'cass',level : 1,accessory : 'none',top : 'none',outfit : 'none',favpet : 'none', employment : 'student', tag : '#new_around_here'}})
 
  // const insertResult = await globalOBJ.collection.insertMany([{userid: 1 ,  gameid: 2 ,  status: 'ok' }]);
 
  // userid = 0 = bot details
  // userid = 1 = item name and image url {userid : 1, item1 : url, item2 : url, item3 : url} search res[0][outfit]
  
  // await globalOBJ.collection.insertOne({userid : 1, female_teen : '', male_teen : ''});
  // await globalOBJ.collection.updateOne({userid : 1}, {$set : {female_teen : 'https://i.imgur.com/erzQLL9.jpg',male_teen : 'https://i.imgur.com/9fuHTih.jpg'}});

  // const r = await globalOBJ.collection.insertOne({userid : 0, gameid : 11121513, name : 'bot', notice : 'no info'});

  let res = await globalOBJ.collection.find({userid:0}).toArray();
  console.log(res);

  // =============================================================
  console.log("Bot gameID : "+res[0]['gameid']);
  res = await globalOBJ.collection.find({userid:ownerid}).toArray();
  console.log(res[0]);
  console.log("find owner gameid : " + res[0]['gameid']);
  // ============================================================
  
  return 'done.';

}

function deluser(uid) {
  globalOBJ.collection.deleteOne( { userid : uid } );
}
// deluser(ownerid);

async function getStatus(uid) {
  // console.log("whole collection : ");
  // globalOBJ.collection.find().toArray();
  let res = await globalOBJ.collection.find({userid:uid}).toArray();
  console.log("get status res : " + res[0]['status']);
 
  try {
    // globalOBJ.status = res[0]['status']; 
    return res[0]['status'];
  }
  catch{
    return 'no status';
  }
  // if (res[0] == undefined)
  //   {return 0;}
  // if (res[0]['status'] != undefined) 
  // {
  //   globalOBJ.status = res[0]['status']; 
  //   return res[0]['status'];
  // }
  // else return 'x';
}

async function getGameid(uid) {

  let res = await globalOBJ.collection.find({userid:uid}).toArray();
  
  try {
    // globalOBJ.gameid = res[0]['gameid']; 
    return res[0]['gameid'];
  }
  catch{
    return -1;
  }
  // console.log(res[0] == undefined);
  // // console.log(res[0]['gameid'] == undefined);
  // if (res[0] == undefined){
  //   return 0;
  // }
  // if (res[0]['gameid'] != undefined) 
  // { 
  //   globalOBJ.gameid = res[0]['gameid']; 
  //   return res[0]['gameid'];
  // }
  // else return 0;
}

async function createUser(uid) {
 const res = await globalOBJ.collection.find({userid:0}).toArray();
 const g = res[0]['gameid'];
 console.log("bot gameid : "+g);
 if ((g + 1) < 99999999) 
 {
 const newENtry = await globalOBJ.collection.insertOne({userid: uid ,  gameid: g + 1 ,  status: 'agreed' });
 const updated = await globalOBJ.collection.updateOne({userid:0}, {$set : {gameid : (g+2)}}); 
 let res = await globalOBJ.collection.find({userid:uid}).toArray();

 console.log('newUserid : ' + res[0]['gameid'] + " , newbotgameid : " + (g+2));
//  console.log('new entry status :  '+newENtry[0]['status']);
 globalOBJ.gameid = res[0]['gameid'];
 console.log('globalobj newusergameid :' + globalOBJ.gameid);
 globalOBJ.status = res[0]['status'];
 }
 else 
 {
   console.log('db gameid overflow');
 }
}

function changeStatus(uid, s) {

  globalOBJ.collection.updateOne({userid:uid}, {$set : {status : s}});
  // const res = await globalOBJ.collection.find({userid:uid}).toArray();
}

client.on('ready', () => {
  // client.setStatus('available')
  client.user.setActivity(`/help`, {type: 'LISTENING'});
  dbmain();

});


// );

client.on('interactionCreate', async interaction => {
	
  let e = {};
  const channel=interaction.channel;

  function emb(t,desc="", col = 0x3AABC2) 
  {
          const embedVar = new discord.MessageEmbed();
          embedVar.setTitle(t);
          embedVar.setColor(col);
          embedVar.setDescription(desc);
  
          return embedVar;
  }
  // ==============


  
  // ==============
  async function jimpLoad()
  {
    
    return imgbuf;
  }
  async function customizepfp() {
    
  //  Take image from URL , and generate a buffer for it. 
  //  In order to use image in URL in embed.
  // ========================================
  const font = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
  let bg = await jimp.read('https://i.imgur.com/iIUyIgf.jpg');
  bg.quality(60);
  bg.resize(590, 128);
  let img1 = await jimp.read('https://i.imgur.com/erzQLL9.jpg');
  img1.resize(64,64);
  let img2 = await jimp.read('https://i.imgur.com/9fuHTih.jpg');
  img2.resize(64,64);
  bg.composite(img1, 220,30);
  bg.composite(img2,300,30);
  bg.print(font, 249, 100, '1                  2');

  let imgBuf = await bg.getBufferAsync(jimp.AUTO);
  // =========================================  
    const embb = {
      color: 0x3AABC2,
      title: interaction.member.name,
      url: '',
      author: {
        name : interaction.member.user.username,
        icon_url: interaction.member.displayAvatarURL(),
        url: '',
      },
      description: '`1 : please react with the number associated with a character`',
      // thumbnail: {
      //   url: 'https://i.imgur.com/othxZum.png',
      // },
      image : {
        url : 'attachment://image.jpg'
      }
    };
    const m1 = await channel.send({embeds : [embb], files: [{name: "image.jpg", attachment:imgBuf}]})
    let char = "";
    const emo = ['1️⃣','2️⃣'];
    try {
     await m1.react(emo[0]);
     await m1.react(emo[1]);
    }catch (err) {
       console.error('failed to add reaction [' + err + "]");
    }

    const filter = (reaction, user) => {
      // console.log(reaction.emoji.name);
         return emo.includes(reaction.emoji.name) && (user.id === interaction.member.id);
    };
    
    m1.awaitReactions({ filter, max: 1, time: 15000, errors: ['time'] })
     .then(async collected => {
      const reaction = collected.first();

      if (reaction.emoji.name === emo[0]) {
        char = "female_teen";
      }
      else {
        char = "male_teen";
      }
      m1.channel.send(">>> 2 : please enter a username\n```you can use letters, digits, or underscore.\nusername must begin with a letter.\nmust be at least 4 characters long (max. 16).```");
      const filter = response => {
        if (response.author != interaction.member.user) {
          return false;
        }
        console.log("called filter2")
          const s = response.content;
          let check = false; 
          const dictionary = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
          const start = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          for (i in start) {
            if (s.startsWith(start[i])) {
              console.log("s starts with /" + start[i] +"/")
              check = 1;
            }
          }
          if (check == 0) {
            channel.send('`invalid starting symbol`')
          }
          // else{
          //   console.log('check after start check : ' + check)
          // }
          const arr = dictionary.split('');
          for (j in s) {
              if (arr.includes(s[j]) === false)
              { 
                channel.send("`invalid character detected`")
                check = 0;
                break;
              }
          }
          if (s.length < 4) {
              channel.send("`insufficient length`");
              check = 0;
          }
          if (s.length > 16) {
            channel.send("`maximum length is 16 characters.`");
            check = 0;
          }
        console.log('check : ' + check);
        // channel.send("`you entered " + s + '`');
        return check;
      };
      interaction.channel.awaitMessages({ filter , max: 1, time: 45000, errors: ['time'] })
        .then (collected => {
          // channel.send(collected.content);
          const res = collected.first().content;
          console.log("username : " + res);
          changeStatus(interaction.member.id, "profile_created");
          globalOBJ.collection.updateOne({userid:interaction.member.id}, {$set : {likes : 0,char : char, bottom : 'none' , rstatus : 'single', username : res,level : 1,accessory : 'none',top : 'none',outfit : 'none',favpet : 'none', employment : 'student', tag : '#new_around_here'}})
          .then (() => {
          channel.send('`[success] profile created for ' + res + '`\n`try out other commands or use /help`');
          });
        // ==============
        })
        .catch(collected => {
          console.log(collected)
          channel.send('> no response found ');
        });
      
      // ==============
     })
     .catch(collected => {
     m1.reply('`You reacted with neither emotes.`');
     });
  
   
  //  =============================
  }

  if (!interaction.isCommand()) return;
  // console.log(interaction.toString())
  // console.log(interaction)
  const checkusr = await getGameid(interaction.member.id);
  console.log('checkuser = ' + checkusr);
  if ((checkusr < 0) && ((interaction.commandName != 'start') && (interaction.commandName != 'help')) && (interaction.member.id != ownerid))
  {
    // try {
      // console.log("trigger user check in db");

        interaction.reply("You are a new face! Check out `"+prefix+" help` or `"+prefix+" start` <@" + interaction.member.id + ">");
        return;
      
        // else {
      //   console.log(checkusr + 'is existing user');
        
      // }
  }
	if (interaction.commandName === 'ping') {
		await interaction.reply({ content: 'Pong!', ephemeral: 0 });
	}
  else if (interaction.commandName === 'commit')
  {
       if (interaction.member.id === ownerid) 
          { 
            const filter = response => {
            const s = response.content.split(' ', 1)[0];
            console.log(s + " , " + ['quit', 'pin'].includes(s));
            return (response.author.id == ownerid && ['quit', 'pin'].includes(s));
          };
            interaction.reply("`awaiting further instructions...`");

            channel.awaitMessages({ filter , max: 1, time: 50000, errors: ['time'] })
            .then (collected => 
              {
              if (collected.first().content === 'quit') 
              { //note to self : i missed first().content part before
              interaction.channel.send("``` shutting down ```")
              .then (() => {
              console.log("COMMIT QUIT")
              dbClient.close();
              process.exit();
              });

              }
              else if (collected.first().content.startsWith('pin')) 
              {
                let argarray = collected.first().content.split('pin ');
                argarray.splice(0,1);
                // console.log(argarray[0]);
                globalOBJ.collection.updateOne({userid : 0}, {$set : {notice : argarray[0]}})
                .then (() => {
                  channel.send("`updated noticeboard`");
                  client.channels.cache.get('936801672984920116').send("`" + argarray[0] + "`")
                }
                )
                .catch(collected => {
                  channel.send("`err`");
                })
              }
            })
            .catch(collected => {
              console.log(collected);
              channel.send('> no response found ');
            });
          }
       else
          { 
            // channel.send(interaction.member.id);
            // channel.send(ownerid);
            console.log ("Mismatch ids for staff only cmd : " + interaction.member.id + " vs " + ownerid)
            interaction.reply("Nope.");
          }
  }
  else if(interaction.commandName === 'help')
  {
    e=emb("**For more info:** ` "+prefix+" help [command] `", "**Add ` "+prefix+" ` before any command**");
    e.setAuthor(
      {
        name: 'Commands',
        url: '',
        iconURL: 'https://i.imgur.com/cweJrD0.png'
    }
    )
    function em(a, b, c="")
    {
    let st = "";
    console.log(b);
    for (const s in b)
    {
      st += "`" + b[s] +"`, ";
    }
 
    st = st.slice(0, -2);
    e.addField("\u200B"+"\n" + "\u200B" + a,st + c, false)
    }
    

    em(":bookmark: Profile commands :bookmark:", ["start", "profile", "attributes", "boosts", "events", "like", "inventory", "hashtag","cooldowns"])
    em(":beginner: Menu commands :beginner:", ["bank", "shop", "jobs", "education", "health", "apartments", "relationship"])
    em(":gift: Rewards commands :gift:", ["daily", "weekly", "votetrend", "checkin", "redeem", "quiz"])
    em(":currency_exchange: Interaction commands :currency_exchange:", ["mail", "give", "phone"])
    em(":diamonds: Misc commands :diamonds:", ["support", "gameplayinfo", "rules", "noticeboard", "invite","sos"])

    await interaction.reply({ embeds: [e] });
    
  }
  else if (interaction.commandName === 'rules')
  {
    e = emb("DISCO-LIFE : Rules", "`rules are necessary and understood regulations you must not defy in order to create a frinedly environment for everyone. Doing so will result in severe punishment, or a ban to make it a better place for other players.`")
    e.addField("\u200B"+"\n" + "\u200B" +"#1 ", "In any social platform the game provides wihtin itself, do not be toxic , bully, intimidate, shame, insult, harass, troll, flame, cause upset or shock to another person, or exhibit vulgar , racist , or __any kind of hostile behavior,__ towards other players in the game.");
    e.addField("\u200B"+"\n" + "\u200B" +"#2 ", "Do not engage in __illegal things__ within the game! including breaking Discord ToS, using hacks, mods, cheats, automation software (commonly known as 'scripts', 'macros', or 'bots').");
    e.addField("\u200B"+"\n" + "\u200B" +"#3 ", "Do not use resources gathered in the game for __'real money trading'.__");
    e.addField("\u200B"+"\n" + "\u200B" +"#4 ", "You may not exploit __errors in design__ ('bugs') or features which have not been documented to gain access which is otherwise not available or to gain an advantage over other Users, and You may not communicate any exploitable issues either directly or through public posting, to any other users of Disco'Life's Services")
    e.addField("\u200B"+"\n" + "\u200B" +"#5 ", "While allowed to select a username for any item in the game, __do not use" +  " INAPPROPRIATE OR DISALLOWED NAMES.__ the game RESERVES THE RIGHT TO REJECT ANY NAME IT CONCLUDES, IN ITS SOLE DISCRETION, IS OFFENSIVE, OBSCENE, OR THAT OTHERWISE VIOLATES THE NAMING POLICY FOR USERNAMES.".toLocaleLowerCase());
    // let txt = "";
    // for (let x in e) {
    //   txt += e[x] + " ";
    // };
    // console.log (txt);
    interaction.reply({ embeds: [e] });
    e = {};
  }
  else if(interaction.commandName === 'start')
  {
    if (checkusr < 0) 
    {
    const message = await interaction.reply({content: ">>> [ booting up ]\n\nYou want to play Disco-Life! \nCheck out gameplayinfo,\nMake sure you have read and\naccepted the rules .\nThen react with :thumbsup: !\n\n`"+prefix.toLowerCase()+" gameplayinfo`, `"+prefix.toLowerCase()+" rules`", fetchReply:true})
    const emo = '👍';
    message.react(emo);
    // ==============================
    // wait for reaction thumbsup
     
    const filter = (reaction, user) => {
      // console.log(reaction.emoji.name);
      return [emo].includes(reaction.emoji.name) && user.id === interaction.member.id;
    };
    
    message.awaitReactions({ filter, max: 1, time: 25000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first();
  
      if (reaction.emoji.name === emo) {
        createUser(interaction.member.id)
        .then (() => {
        // channel.send("`[game id : " + + globalOBJ.gameid +']`');
        customizepfp(interaction);
        // });
        });
      }
    })
    .catch(collected => {
      channel.send('`no reaction found`');
    });

    // ==============================
    
    
    }
    else {
      let status = await getStatus(interaction.member.id);
      let gid = await getGameid(interaction.member.id);
      console.log('chk = ' +checkusr);
      if(status != 'agreed')
      {
        interaction.reply("You already have an account.\n" + "`game id : ("+ gid +")`\n`try out other commands or use /help`");
      }
      else
      {
        interaction.reply("`resuming profile customization \n(gameid : " + gid+ " )`")

        customizepfp(interaction);
      }
    }
  }
  else if (interaction.commandName === 'profile')
  {
    // interaction.reply("`WIP`");

    const res = await globalOBJ.collection.find({userid : interaction.member.id}).toArray();
    try {
      const accessory = res[0]['accessory'];
      const top = res[0]['top'];
      const bottom = res[0]['bottom'];
      const outfit = res[0]['outfit'];
      const char = res[0]['char'];

      const pet = res[0]['favpet'];
      const tag = res[0]['tag'];
      const likes = res[0]['likes'];
      const relationshipstatus = res[0]['rstatus'];
      const level = res[0]['level'];
      const username = res[0]['username'];
      // channel.send("`profile of "+username+"`");
      const URLres= await globalOBJ.collection.find({userid : 1}).toArray();
      let charURL = "";
      let accessURL = "";
      let topURL = "";
      let bottomURL = "";
      let outfitURL = "";
      const font = await jimp.loadFont('./res/font/font1/futur_book.fnt');

      if (res[0]['accessory'] != 'none') {
        accessURL = URLres[0][accessory];
      }
      if (res[0]['top'] != 'none') {
        topURL = URLres[0][top];
      }
      if (res[0]['bottom'] != 'none') {
        bottomURL = URLres[0][bottom];
      }
      if (res[0]['char'] != 'none') {
        charURL = URLres[0][char];
      }
      if (res[0]['outfit'] != 'none') {
        outfitURL = URLres[0][outfit];
      }
      let charbg = await jimp.read(charURL);
      charbg.resize(128,128);
      charbg.print(font, 90, 2, 'level ' + level );
      let imgBuf = await charbg.getBufferAsync(jimp.AUTO);
      embb =
      {
      color: 0x3AABC2,
      title: interaction.member.name,
      url: '',
      author: {
        name : username,
        icon_url: 'https://i.imgur.com/yjSWVPs.jpg',
        url: '',
      },
      description: '`'+ tag +'`',
      // thumbnail: {
      //   url: 'https://i.imgur.com/othxZum.png',
      // },
      image : {
        url : 'attachment://image.jpg'
      },
      fields : [{
        name : "likes",
        value : `${likes}`,
        
      },
        {
          name : 'designation',
          value : 'student',
          
        },
        // {
        //    name: '\u200B', value: '\u200B', inline : 0
        // },
        {
          name : 'relationship',
          value : 'single',
          

        },
        {
          name : 'pet',
          value : pet,
          
        }
      ]
      };
      interaction.reply({embeds : [embb], files: [{name: "image.jpg", attachment:imgBuf}]})

    }
    catch {
        interaction.reply('`error loading item values & images`')
    }
  }
  else if (interaction.commandName === 'noticeboard') {
    const res = await globalOBJ.collection.find({userid : 0}).toArray();
    console.log (res)
    interaction.reply("`" +res[0]['notice']+"`");
  }
});


client.login(config.BOT_TOKEN);
