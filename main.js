//beginning of js code
const discord = require("discord.js");
const config = require("./config.json");

const humanizeDuration = require('humanize-duration');
const random_name = require('node-random-name');
const jimp = require('jimp');

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
  await globalOBJ.collection.deleteMany({userid : {$nin : [ownerid, 0 , 1]}});
  
  // await globalOBJ.collection.updateOne({userid :ownerid}, {$set : {inventory : {cash : 9999, bank : 9999}}});
  await globalOBJ.collection.updateOne({userid:ownerid}, {$set : { relationship : [{_id : 1, info : 'single', strength : 0, playerid : 0},{_id : 2, info : 'father', strength : 0, playerid : 0 , name : 'secret'}, {_id : 3, info : 'mother', strength : 0, playerid : 0, name : 'secret'}], attributes : {experience : 0, hunger : 0, health : 100, fitness : 30, logic : 30, criminality : 30},
   dates : {lastfed : Date.now() - (60000*60*36), hashtag : undefined}, boosts:{cash : 1, hunger : 1, experience : 1} }});

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
}

async function getGameid(uid) {

  let res = await globalOBJ.collection.find({userid:uid}).toArray();
  
  try { 
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
 const newENtry = await globalOBJ.collection.insertOne({userid: uid ,  gameid: g ,  status: 'agreed' });
 const updated = await globalOBJ.collection.updateOne({userid:0}, {$set : {gameid : (g+1)}}); 
 let newusrRES = await globalOBJ.collection.find({userid:uid}).toArray();

 console.log('newUserid : ' + newusrRES[0]['gameid'] + " , newbotgameid : " + (g+1));
//  console.log('new entry status :  '+newENtry[0]['status']);
 }
 else 
 {
   console.log('db gameid overflow');
 }
}

client.on('ready', () => {
  // client.setStatus('available')
  client.user.setActivity(`/help`, {type: 'LISTENING'});
  dbmain();

});


client.on('interactionCreate', async interaction => {
	
  let e = {};
  const channel=interaction.channel;

  function checkHunger() {
    globalOBJ.collection.find({userid:interaction.member.id}).toArray()
    .then (collected => {
    const res = collected;
    const attr = res[0]['attributes'];
    const lastfed = (res[0]['dates'])['lastfed'];
    const pers = ((((Date.now() - lastfed) / 1000)/60) / 1440) * 100;
    console.log(pers + " , hours passed since lastfed : " + Math.floor(((Date.now() - lastfed)/1000)/60));
    if (attr['hunger']+pers > 100) {
      console.log(res[0]['username'] + ' is starving');
      const excess = (Math.floor(attr['hunger']+pers-100)/500)*100;
      if (excess >= 100)
        interaction.reply("`your character is about to die from starvation [game over]` <@" + interaction.member.id + ">")
        .then (() => {
        return;
        });
    }

    });
  }
  checkHunger();

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
  function changeStatus(uid, s) {

    globalOBJ.collection.updateOne({userid:uid}, {$set : {status : s}});
    // const res = await globalOBJ.collection.find({userid:uid}).toArray();
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
      title: "",
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
          const dad = random_name({gender : 'male'});
          const mom = random_name({last : false,gender : "female"});
          globalOBJ.collection.updateOne({userid:interaction.member.id}, {$set : {likes : [],char : char, bottom : 'none' , relationship : [{_id : 1, info : 'single', strength : 0, playerid : 0},{_id : 2, info : 'father', strength : 0, playerid : 0 , name : dad}, {_id : 3, info : 'mother', strength : 0, playerid : 0 , name : mom}], username : res,level : 1,accessory : 'none',top : 'none',outfit : 'none',favpet : 'none', tag : '#new_around_here', attributes : {experience : 0, hunger : 0, health : 100, fitness : 30, logic : 30, criminality : 30}, dates : {lastfed : Date.now(), hashtag : undefined}, boosts:{cash : 1, hunger : 1, experience : 1} }})
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
  
  const checkusr = await getGameid(interaction.member.id);
  console.log('checkuser = ' + checkusr);
  if ((interaction.commandName != 'start') && (interaction.commandName != 'help') && (interaction.member.id != ownerid))
  {
    if (checkusr < 0)
    {
    // try {
      // console.log("trigger user check in db");
        //note to self : CHECK THIS and the checkuser thing to see if theyre using profile mid acc creation

        interaction.reply("You are a new face! Check out `"+prefix+" help` or `"+prefix+" start` <@" + interaction.member.id + ">");
        return;
    } 
    else {

        const status = await getStatus(interaction.member.id);
        if(status == 'agreed') {
          interaction.reply("`please complete your profile creation`");
          return;
        }
    }
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
            // console.log(s + " , " + ['quit', 'pin'].includes(s));
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
                globalOBJ.collection.find({userid:0}).toArray()
                .then (collected => {
                const res = collected;
                const pin = res[0]['notice'];
                const today = new Date().toLocaleDateString()
                globalOBJ.collection.updateOne({userid : 0}, {$set : {notice : [pin[1], pin[2], "[" + today + "]\n" + argarray[0]]}})
                .then (() => {
                  channel.send("`updated noticeboard`");
                  client.channels.cache.get('936801672984920116').send(`\`${argarray[0]}\``)
                }
                )
                .catch(collected => {
                  channel.send("`err`");
                })
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
    

    em(":bookmark: Profile commands :bookmark:", ["start", "profile", "attributes", "boosts", "events", "like", "inventory", "hashtagset","cooldowns"])
    em(":beginner: Menu commands :beginner:", ["bank", "shop", "jobs", "education", "health", "apartments", "relationship"])
    em(":gift: Rewards commands :gift:", ["dailyreward",  "work","todolist","survey", "redeem", "quiz"])
    em(":currency_exchange: Interaction commands :currency_exchange:", ["mail", "give", "chatrooms"])
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
        const today = new Date().toLocaleDateString();
        const intro = `Hello ${interaction.member.user.name}.\nI am someone with a secret identity. And apparently you are a new volunteer for our project Disco-Life.\nNow we intend to observe how you live in Disco-Verse. I guess time will tell how this will turn out , right? i hope you are ready!\n\u200B\n\u200B\n`;
        const embb = emb("[New] Text Message ", `\`${today}\`` + "\n\n" + intro);
        
        embb.setAuthor({
          name: 'agent Disco',
          url: '',
          iconURL: 'https://i.imgur.com/Livii3I.jpg'
      });
        const reward = (Math.floor(Math.random() * 12) + 2) * 20;
        embb.setFooter({
        text : `\$${reward} credited to bank`
        });
        channel.send ({embeds : [embb]})
        .then(collected => {
          collected.react('👍');
          collected.awaitReactions({ filter, max: 1, time: 25000, errors: ['time'] });
        })
        
        .then(() => createUser(interaction.member.id))
        .then (() => globalOBJ.collection.updateOne({userid : interaction.member.id}, {$set : {inventory : {cash : 0, bank : reward}, designation : 'Student'}}))
        .then (() => {
        customizepfp(interaction);
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
      const relationshipstatus = res[0]['relationship'];

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
        value : `${likes.length}`,
        
      },
        {
          name : 'designation',
          value : res[0]['designation'].toLowerCase(),
          
        },
        // {
        //    name: '\u200B', value: '\u200B', inline : 0
        // },
        {
          name : 'relationship',
          value : relationshipstatus[0]['info']
          

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
  else if (interaction.commandName == 'attributes'){
    const res = await globalOBJ.collection.find({userid : interaction.member.id}).toArray();
    let embedd = emb('Attributes', "`all values for different attributes represent percentage values, of current value with respect to maximum value.`"); 
    embedd.setAuthor({
      name: res[0]['username'],
      url: '',
      iconURL: 'https://i.imgur.com/OQDEElj.jpg'
    })
    const att = res[0]['attributes'];
    for (const [key, value] of Object.entries(att)) {
       if (key != 'hunger')
        embedd.addField("\u200B"+ key,"\u200B"+value,true);
       else 
        { 
          const lastfed = (res[0]['dates'])['lastfed'];
          let pers = ((((Date.now() - lastfed) / 1000)/60) / 1440) * 100;
          // console.log(pers + " , mins passed since lastfed : " + Math.floor(((Date.now() - lastfed)/1000)/60));
          if (value+pers <= 100) {
            embedd.addField("\u200B"+ key,"\u200B"+Math.floor(value+pers),true);
          }
          else {
            embedd.addField("\u200B"+ 'starving',"\u200B"+Math.floor(((value+pers-100)/500)*100),true);
          }
        }
      }
    interaction.reply({ embeds : [embedd]});
  }
  else if (interaction.commandName === 'hashtagset'){
    const res = await globalOBJ.collection.find({userid : interaction.member.id}).toArray();
    const cdhash = (res[0]['dates'])['hashtag'];
    // console.log(cdhash);
    if (cdhash == undefined)
    {
    const option = interaction.options.get("hashtag").value;
    console.log(option+typeof(option))
    let check = false;
    const dictionary = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
    const start = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for (i in start) {
      if (option.startsWith(start[i])) {
        console.log("option starts with /" + start[i] +"/")
        check = 1;
      }
    }
    const arr = dictionary.split('');
        for (j in option) {
            if (arr.includes(option[j]) === false)
            { 
              if(check == true) {
                interaction.reply("`aborting`")
              }
              channel.send("`invalid character detected`")
              check = 0;
              break;
            }
        }
    if (option.length < 2) {
            if(check == true) {
               interaction.reply("`aborting`")
            }
            channel.send("`insufficient length`");
            check = 0;
        }
    if (option.length > 16) {
          if(check == true) {
            interaction.reply("`aborting`")
          }
          channel.send("`maximum length is 16 characters.`");
          check = 0;
        }
    if (check == true)
      {
      globalOBJ.collection.updateOne({userid : interaction.member.id}, {$set : {tag : `#${option}`}})
      .then (() => {
      globalOBJ.collection.updateOne({userid : interaction.member.id},{$set : {'dates.hashtag' : Date.now() + (60000*60)}} )
      .then (() => { interaction.reply(`\`hashtag updated [${option}]\``); });
      })
    }
    }
    else {
      const remaining = humanizeDuration(cdhash - Date.now(), { largest: 1 });
      return interaction.reply("`You have to wait "+ remaining +" before you can change it again`")
      .catch (console.error);
    }

  }
  else if (interaction.commandName === 'noticeboard') {
    const res = await globalOBJ.collection.find({userid : 0}).toArray();
    const notice = res[0]['notice'];
    interaction.reply(">>> " +notice[0] +"\n"+ notice[1] + "\n"+ notice[2]);
  }
  else if (interaction.commandName == 'boosts') 
  {
    const res = await globalOBJ.collection.find({userid : interaction.member.id}).toArray();
    let embedd = emb("", "Each number represents a multiplier for corresponding field. 1 represents 100 % value and that no boosts are present.(`0.5` multiplier for hunger means that your hunger is halved. `2` for cash means that your coin gains are doubled.)");
    embedd.setAuthor({
        name : 'Boosts',
        url : "",
        iconURL : 'https://i.imgur.com/tXBPtW5.jpg'
      });
    
    for (const [key,value] of Object.entries(res[0]['boosts']))
      {
        embedd.addField("\u200B"+ key,"\u200B"+value);
      }
    interaction.reply({embeds : [embedd]});

  }
  else if (interaction.commandName == 'like'){
    const mention = interaction.options.getUser('mention');
    const id = interaction.options.getInteger('gameid');
    if(mention)
      {
        const checkuser = await getGameid(mention.id);
        if (checkuser < 0) {
          interaction.reply(`this user has no account in the game.`)
        }
        else {
          const res = await globalOBJ.collection.find({userid : mention.id}).toArray();
          if ((res[0]['likes']).includes(interaction.member.id)) 
          {
            interaction.reply('`You can\'t like ' + res[0]['username'] + ' twice`');
          }
          else 
          {
          await globalOBJ.collection.updateOne({userid : mention.id} , {$push : {likes :interaction.member.id}});
          interaction.reply("`You gave a like to " + res[0]['username'] + " [total likes : " + (res[0]['likes']).length + "]`");
          }
        }
      }
    else if (id) {
      // console.log('no user mention');
      const res = await globalOBJ.collection.find({gameid : id}).toArray();
      
      if (res == undefined) {
        interaction.reply(`this gameid is invalid.`)
      }
      else {
        //if gameid belongs to a player
        if (res[0]['userid'] == interaction.member.id){
          interaction.reply({ content : '`You can\'t give a like to yourself.`', ephemeral : true});
        }
        else 
        {
          if ((res[0]['likes']).includes(interaction.member.id)) 
          {
           interaction.reply('`You can\'t like ' + res[0]['username'] + ' twice`');
          }
          else 
          {
           await globalOBJ.collection.updateOne({gameid:id}, {$push : {likes : interaction.member.id}});
           interaction.reply("`You gave a like to " + res[0]['username'] + " [total likes : " + ((res[0]['likes']).length + 1) + "]`");
          }
        }
      }
    
    }
    else {
      const res = await globalOBJ.collection.find({userid : interaction.member.id}).toArray();
      interaction.reply({ content : '`You have total '+((res[0]['likes']).length + 1)+' likes.`', ephemeral : true })
    }


  }
  else if (interaction.commandName == 'inventory') {
    const res = await globalOBJ.collection.find({userid : interaction.member.id}).toArray();
    // console.log(res[0])
    let embedd = emb("Inventory");
    let txt = "`The items and cash obtained by " + res[0]['username'] + "`\n";
    let itemfound = false;
    for (const [key,value] of Object.entries(res[0]['inventory']))
    { 
      if (value > 0 && ['cash', 'bank'].includes(key) == false) {
        itemfound = true;
        txt += "\n**" + key.toLowerCase() + "** : " + value;
      }
    }
    if (itemfound == false)
      txt += "\nno items";
    embedd.setDescription(txt);
    embedd.setFooter({ text :"cash in hand : $" + (res[0]['inventory'])['cash'] + ", cash at bank : $" + (res[0]['inventory'])['bank']})
    interaction.reply({embeds : [embedd]});
  }
  else {
    interaction.reply('`work in progress :<`');
  }
});

client.login(config.BOT_TOKEN);
