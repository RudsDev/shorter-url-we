import Url from '../models/ShortUrl'
import pgdb from '../../_config/db/postgres'
import Guid from 'guid'
import { Client } from 'pg'

const conn:Client = pgdb.conn()


class ShortUrlDao {
	private pg = conn
	public async save (url: Url): Promise<Url>{
		const id = Guid.raw()
		const returnig = 'RETURNING shorted, original'
		const values = `'${id}', '${url.shorted}', '${url.original}'`
		const query = `
			INSERT INTO
				Url (id, shorted, original)
			VALUES
				(${values}) ${returnig};`
		try {
			const result = await this.pg.query(query)
			if(result.rows.length) {
				return JSON.parse(JSON.stringify(result.rows[0]))
			}
		} catch (error) {
			if (error.constraint) {
				throw error;
			}
			console.log(error)
		}
		return { original: '' }
	}

	public async recover (shorted: string): Promise<Url> {
		const query = `
		SELECT
			original
		FROM
			Url
		WHERE
			shorted = '${shorted}';`

		try {
			const result = await this.pg.query(query)
			if(result.rows.length) {
				return JSON.parse(JSON.stringify(result.rows[0]))
			}
		} catch (error) {
			throw error;
		}
		return await {original: ''}
	}
}

export default new ShortUrlDao()
