import fs from 'fs'
import path from 'path'
import { Enviroment, PostgresConf } from './Enviroment'

const PATH_JSON_ENV = `/_config/environments/inc/${process.env.NODE_ENV}.json`

class Env {
	private env: Enviroment
	private db_: PostgresConf
	constructor () {
		const main = require.main?.path || ''
		const pathEnv = path.dirname(main) + PATH_JSON_ENV
		this.env = JSON.parse(fs.readFileSync(pathEnv, 'utf-8'))
		this.db_ = this.env.postgres
	}

	public url (): string {
		return this.env.url
	}

	public db(): PostgresConf {
		return this.db_
	}

	public conf(): Enviroment {
		return this.env
	}

	public connection (): string {
		const user = this.db_.username
		const pwd = this.db_.password
		const hots = this.db_.host
		const port = this.db_.port
		const db = this.db_.database
		return `postgres://${user}:${pwd}@${hots}:${port}/${db}`
	}
}

export default new Env()
