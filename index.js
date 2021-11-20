// Require the necessary discord.js classes
const { Client, Intents, VoiceState } = require('discord.js');
const { token } = require('./secrets.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
    
});

const numlist = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
const specialcharlist = {
    '!' : ':exclamation:', 
    '?' : ':question:'
};
const regexLetters = /^[a-zA-Z]*$/;
const regexNumbers = /^[0-9]*$/;

let currentConnection = null;



function followUser(userid) {
    client.on('voiceStateUpdate', async (oldState, newState) => {   
        if (oldState.member.user.bot || newState.member.user.bot) return;
        
        if (!newState.channel && currentConnection != null) { 
            currentConnection.disconnect(); 
            currentConnection = null
            console.log("Disconnected")
            return; 
        }

        if (!oldState.channel && newState.member.id == userid) { 
            currentConnection = await newState.channel.join();
            const audioOnConnect = currentConnection.play('./tiktoksoundsedit.mp3');
            console.log("Connected!")
            return; 
        }

        if (oldState.member.id == userid && newState.member.id == userid) {
            if (oldState.channel.id != newState.channel.id) {
                currentConnection = await newState.channel.join();
                const audioOnConnect = currentConnection.play('./tiktoksoundsedit.mp3');
                console.log("Changed channel!")
                
            }
        }
    })
}
//Benny
//followUser("171652501198733312")

//Jake
//followUser("95677195162222592")

//Tyler
//followUser("229744337477435393")

//Odin
//followUser("555630204924461067")



/*client.on("voiceStateUpdate", function(oldMember, newMember){ //voiceStateUpdate sjekker etter aktivitet, join,disc, mute, etc.
    //Lagrer kanal-IDen det er snakk om i en variabel, og bruker deretter den variabelen for å sende melding. 
    const _genchannel = client.channels.cache.get("893123360991608836")
    _genchannel.send("HEI HEI HER ER DET AKTIVITET");

});
*/


let time = new Date().toISOString()
client.on('message', async message => {
    
    if(!message.guild) return;
    if(message.author.bot) return;
    
    
    try {
        let _targetusr = message.mentions.users.first().username
        console.log("Tagging", message.mentions.users.first().username)
        console.log("ID: ", message.mentions.users.first().id)
        //followUser(message.mentions.users.first().id)   //Kaller funksjonen followUser 
        message.channel.send(`hey ${_targetusr} how you doin`)
    }

    catch {
        console.log(" ") //Checks for TAGS to tether to. 
    }
    

    if(message.content.length > 634 ) {
        // Will react if a message is too long and reply instead
        console.log("Message with ", message.content.length, " characters was sent. Time: ", time)
        message.channel.send("lmao too long didnt read")
        }

    else if(message.content.length <= 0) {
        console.log("Empty message, probably an image or a gif. Time: ", time)   //If discord message turns empty we can assume a gif or img has been sent
        message.channel.send("hey dont try to confuse me") //respond with this.
        }

    else {
    
    {   

        let input = message.content.toLowerCase();            
            const inputArray = input.split("");
            let finishedArray = [];
            for (i = 0; i < inputArray.length; i++) {
                if (regexLetters.test(inputArray[i])){
                    finishedArray.push(`:regional_indicator_${inputArray[i]}:`)
                }
                else if (regexNumbers.test(inputArray[i])) {
                    finishedArray.push(numlist[inputArray[i]])
                }
                                                                            //ODINS CODE FOR REGEX AND EMOJI TRANSLATION
                else if (specialcharlist.hasOwnProperty(inputArray[i])) {   //https://0dinp0din.github.io/
                    finishedArray.push(specialcharlist[inputArray[i]])
                }
        
                else if (inputArray[i] === " ") {
                    finishedArray.push(`    `)
                }}
    
    
    
    
        console.log("Responding with message, with amount of characters at ", finishedArray.length, ". Time: ", time)
        
    try {
    message.channel.send(finishedArray.join(" "));
    }
    catch {
        message.channel.send("hey im errorin out")
    }
}
    }
})
//Hello
// Login to Discord with your client's token
client.login(token);

