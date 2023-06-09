import fs from "node:fs/promises"
import { resolve } from "node:path"

class Storage {
    static async ensureExists() {
        const userHome = process.env.HOME
        const path = resolve(userHome, "multicw.json")
        try {
            await fs.access(path)
        } catch (error) {
            await fs.writeFile(path, "[]")
        }
    }

    static async loadStored() {
        await Storage.ensureExists()
        const userHome = process.env.HOME
        const data = await fs.readFile(
            resolve(userHome, "multicw.json"),
            "utf-8"
        )
        return JSON.parse(data)
    }

    static async saveStored(data) {
        await Storage.ensureExists()
        const userHome = process.env.HOME
        await fs.writeFile(
            resolve(userHome, "multicw.json"),
            JSON.stringify(data)
        )
    }

    static async addStored(data) {
        await Storage.ensureExists()
        const stored = await Storage.loadStored()
        stored.push(data)
        await Storage.saveStored(stored)
    }

    static async removeStored(id) {
        await Storage.ensureExists()
        const stored = await Storage.loadStored()
        const index = stored.findIndex((item) => item.id === id)
        if (index === -1) {
            console.error("ID not found")
            return
        }
        stored.splice(index, 1)
        await Storage.saveStored(stored)
    }
}

export default Storage
