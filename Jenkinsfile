pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = 'dockerCreds'
        KUBECONFIG = 'C:\\Users\\MDJMi\\.kube\\config'
		DOCKER_IMAGE_FRONT = 'mdjdocker/esprit-internship2-front:latest' // KUBECTL DOES NOT USE VAIRABLES, CHANGE IT MANUALLY THERE.
        DOCKER_IMAGE_BACK = 'mdjdocker/esprit-internship2-back:latest' // KUBECTL DOES NOT USE VAIRABLES, CHANGE IT MANUALLY THERE.
		GITHUB_REPO = 'https://github.com/MDJ-GitHub/ESPRIT-Internship2.git' 
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {
	
        stage('1/3 | Checkout') {
            steps {
                git branch: 'main', url: GITHUB_REPO
            }
        }

        
        stage('2.1/3 | Build Docker Image (Back)') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                        def dockerImage = docker.build(DOCKER_IMAGE_BACK, 'esprit-internship2-back')
                        dockerImage.push()
						docker.image(DOCKER_IMAGE_BACK).pull()
                    }
                }
            }
        }

        stage('2.2/3 | Build Docker Image (Front)') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                        def dockerImage = docker.build(DOCKER_IMAGE_FRONT, 'esprit-internship2-front')
                        dockerImage.push()
						docker.image(DOCKER_IMAGE_FRONT).pull()
                    }
                }
            }
        }
        

        stage('3/3 | Deploy to Minikube') {
            steps {
				script {
					def timestamp = System.currentTimeMillis()
                    env.TIMESTAMP = "${timestamp}"
                    bat 'kubectl config use-context minikube'
					bat 'kubectl apply -f Kubernetesfile.yaml'
                    bat 'kubectl set image deployment/esprit-internship2-dep-back esprit-internship2-back=%DOCKER_IMAGE_BACK%'
                    bat 'kubectl set image deployment/esprit-internship2-dep-front esprit-internship2-front=%DOCKER_IMAGE_FRONT%'
                    bat 'kubectl patch deployment deployment/esprit-internship2-dep-back -p \"{\\\"spec\\\":{\\\"template\\\":{\\\"metadata\\\":{\\\"annotations\\\":{\\\"timestamp\\\":\\\"%TIMESTAMP%\\\"}}}}}\"'
                    bat 'kubectl patch deployment deployment/esprit-internship2-dep-front -p \"{\\\"spec\\\":{\\\"template\\\":{\\\"metadata\\\":{\\\"annotations\\\":{\\\"timestamp\\\":\\\"%TIMESTAMP%\\\"}}}}}\"'
                    bat 'kubectl rollout status deployment/devops-deployment'
                }
            }
        }
		
    }	
}