import { Client } from "../../structure/Client";
import { Event } from "../../structure/Event"
import discord from "discord.js";

export default async (Client: Client)=>{
    console.log('ready')
    Client.user?.setActivity('En dev')
}