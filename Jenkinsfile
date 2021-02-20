pipeline {
	agent { label 'docker-slave-0' }
	environment {
		DOCKER_HUB_LG = "ruds"
    DOCKER_HUB_PWD = "Dockerfiles/pwd.txt"
		APP_NAME = "shorter-url-we"
	}
	stages {
		stage("Copy apropiate Dockerfile "){
			steps{
				sh("cp Dockerfiles/${env.BRANCH_NAME}/Dockerfile .")
			}
		}
		stage('Deliver for development') {
			when { branch 'develop' }
			stages {
				stage("Build image and run container") {
					steps {
						sh '''
							sudo docker build -t ruds/${APP_NAME}-dev .
						'''
						sh '''
							if [ "$(sudo docker ps -aq -f name=${APP_NAME})" ]; then
								sudo docker rm ${APP_NAME} -f
							fi &&\
							sudo docker run -p:4440:4440 -d --name ${APP_NAME} ruds/${APP_NAME}-dev
						'''
					}
				}
			}
		}
		stage('Deliver for Azure') {
			when { branch 'homolog' }
			stages {
				stage("Build image") {
					steps {
						sh '''
							sudo docker build -t ruds/${APP_NAME}-homolog:${BUILD_NUMBER} .
						'''
					}
				}
				stage("Upload to docker.hub") {
					steps {
						sh '''
							cat ${DOCKER_HUB_PWD} | sudo docker login --username ${DOCKER_HUB_LG} --password-stdin
						'''
						sh '''
							sudo docker push ruds/${APP_NAME}-homolog:${BUILD_NUMBER}
						'''
					}
				}
				stage("Deploy on azure VM") {
					agent { label 'azure-slave-0' }
					options { skipDefaultCheckout() }
					steps {
						sh '''
							sudo docker login --username ${DOCKER_HUB_LG} --password ${DOCKER_HUB_PWD}
						'''
						sh '''
							sudo docker image pull ruds/${APP_NAME}-homolog:${BUILD_NUMBER}
						'''
						sh '''
						if [ "$(sudo docker ps -aq -f name=${APP_NAME})" ]; then
								sudo docker rm ${APP_NAME} -f
							fi &&\
							sudo docker run -p:4440:4440 -d --name ${APP_NAME} ruds/${APP_NAME}-homolog:${BUILD_NUMBER}
						'''
					}
				}
			}
		}
		stage('Deliver for Heroku') {
			when { branch 'heroku-homolog' }
			stages {
				stage("Build image") {
					steps {
						sh '''
							sudo docker build -t web .
						'''
					}
				}
				stage("Upload to Herroku Register and release") {
					steps {
						sh '''
							sudo docker tag web registry.heroku.com/${APP_NAME}/app
						'''
						sh '''
							sudo heroku container:push web -a ${APP_NAME}
						'''
						sh '''
							sudo heroku container:release web --app ${APP_NAME}
						'''
					}
				}
			}
		}
	}
}
