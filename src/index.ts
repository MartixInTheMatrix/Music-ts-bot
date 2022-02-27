import discord from "discord.js";
import { Client } from "./structure/Client"

export const client = new Client('NzcyMjA0OTI5MDI0NTI0Mjg4.X53R4Q.1gG--UzIQ-Ajs7_Q0PrDoGJyFQk')
client.init('./build/commands', './build/events')
