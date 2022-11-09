const Discord=require("discord.js")
require("dotenv").config()

const client=new Discord.Client({
  intents:["Guilds","GuildMessages","DirectMessages","MessageContent","GuildMessageReactions"], partials:["CHANNEL","GUILD MEMBER","MESSAGE","REACTIONS","USER"]
})

let bot={
  client
}
const guildId="1026742857240944650"// my server id //whichever server you are putting that will serve as guild id

client.slashcommands=new Discord.Collection()
client.loadSlashCommands=(bot,reload)=>require("./handlers/slashcommands")(bot,reload)
client.loadSlashCommands(bot,false)


client.on("ready",async()=>{
  const guild=client.guilds.cache.get(guildId)
  if(!guild)
   return console.error("Target guild not found")

   await guild.commands.set([...client.slashcommands.values()])
  console.log(`Successfully loaded in ${client.slashcommands.size}`)
  process.exit(0)
})
client.login(process.env.TOKEN)
