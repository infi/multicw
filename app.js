#!/usr/bin/env node
import Storage from "./lib/storage.js"
import crypto from "node:crypto"
import { formatDistanceToNow } from "date-fns"
import { de } from "date-fns/locale/index.js"
import { spawn } from "node:child_process"

const args = process.argv.slice(2)

switch (args[0]) {
    case "list":
        const stored = await Storage.loadStored()
        stored.forEach((el) => {
            const time = new Date(el.at).toLocaleTimeString("de")
            const inStr = formatDistanceToNow(new Date(el.at), {
                addSuffix: true,
                locale: de,
            })
            console.log(`${el.name}\t${el.id}\t${time}\t${inStr}`)
        })
        break
    case "add":
        if (args.length < 3) {
            console.error("Usage: multicw add <name> <js date string>")
            break
        }

        const [_, name, ...date] = args
        const dateStr = date.join(" ")

        await Storage.addStored({
            at: new Date(dateStr).getTime(),
            name,
            id: crypto.randomUUID(),
        })
        break
    case "remove":
        const id = args[1]
        await Storage.removeStored(id)
        break
    case "watch":
        const check = async () => {
            const stored = await Storage.loadStored()
            const now = new Date().getTime()
            const events = stored.filter((el) => el.at < now)
            events.forEach((el) => {
                const time = new Date(el.at).toLocaleTimeString("de")
                const inStr = formatDistanceToNow(new Date(el.at), {
                    addSuffix: true,
                    locale: de,
                })
                console.log(`${el.name}\t${el.id}\t${time}\t${inStr}`)
                spawn("notify-send", [
                    `multicw`,
                    `${el.name} is happening now!`,
                ])
            })
        }

        setInterval(check, 1000)
        break
    default:
        console.log(`Usage: multicw (list|add|remove|watch)`)
        break
}
