const Discord = require("discord.js-self");
const axios = require('axios').default;
console.log("Loading NitroGrab")
const client = new Discord.Client();
const client2 = new Discord.Client();
const {
    account_token
} = require("./config.json")
const {
    iworker1
} = require("./config.json")
const {
    iworker2
} = require("./config.json")

var iWorker2_enabled;

if(iworker2.length < 10){ //Checks if you entered a token 2 on setup
    iWorker2_enabled = false;
     console.log("Worker 2 Disabled | Loading 1 worker")
}else{
    iWorker2_enabled = true;
}
client.on('ready', () => {
    console.log(`NitroGrab loaded on ${client.user.tag}`);
    if(iWorker2_enabled == true){
        console.log("Worker 2 Loading..")
        client2.on('ready', ()=>{
            console.log(`NitroGrab loaded on ${client2.user.tag}`)
        })
        client.on('message', message => {
            if(message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/')) {
        
                var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/
        
                var NitroUrl = Nitro.exec(message.content);
                var NitroCode = NitroUrl[0].split('/')[1];
        
                console.log(`${client2.user.tag} found nitro`);
                axios({
                    method: 'POST',
                    url: `https://discordapp.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`,
                    headers:
                    {
                        'Authorization': account_token
                    }
                }).then(
                    () => console.log(`Successfully redeemed a nitro that was found in ${message.guild.name}.`)
        
                ).catch(ex => console.log(`INVALID`))
        
            }
        })
        try{
            client2.login(iworker2)
        }
        catch(err){
            return console.log("Error with Worker 2. Edit config.json with correct token")
        }
        
    }
});

client.on('message', message => {
    if(message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/')) {

        var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/

        var NitroUrl = Nitro.exec(message.content);
        var NitroCode = NitroUrl[0].split('/')[1];

        console.log(`${client.user.tag} found nitro`);
        axios({
            method: 'POST',
            url: `https://discordapp.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`,
            headers:
            {
                'Authorization': account_token
            }
        }).then(
            () => console.log(`Successfully redeemed a nitro that was found in ${message.guild.name}.`)

        ).catch(ex => console.log(`INVALID`))

    }
})
client.login(iworker1)