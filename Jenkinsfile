pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/karnan131k/book_stream_ui.git'  // Repository URL
        DOCKER_IMAGE_NAME = 'book-stream-image'                               // Docker image name
        DOCKER_CONTAINER_NAME = 'book-stream-app'                                // Docker container name
        DOCKER_CREDENTIALS_ID = 'book-stream-frontend-docker-hub-credentials'                     // Docker Hub credentials ID
        PORT = '80'                                                          // Exposed port
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git REPO_URL
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                // Build the Angular application
                sh 'npm run build --prod'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                sh "docker build -t ${DOCKER_IMAGE_NAME} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker tag ${DOCKER_IMAGE_NAME} $DOCKER_USER/${DOCKER_IMAGE_NAME}:latest
                    docker push $DOCKER_USER/${DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                // Stop and remove the existing container, then run a new one
                sh """
                docker stop ${DOCKER_CONTAINER_NAME} || true
                docker rm ${DOCKER_CONTAINER_NAME} || true
                docker run -d --name ${DOCKER_CONTAINER_NAME} -p ${PORT}:${PORT} ${DOCKER_IMAGE_NAME}
                """
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
