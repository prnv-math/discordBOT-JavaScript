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


//COURSE CLASS for education
class course {
  constructor(course_name, category, duration = undefined, eligibility = undefined) {
    this.name = course_name;
    this.duration = duration;
    this.class = category;
    this.eligibility = eligibility;
  }
}

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
  
  await globalOBJ.collection.deleteMany({userid : {$nin : [ownerid, 0 , 1]}});
  
  await globalOBJ.collection.updateOne({userid:ownerid}, {$set : {expenses : [], designation : [['student', Date.now(), 'high school course'], ['Graphic Design Apprenticeship', Date.now(), 'apprenticeship']], relationship : [{_id : 1, info : 'single', strength : 0, playerid : 0},{_id : 2, info : 'father', strength : 0, playerid : 0 , name : 'secret'}, {_id : 3, info : 'mother', strength : 0, playerid : 0, name : 'secret'}], attributes : {experience : 0, hunger : 0, health : 100, fitness : 30, logic : 30, criminality : 30},
   dates : {lastfed : Date.now() - (60000*60*36), hashtag : undefined}, boosts:{cash : 1, hunger : 1, experience : 1} }});
  
  //update course details in database
  // let courses = [];
  // function createCourse( course_name, classname, eligibility = undefined ) {
  //   let newcourse;
  //   if (classname === 'apprenticeship')
  //     newcourse = new course (course_name, classname, 3, 'none')
  //   else if (classname === 'college course')
  //     newcourse = new course(course_name, classname, 9, 'none')
  //   else if (classname === 'university course')
  //   {
  //     newcourse = new course(course_name, classname, 18, eligibility);
  //   }
  //   else if (classname === 'other courses') {
  //     newcourse = new course(course_name, classname, 2, 'none');
  //   }
  //   return newcourse;
  // }
  // courses.push(createCourse('Software Development Apprenticeship', 'apprenticeship'));
  // courses.push(createCourse('Graphic Design Apprenticeship', 'apprenticeship'));
  // courses.push(createCourse('Photography Apprenticeship', 'apprenticeship'));
  // courses.push(createCourse('Ethical Hacking Apprenticeship', 'apprenticeship'));
  // courses.push(createCourse('Mechanic Apprenticeship', 'apprenticeship'));
  // courses.push(createCourse('Accounting Apprenticeship', 'apprenticeship'));
  // courses.push(createCourse('Business Apprenticeship', 'apprenticeship'));
  // courses.push(createCourse('Systems Analysis Apprenticeship', 'apprenticeship'));

  // courses.push(createCourse('Marketing Degree', 'college course'));
  // courses.push(createCourse('Maths Degree', 'college course'));
  // courses.push(createCourse('Science Degree', 'college course'));
  // courses.push(createCourse('Arts Degree', 'college course'));
  // courses.push(createCourse('Software Engineering Degree', 'college course'));
  // courses.push(createCourse('Electrical Engineering Degree', 'college course'));
  // courses.push(createCourse('English Degree', 'college course'));
  // courses.push(createCourse('Business Degree', 'college course'));
  // courses.push(createCourse('Psychology Degree', 'college course'));
  // courses.push(createCourse('Media & Journalism Degree', 'college course'));
  // courses.push(createCourse('Graphic Design Degree', 'college course'));
  // courses.push(createCourse('Law Degree', 'college course'));
  // courses.push(createCourse('Health & Social Care Degree', 'college course'));
  // courses.push(createCourse('Music Degree', 'college course'));
  // courses.push(createCourse('Foreign Languages Degree', 'college course'));
  
  // courses.push(createCourse('Marketing Masters', 'university course', 'Marketing Degree'));
  // courses.push(createCourse('Maths Masters', 'university course', 'Maths Degree'));
  // courses.push(createCourse('Arts Masters', 'university course', 'Arts Degree'));
  // courses.push(createCourse('Software Engineering Masters', 'university course', 'Software Engineering Degree'));
  // courses.push(createCourse('Electrical Engineering Masters', 'university course', 'Electrical Engineering Degree'));
  // courses.push(createCourse('English Masters', 'university course', 'English Degree'));
  // courses.push(createCourse('Business Masters', 'university course', 'Business Degree'));
  // courses.push(createCourse('Psychology Masters', 'university course', 'Psychology Degree'));
  // courses.push(createCourse('Media & Journalism Masters', 'university course', 'Media & Journalism Degree'));
  // courses.push(createCourse('Graphic Design Masters', 'university course', 'Graphic Design Degree'));
  // courses.push(createCourse('Law Masters', 'university course', 'Law Degree'));
  // courses.push(createCourse('Health & Social Care Masters', 'university course', 'Health & Social Care Degree'));
  // courses.push(createCourse('Music Masters', 'university course', 'Music Degree'));
  // courses.push(createCourse('Foreign Languages Masters', 'university course', 'Foreign Languages Degree'));
  // courses.push(createCourse('Dentistry Masters', 'university course', 'Science Degree'));
  // courses.push(createCourse('Medicine Masters', 'university course', 'Science Degree'));
  // courses.push(createCourse('Physics Masters', 'university course', 'Science Degree'));
  // courses.push(createCourse('Forensic Science Masters', 'university course', 'Science Degree'));
  // courses.push(createCourse('Marine Biology Masters', 'university course', 'Science Degree'));

  // courses.push(createCourse('Sailing course', 'other courses'));
  // courses.push(createCourse('Wind Surfing course', 'other courses'));
  // courses.push(createCourse('Property Development course', 'other courses'));
  // courses.push(createCourse('Paragliding course', 'other courses'));
  // courses.push(createCourse('Wilderness Survival course', 'other courses'));
  // courses.push(createCourse('Pilots license & training course', 'other courses'));
  // courses.push(createCourse('Personal Training course', 'other courses'));
  // courses.push(createCourse('Martial Arts Training course', 'other courses'));
  // // courses.push(createCourse(' course', 'other courses'));

  // await globalOBJ.collection.updateOne({userid : 0}, {$set : {courseDetails : courses}});

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
  let res = await globalOBJ.collection.find({userid:uid}).toArray();
 
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
        else {
          checkHunger();
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
                  channel.send("`encountered an error`");
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
    let e=emb("**For more info:** ` "+prefix+" help [command] `", "**Add ` "+prefix+" ` before any command**");
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
    let e = emb("DISCO-LIFE : Rules", "`rules are necessary and understood regulations you must not defy in order to create a frinedly environment for everyone. Doing so will result in severe punishment, or a ban to make it a better place for other players.`")
    e.addField("\u200B"+"\n" + "\u200B" +"#1 ", "In any social platform the game provides wihtin itself, do not be toxic , bully, intimidate, shame, insult, harass, troll, flame, cause upset or shock to another person, or exhibit vulgar , racist , or __any kind of hostile behavior,__ towards other players in the game.");
    e.addField("\u200B"+"\n" + "\u200B" +"#2 ", "Do not engage in __illegal things__ within the game! including breaking Discord ToS, using hacks, mods, cheats, automation software (commonly known as 'scripts', 'macros', or 'bots').");
    e.addField("\u200B"+"\n" + "\u200B" +"#3 ", "Do not use resources gathered in the game for __'real money trading'.__");
    e.addField("\u200B"+"\n" + "\u200B" +"#4 ", "You may not exploit __errors in design__ ('bugs') or features which have not been documented to gain access which is otherwise not available or to gain an advantage over other Users, and You may not communicate any exploitable issues either directly or through public posting, to any other users of Disco'Life's Services")
    e.addField("\u200B"+"\n" + "\u200B" +"#5 ", "While allowed to select a username for any item in the game, __do not use" +  " INAPPROPRIATE OR DISALLOWED NAMES.__ the game RESERVES THE RIGHT TO REJECT ANY NAME IT CONCLUDES, IN ITS SOLE DISCRETION, IS OFFENSIVE, OBSCENE, OR THAT OTHERWISE VIOLATES THE NAMING POLICY FOR USERNAMES.".toLowerCase()+ 'This also applies to other text elements entered by the player, such as hashtags.');
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
    const message = await interaction.reply({content: ">>> Oh!\n\nYou want to play Disco-Life! \nCheck out gameplayinfo,\nMake sure you have read and\naccepted the rules .\nThen react with :thumbsup: !\n\n`"+prefix.toLowerCase()+" gameplayinfo`, `"+prefix.toLowerCase()+" rules`", fetchReply:true})
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
        .then (() => globalOBJ.collection.updateOne({userid : interaction.member.id}, {$set : {inventory : {cash : 0, bank : reward}, expenses : [], designation : [['student', Date.now() , 'high school course']]}}))
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
      // console.log('chk = ' +checkusr);
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
      console.log('----------------------------------------')

      const lastjob = (res[0]['designation'])[(res[0]['designation']).length - 1][0];
      const lastjob_type = lastjob.split(' ')[lastjob.split(' ').length - 1]
      let pos=lastjob;
      if (lastjob_type === 'Degree') {
        pos = 'college student';
      }
      if(lastjob_type === 'Apprenticeship') {
        pos = lastjob.replace('Apprenticeship', 'apprentice').toLowerCase();
      }
      else if (lastjob_type === 'course') {
        pos = 'short term course student, \n'+lastjob.replace('course', '').toLowerCase();
      }
      else if (lastjob_type === 'Masters') {
        pos = 'university student';
      }

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
          value : pos
          
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
        interaction.reply('`there was a problem loading item values & images`')
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
          interaction.reply("`You gave a like to " + res[0]['username'] + " [total likes : " + (res[0]['likes']).length + 1 + "]`");
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
  else if (interaction.commandName == 'bank') {
    const res = await globalOBJ.collection.find({userid:interaction.member.id}).toArray();
    let embedd = emb("Account holder : " + res[0]['username']);
    // embedd.setAuthor ({
    //   name : 'BANK' ,
    //   url : '',
    //   iconURL : 'https://i.imgur.com/RMUkwmM.jpg'
    //   });
    embedd.setThumbnail("https://i.imgur.com/HVbosG1.jpg");
    let txt = "**account balance** : `$" + (res[0]['inventory'])['bank'] + "`\n\n__**Recurring expenses**__"+'\n```';
    let expensesCheck = false;
    for (pair of res[0]['expenses']) {
      if (pair != undefined && pair[1]>0) {
        expensesCheck = 1;
        txt+= pair[0] + " [$"+ pair[1] +"] " +"\n";
      } 
    }
    if(expensesCheck == 0)
      txt+= 'none```\n';
    else
      txt+= '```';
    txt += "\n1️⃣ `deposit`\n2️⃣ `withdraw`\n3️⃣ `Loan`\n4️⃣ `close`"
    embedd.setDescription(txt);
    embedd.setFooter({
      text : 'react with the number associated with a function'
    })
    const e = await interaction.reply({embeds : [embedd], fetchReply : true});
    // const m = await channel.send('`please wait a second`')
    const emo = ['1️⃣','2️⃣', '3️⃣','4️⃣'];
    e.react(emo[0]);
    e.react(emo[1]);
    e.react(emo[2]);
    e.react(emo[3])
    // .then (() =>{
      
    // m.delete();
    const filter = (reaction, user) => {
        //  console.log(emo.includes(reaction.emoji.name) + " , " + (user.id === interaction.member.id))
         return emo.includes(reaction.emoji.name) && (user.id === interaction.member.id);
    };
    
    e.awaitReactions({ filter, max: 1, time: 15000, errors: ['time'] })
     .then(collected => {
      const reaction = collected.first();

      if (reaction.emoji.name === emo[3]) {
        channel.send(`*left bank*`);
        }
      else if (reaction.emoji.name === emo[1]) {
        channel.send('> Please enter an amount to withdraw from your account.');
        const filter = response => {
          if (response.author != interaction.member.user) {
            return false;
          }
          let check = true;
          let txt = "";
          const b = (res[0]['inventory'])['bank'];
          const amt = parseInt(response);
          if (isNaN(amt)) {
            txt += 'invalid number\n';
            check = 0;
          }
          if (amt > b) {
            txt += "you can't withdraw that much";
            check = 0;
          }
          if (txt)
            channel.send(txt);
          return check;
        }
        channel.awaitMessages({ filter, max: 1, time: 45000, errors: ['time'] })
          .then(collected => {
            // channel.send(collected.content);
            const amt = parseInt(collected.first().content);
            globalOBJ.collection.updateOne({ userid: interaction.member.id }, { $inc: { 'inventory.cash': amt, 'inventory.bank': -1 * amt } })
              .then(() => channel.send("`successfully withdrew $" + amt + " [cash in hand : $" + ((res[0]['inventory'])['cash'] + amt) + "]`"))
          })
          .catch(collected => {
            console.log(collected);
            channel.send('> no response found ');
          });
        // ======================
      }
      else if (reaction.emoji.name === emo[0]) {
        channel.send(`>>> Please enter an amount to deposit.\n\`cash deposited in bank will periodically receive a small interest.\``); 
        const filter = response => {
            if (response.author != interaction.member.user) {
              return false;
            }
            let check = true;
            let txt = "";
            const c = (res[0]['inventory'])['cash'];
            const amt = parseInt (response);
            if(isNaN(amt)) {
              txt += 'invalid number\n';
              check = 0;
            }
            if(amt >= c + 100) {
              txt += "you need to have more cash to deposit that much";
              check = 0;
            }
            if (txt)
              channel.send(txt);
            return check;
        }
        channel.awaitMessages({ filter , max: 1, time: 45000, errors: ['time'] })
        .then (collected => {
          // channel.send(collected.content);
          const amt = parseInt(collected.first().content);
          globalOBJ.collection.updateOne({userid : interaction.member.id} , {$inc : {'inventory.cash' :  -1*amt, 'inventory.bank' : amt}})
          .then(() => channel.send("`successfully deposited $"+ amt + " [balance : $" + ((res[0]['inventory'])['bank'] + amt) + "]`"))
        })
        .catch(collected => {
          console.log(collected);
          channel.send('> no response found ');
        });
        // =================
      }
      else {
        if ((res[0]['dates'])['loan'] == undefined) {

          if ((res[0]['designation'])[(res[0]['designation']).length - 1][0] != 'student')
            channel.send('> "School students don\'t get loans over here" - Bank Manager')
          else {
            let loan = (Math.ceil(((res[0]['inventory'])['bank'] + (res[0]['inventory'])['cash']) / (1.5 * 100))) * 100;
            if (loan > 1999 == false) {
              channel.send(">>> Application for Loan rejected by bank.\nPerhaps you need to have more cash as loan security.");
            }
            else {
              loan < 10000 ? loan = (Math.ceil(((res[0]['inventory'])['bank'] + (res[0]['inventory'])['cash']) / (1.5 * 100))) * 100 : loan = 10000;
              channel.send('>>> **You will receive a loan for $' + loan + '** which you will have to pay back, as well as \na (not so)small additional interest. \n**Continue?**')
                .then(collected => {
                  const emot = ['✅', '❎'];
                  collected.react(emot[0])
                    .then(() => collected.react(emot[1]));
                  const filter = (reaction, user) => {
                    //  console.log(emo.includes(reaction.emoji.name) + " , " + (user.id === interaction.member.id))
                    return emot.includes(reaction.emoji.name) && (user.id === interaction.member.id);
                  };
                  collected.awaitReactions({ filter, max: 1, time: 15000, errors: ['time'] })
                    .then(collected => {
                      const r = (collected.first()).emoji.name;
                      if (r != '✅')
                        channel.send("`cancelled.`");
                      else {
                        globalOBJ.collection.updateOne({ userid: interaction.member.id }, { $set: { 'dates.loan': Date.now() + (60000 * 60 * 24 * 13) }, $push: { expenses: ['loan installment', (loan * 1.2 * 7.7) / 100] }, $inc: { 'inventory.cash': loan } })
                          .then(() => channel.send("> **You received `$" + loan + "`**"));
                      }
                    })
                })
            }

          }
      }
      else {
        const remaining = humanizeDuration((res[0]['dates'])['loan'] - Date.now(), { largest: 2 });
        return channel.send("```You have to finish the payment of existing loan installments before you can apply again.\nIt is estimated to be fully paid off in "+ remaining +"```")
        .catch (console.error);
      }
      }
      })
      .catch(collected => {
        console.log(collected);
        interaction.followUp('> no response found ');
      });
      // =================
    // });
  }
  else if(interaction.commandName === 'education') {
    let emm = emb("Get educated & Gain qualifications");
    emm.setAuthor({
      name : 'Education',
      url : "",
      iconURL : 'https://i.imgur.com/iK9x9Oo.gif'
    });
    // emm.setThumbnail("https://i.imgur.com/rcFEfji.gif");
    let txt = "```";
    const res = await globalOBJ.collection.find({userid:interaction.member.id}).toArray();
    const lastIndex = (res[0]['designation']).length - 1;
    const lastjob = (res[0]['designation'])[lastIndex];
    let quit = '5️⃣ `quit course`\n' + '6️⃣ `close`\n';

    let duration;
    const botINFo = await globalOBJ.collection.find({userid:0}).toArray();
    for (c of botINFo[0]['courseDetails']) {
      if(c.class === lastjob[2])
        duration = c.duration;
      // else if(lastjob[0] != 'student')
      //  console.log(c.class + ' doesnt match '+lastjob[2])
    }
    if (lastjob[0] == 'student') {
      txt += 'school student\n' + `${humanizeDuration((lastjob[1] + (60000*60*24)) - Date.now(), {largest : 2})} left in school`;
    }
    else if (lastjob[2] === 'other courses') {
      txt += lastjob[0] +'\n' + `${humanizeDuration((lastjob[1] + (60000*60*24*duration)) - Date.now(), {largest : 2})} remaining until completion`;
    }
    else if (lastjob[2].includes('course') || lastjob[2] === 'apprenticeship') {
      txt += lastjob[0] +'\n' + `${humanizeDuration((lastjob[1] + (60000*60*24*duration)) - Date.now(), {largest : 2})} left in ` + lastjob[2].split(' ', 1);
    }
    else 
    {
      quit = '5️⃣ `close`\n';
      txt+= 'not in education';
    }
    txt += '```\n\n__**Current qualifications**__\n```';
    checkQual = false;
    for ( phase of res[0]['designation']) {
      if ((res[0]['designation']).indexOf(phase) != (res[0]['designation']).length - 1)
      {
      if (phase[2].includes('course') || phase[2] == 'apprenticeship') {
        if (phase[0] != 'student' && ['none', undefined].includes(phase[2]) == false)
        {
          const date = new Date(phase[1])
          checkQual = true;
          txt += phase [0]+' ['+date.getDate()+`/${date.getMonth()+1}/${date.getFullYear()}`+']\n';
        }
      }
      }
    }
    if (checkQual == false) 
     txt += 'none';
    txt += '```\n\n1️⃣ `Apprenticeships`\n2️⃣ `College courses`\n3️⃣ `University courses`\n4️⃣ `Other courses`\n' + quit;
    // txt += '```'
    emm.setDescription(txt);
    emm.setFooter({
      text:'react with the number associated with an option'
    })
    const e = await interaction.reply({embeds : [emm],fetchReply : true});
    const emo = ['1️⃣','2️⃣', '3️⃣','4️⃣','5️⃣','6️⃣'];
    // const m = await channel.send('`please wait a second`');
    e.react(emo[0]);
    e.react(emo[1]);
    e.react(emo[2]);
    e.react(emo[3]);
    e.react(emo[4])
    if(quit != '5️⃣ `close`\n')
      e.react(emo[5])
    // .then (() =>{
      // m.delete();
            
      const filter = (reaction, user) => {
        //  console.log(emo.includes(reaction.emoji.name) + " , " + (user.id === interaction.member.id))
        return emo.includes(reaction.emoji.name) && (user.id === interaction.member.id);
      };

      e.awaitReactions({ filter, max: 1, time: 20000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
          function selectCourse(courseClass,txt, delimiter) {
            let courses2 = [];
            // let embTitle = '';
            // switch (delimiter) {
            //   case 'Apprenticeship':
            //     embTitle = 'Aprrenticeships';
            //     break;
            //   case 'Degree':
            //     embTitle = 'College courses';
            //     break;
            //   case 'Masters':
            //     embTitle = 'University courses';
            //     break;
            //   case 'course':
            //     embTitle = 'Other courses';
            //     break;
            // }
            globalOBJ.collection.find({ userid: 0 }).toArray()
              .then(collected => {
                const tempCourses = collected[0]['courseDetails'];
                let count = 0;
                // let space = '';
                // if (['college course','university course'].includes(courseClass))
                // {
                //   console.log('yes\n');
                //   space = ' ';
                // }
                for (c in tempCourses) {
                  if (tempCourses[c].class == courseClass){
                    count++;
                    console.log('found a '+courseClass + '\t' + tempCourses[c].name);
                    courses2.push(tempCourses[c]);
                    let numEmo = '';
                    tempCount = count;
                    let countDigitArray = [];
                    while (tempCount > 0) {
                      countDigitArray.push(tempCount%10);
                      tempCount = Math.floor(tempCount / 10);
                    }
                    countDigitArray.reverse();
                    for (d of countDigitArray) {
                      switch (d) {
                        case 1:
                          numEmo += '1️⃣';
                          break;
                        case 2:
                          numEmo += '2️⃣';
                          break;
                        case 3:
                          numEmo += '3️⃣';
                          break;
                        case 4:
                          numEmo += '4️⃣';
                          break;
                        case 5:
                          numEmo += '5️⃣';
                          break;
                        case 6:
                          numEmo += '6️⃣';
                          break;
                        case 7:
                          numEmo += '7️⃣';
                          break;
                        case 8:
                          numEmo += '8️⃣';
                          break;
                        case 9 :
                          numEmo += '9️⃣';
                          break;
                        default : numEmo += '0️⃣';
                      }
                    }
                    if (count < 10 && ['college course','university course'].includes(courseClass))
                      numEmo = '0️⃣' + numEmo;
                    txt += numEmo + ' `' + tempCourses[c].name + '`\n';
                  }
                }
                let cEmbed = emb('', txt);
                channel.send({embeds : [cEmbed]});
                const filter = response => {
                  const lowerRes = response.content.toLowerCase();
                  let check = false;
                  if (response.author.id === interaction.member.id) {
                    for (c in courses2) {
                      const cname = courses2[c]['name'];
                      if ((lowerRes === cname.split(delimiter)[0].toLowerCase()) || lowerRes === cname.split(' Apprenticeship')[0].toLowerCase() + ' apprenticeship')
                      {
                        check = true;
                      }
                      else if ((1 + parseInt(c)) === parseInt(lowerRes))
                        check=true;
                    }
                  }
                  if (lowerRes === 'cancel') {
                    channel.send('*left campus*')
                    check = true;
                  }
                  return check;
                }
                channel.awaitMessages({ filter, max: 1, time: 45000, errors: ['time'] })
                  .then(collected => {
                    if (((res[0]['designation'])[(res[0]['designation']).length - 1])[0] == 'none') {
                      let response = collected.first().content;
                      console.log("filtered - " + response);
                      function isEqual(a, b) {
                        let check = true;
                        // If length is not equal
                        if (a.length != b.length)
                          return false;
                        else {

                          // Comparing each element of array
                          for (let i = 0; i < a.length; i++) {
                            let chk = 0;
                            for (let j = 0; j < b.length; j++) {
                              if (a[i] === b[j]) {
                                console.log('matched ' + a[i] + ' and ' + b[j])
                                chk = 1;
                              }
                              if (j === b.length - 1 && (chk === 0)) {
                                check = false;
                              }
                            }
                          }
                        }
                        return check;
                      }
                      if (isNaN(response) == false) {
                        // console.log(typeof(parseInt(response))+ "\t"+response + " is number")
                        let c = courses2[response - 1];

                        if(c.eligibility === 'none') {
                        globalOBJ.collection.updateOne({ userid: interaction.member.id }, { $push: { designation: [c.name, Date.now(), c.class] } })
                        channel.send('**enrolled in ' + c.name+'**');
                        }
                        else
                        {
                          let storeElg = [];
                          for (i of c.eligibility.split(",")) {
                            for (j of res[0]['designation']) {
                              if (j[0] === i) {
                                storeElg.push(i);
                              }
                            }
                          }
                          if(isEqual(storeElg , c.eligibility.split(","))) {
                            globalOBJ.collection.updateOne({ userid: interaction.member.id }, { $push: { designation: [c.name, Date.now(), c.class] } })
                            channel.send('**enrolled in ' + c.name+'**');
                          }
                          else {
                            channel.send('you are not eligible to enroll in this course' + '\n```you shall need : \n'  + c.eligibility + '```');
                          }
                        }
                      }
                      else
                      {
                      for (c of courses2) {
                        if (c.class == courseClass && (c.name.toLowerCase()).startsWith(response.toLowerCase())) {
                          if(c.eligibility === 'none') {
                            globalOBJ.collection.updateOne({ userid: interaction.member.id }, { $push: { designation: [c.name, Date.now(), c.class] } })
                            channel.send('**enrolled in ' + c.name+'**');
                            break;
                            }
                            else
                            {
                              let storeElg = [];
                              for (i of c.eligibility.split(",")) {
                                for (j of res[0]['designation']) {
                                  if (j[0] === i) {
                                    storeElg.push(i);
                                  }
                                }
                              }
                              if(isEqual(storeElg , c.eligibility.split(","))) {
                                globalOBJ.collection.updateOne({ userid: interaction.member.id }, { $push: { designation: [c.name, Date.now(), c.class] } })
                                channel.send('**enrolled in ' + c.name+'**');
                                break;
                              }
                              else {
                                channel.send('**you are not eligible to enroll in this course**');
                              }
                            }
                        }
                      }
                      }
                    }
                    else {
                      if (collected.first().content != 'cancel')
                       channel.send('`you\'re already in a course or job, quit it or join this course at a later date`')
                    }
                  })
                  .catch(collected => {
                    console.log(collected);
                    interaction.followUp('`no response received`');
                  });
              });
          }
          if ((reaction.emoji.name === emo[4] && quit == '5️⃣ `close`\n' ) || reaction.emoji.name === emo[5]) {
            channel.send(`*left the campus*`);
          }
          else if (reaction.emoji.name === emo[4]) {
            globalOBJ.collection.updateOne({userid : interaction.member.id}, {$pull : {designation : lastjob}});
            globalOBJ.collection.updateOne({userid: interaction.member.id}, {$push : {designation : ['none', Date.now(), 'none']}})
            .then (() => {
              channel.send('*you left the course*');
            })
            .catch(collected => {
              console.log('err ' + collected)
            })
          }
          else if (reaction.emoji.name === emo[0]) {

            let txt = '**Apprenticeship**\nAll apprenticeships pay you a salary, and give you a qualification at the same time! The pay is low, but it is what it is. \n`duration : 3 D`\n**Choose a course.**\n`type a course name, number, or \'cancel\' to leave`\n\n';
            selectCourse('apprenticeship', txt, ' Apprenticeship');
          }
          else if (reaction.emoji.name === emo[1]) {
            let txt = '**College courses**\n'+'`duration : 9 D`\n**Choose a course.**\n`type a course name, number, or \'cancel\' to leave`\n\n';
            selectCourse('college course', txt, ' Degree');
          }
          else if (reaction.emoji.name === emo[2]) {
            let txt = '**University courses**\nAll university courses require a specific degree, in order to grant you admission to the course.\n'+'`duration : 18 D`\n**Choose a course.**\n`type a course name, number, or \'cancel\' to leave`\n\n';
            selectCourse('university course', txt, ' Masters');
          }
          else if(reaction.emoji.name === emo[3]) {
            let txt = '**Other courses**\nThese are short duration and upfront payment courses that make you job ready in specific fields.\n'+'`duration : 2 D`\n**Choose a course.**\n`type a course name, number, or \'cancel\' to leave`\n\n';
            selectCourse('other courses', txt, ' course')
          }
          else {
            interaction.followUp('`didn\`t recognize that response`')
          }
        })
       .catch(collected => {
        console.log(collected);
        interaction.followUp('no response received');
       });
    // });
  }
  else if (interaction.commandName == 'jobs') {
    let jEmbed = emb("Job Portal");
    jEmbed.setThumbnail("https://i.imgur.com/HVbosG1.jpg");
    interaction.reply({embeds : [jEmbed]});
  }
  else {
    interaction.reply('`work in progress :<`');
  }
});

client.login(config.BOT_TOKEN);
