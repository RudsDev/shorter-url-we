import env from './../../environments'
import Pg, { Client } from 'pg'


class PostgresConn {
	public conn (): Client {
		let conn: Client;
		if (process.env.DATABASE_URL) {
			const conf = {
				connectionString: process.env.DATABASE_URL,
				ssl: { rejectUnauthorized: false }
			}
			conn = new Pg.Client(conf)
		} else {
			conn = new Pg.Client(env.connection())
		}
		conn.connect()
		return conn
	}
}

export default new PostgresConn()
