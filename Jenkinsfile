pipeline {
    agent any

    environment {
        // Custom registry format jo aapko chahiye
        REGISTRY_URL   = "myregistry.local"
        IMAGE_NAME     = "good-man"
        IMAGE_TAG      = "uat-build-${BUILD_NUMBER}"
        
        // Final image naam jo build hoga
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
                sh "docker build -t ${FULL_IMAGE} ."
            }
        }

        stage('Save Image as Tar') {
            steps {
                // Local server par backup ke liye .tar file banayega
                sh "docker save -o ${IMAGE_NAME}-${IMAGE_TAG}.tar ${FULL_IMAGE}"
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    try {
                        sh "docker stop ${CONTAINER_NAME} || true"
                        sh "docker rm ${CONTAINER_NAME} || true"
                    } catch (Exception e) {
                        echo "No running container found to stop."
                    }
                    
                    // Nayi custom image se container run hoga
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${FULL_IMAGE}"
                }
            }
        }
    }
}
