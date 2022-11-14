export function LocalDb (name, prefix) {
  return {
    name: `${prefix}-${name}`,
    cache: undefined,

    async get (propKey) {
      if (!propKey) return await this.getFromBCache()

      if (this.cache && this.cache[propKey]) return this.cache[propKey]
      else return await this.getFromBCache(propKey)
    },

    async set (prop) {
      if (this.cache) {
        Object.assign(this.cache, prop)
      } else {
        const got = await this.getFromBCache()

        if (!got) this.cache = prop
        this.cache = got
        Object.assign(this.cache, prop)
      }

      localStorage.setItem(this.name, JSON.stringify(this.cache))
    },

    async getFromBCache (propKey) {
      const bCache = JSON.parse(localStorage.getItem(this.name))

      if (bCache && propKey) return bCache[propKey] ?? undefined
      else return bCache
    }
  }
}
