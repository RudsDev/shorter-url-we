import Chance from 'chance'
const chance = new Chance()

class Shorter {
	public short (): string {
		return this.shorter()
	}

	private shorter(): string {
		const pool = 'abcdefghijklmnopqrstuvwxyz1234567890'
		const length = chance.integer({ min: 5, max: 10 })
		return chance.string({ pool, length, casing: 'lower', symbols: false })
	}
}

export default new Shorter()
