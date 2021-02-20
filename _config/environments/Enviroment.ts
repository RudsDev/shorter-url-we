export interface Enviroment {
	nome: string,
	url: string,
	port: string,
	postgres: PostgresConf
}

export interface PostgresConf {
	host: string,
	database : string,
	username : string,
	password : string,
	port: string
}
