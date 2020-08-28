pipeline {
  agent any

  tools {
    nodejs "NodeJS"
  }

  stages {
    stage('build') {
      steps {
        sh "npm install"
        sh "npm run build"
      }
    }

    stage('deploy') {
      when {
        branch "master"
      }
      steps {
        sh "ng deploy --base-href=https://2020-d05-java-devops.github.io/gestion-des-absences-front/"
      }
    }
  }
  post {

		failure {
			discordSend description: "${BUILD_URL}", footer: 'Echec :( - Robin', image: '', link: '', result: 'FAILURE', thumbnail: '', title: "${env.JOB_NAME}-#${BUILD_NUMBER} - ${env.GIT_COMMIT}", webhookURL: 'https://discordapp.com/api/webhooks/748830347399266344/bwY-_bEjcLBJGm-gX_IuBib5eTV8g1bwyHX3vo5MS3Sdyhw9Bd5lr-JEgn4bF8k-n1ZS'
		}

		success {
			script {
				if ("${env.BRANCH_NAME}" == 'master')
					discordSend description: "${BUILD_URL}", footer: 'Success :) - Robin', image: '', link: '', result: 'SUCCESS', thumbnail: '', title: "${env.JOB_NAME}-#${BUILD_NUMBER} - ${env.GIT_COMMIT}", webhookURL: 'https://discordapp.com/api/webhooks/748830347399266344/bwY-_bEjcLBJGm-gX_IuBib5eTV8g1bwyHX3vo5MS3Sdyhw9Bd5lr-JEgn4bF8k-n1ZS'
			}
		}
	}
}
