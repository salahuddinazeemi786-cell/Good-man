pipeline {
    agent any

    environment {
        REGISTRY_URL   = "myregistry.local"
        IMAGE_NAME     = "good-man"
        IMAGE_TAG      = "uat-build-${BUILD_NUMBER}"
        FULL_IMAGE     = "${REGISTRY_URL}/${IMAGE_NAME}:${IMAGE_TAG}"
        
        CONTAINER_NAME = "good-man-container"
        HOST_PORT      = "3001"
        CONTAINER_PORT = "3000"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Image with Tag: ${FULL_IMAGE}"
                sh "docker build -t ${FULL_IMAGE} ."
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    try {
                        // Pehle purane container ko stop aur remove karein
                        sh "docker stop ${CONTAINER_NAME} || true"
                        sh "docker rm ${CONTAINER_NAME} || true"
                    } catch (Exception e) {
                        echo "Cleanup skipped."
                    }
                    
                    echo "Deploying new container..."
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${FULL_IMAGE}"
                }
            }
        }
    }
}
