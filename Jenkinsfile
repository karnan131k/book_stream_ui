pipeline {
    agent any

    environment {
        DOCKER_CONTAINER_NAME = 'book-stream-frontend-app'                      // Docker container name
        DOCKER_HUB_CREDENTIALS = 'book-stream-frontend-docker-hub-credentials' // Docker Hub credentials ID
        PORT = '80'                                                           // Exposed port
        HOST_PORT = '4200'
        VERSION = getVersion(GIT_BRANCH)  // Use GIT_BRANCH built-in Jenkins variable
        DOCKER_IMAGE_NAME = getTagName(VERSION, BUILD_NUMBER)  // Docker image name
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                bat 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                // Build the Angular application
                bat 'npm run build --prod'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                bat "docker build -t ${DOCKER_IMAGE_NAME} ."
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                    docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                    docker tag ${DOCKER_IMAGE_NAME} %DOCKER_USER%/${DOCKER_IMAGE_NAME}:latest
                    docker push %DOCKER_USER%/${DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }
        stage('Deploy') {
            steps {
                // Check if container exists, then stop and remove it
                echo 'Deploying the Docker container...'
                bat """
                docker ps -a --filter "name=${DOCKER_CONTAINER_NAME}" -q | findstr . && docker stop ${DOCKER_CONTAINER_NAME} || echo 'No container to stop'
                docker ps -a --filter "name=${DOCKER_CONTAINER_NAME}" -q | findstr . && docker rm ${DOCKER_CONTAINER_NAME} || echo 'No container to remove'
                docker run -d --name ${DOCKER_CONTAINER_NAME} -p ${HOST_PORT}:${PORT} ${DOCKER_IMAGE_NAME}
                """
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}


def getVersion(String gitBranch) {
    def parts = gitBranch.tokenize('/')
    return parts[-1]  // Return the last part of the branch name
}

def getTagName(String version, String buildId) {
    def tagname = version + '-' + buildId
    return tagname  // Return the tag name
}
