import Url from '../models/ShortUrl'
import shorter from '../utils/Shorter'
import dao from '../dao/ShortUrlDao'

class ShortService {
	public async short (url: Url): Promise<Url> {
		try {
			url.shorted = shorter.short()
			url = await dao.save(url)
			return url
		} catch (error) {
			throw new Error(error);
		}
	}

	public async recover (shorted: string): Promise<Url> {
		const original = await dao.recover(shorted)
		return original
	}
}

export default new ShortService()
