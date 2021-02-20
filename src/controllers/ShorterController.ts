import { Request, Response } from 'express'
import shortService from '../services/ShortService'
import Url from '../models/ShortUrl'
import enviroment from '../../_config/environments'
const regex = /^[a-z0-9]{5,10}$/
const myUrl = enviroment.url()

class ShortController {
	public async short(req: Request, resp: Response): Promise<Response | undefined> {
		try {
			const url: Url = await shortService.short({ original: req.body.url })
			const shortedUrl = { newUrl: `${myUrl}/${url.shorted}` }
			return resp.json(shortedUrl)
		} catch (error) {
			resp.status(500).send(error.toString())
		}
	}

	public async recover(req: Request, resp: Response): Promise<Response | undefined> {
		const shorted = req.params.shorted
		try {
			if (regex.test(shorted)) {
				const url = await shortService.recover(shorted)
				if (url) {
					resp.redirect(url.original)
					return resp.status(302)
				} else {
					return resp.status(404)
				}
			} else {
				return resp.status(418)
					.send("418 - I am a teapot, can't process this request.")
			}
		} catch (error) {
			resp.status(500).send(error.toString())
		}
	}
}

export default new ShortController()
