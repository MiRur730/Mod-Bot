  const Discord=require("discord.js")
  require("dotenv").config()

  const client=new Discord.Client({
      intents:["Guilds","GuildMessages","DirectMessages","MessageContent","GuildMessageReactions"], partials:["CHANNEL","GUILD MEMBER","MESSAGE","REACTIONS","USER"]
  })

  let bot={
    client
  }

  client.on("ready",()=>{
    console.log(`Logged in as ${client.user.tag}`)
  })
  client.slashcommands=new Discord.Collection()

  client.loadSlashCommands=(bot,reload)=>require("./handlers/slashcommands")(bot,reload)
  client.loadSlashCommands(bot,false)

client.on("interactionCreate",(interaction)=>{
  if(!interaction.isCommand()) return
  if(!interaction.isGuild())  return interaction.reply("This command can only be used in server")


  const slashcmd=client.slashcommands.get(interaction.commandName)
  if(!slashcmd) return interaction.reply("Invalid slash command")

  if(slashcmd.perms && !interaction.member.permissions.has(slashcommand.perm))
  return interaction.reply("You donot have permission for this command")

  slashcmd.run(client,interaction)




})


  client.login(process.env.TOKEN)
