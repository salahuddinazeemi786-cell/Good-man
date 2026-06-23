pipeline {
    agent any

    environment {
        IMAGE_NAME = "good-man-app"
        CONTAINER_NAME = "good-man-app"
        HOST_PORT = "3001"
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
                sh '''
                    docker build -t $IMAGE_NAME:latest .
                '''
            }
        }

        stage('Remove Old Container') {
            steps {
                sh '''
                    docker rm -f $CONTAINER_NAME || true
                '''
            }
        }

        stage('Deploy New Container') {
            steps {
                sh '''
                    docker run -d \
                    --name $CONTAINER_NAME \
                    --restart unless-stopped \
                    -p $HOST_PORT:$CONTAINER_PORT \
                    $IMAGE_NAME:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    docker ps | grep $CONTAINER_NAME
                '''
            }
        }
    }
}
