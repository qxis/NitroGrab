const Discord = require("discord.js-self");
const axios = require('axios').default;
console.log("Loading NitroGrab")
const client = new Discord.Client();
const {
    account_token
} = require("./config.json")

client.on('ready', () => {
    console.log(`NitroGrab loaded on ${client.user.tag}`);
});

client.on('message', message => {
    if(message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/')) {

        var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/

        var NitroUrl = Nitro.exec(message.content);
        var NitroCode = NitroUrl[0].split('/')[1];

        console.log(`NITRO FOUND`);

        axios({
            method: 'POST',
            url: `https://discordapp.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`,
            headers:
            {
                'Authorization': client.account_token
            }
        }).then(
            () => console.log(`Successfully redeemed a nitro that was found in ${message.guild.name}. Target down.`)

        ).catch(ex => console.log(`INVALID`))

    }
})

client.login(account_token)