pipeline{
    agent any
     environment {
         IMAGE = 'heyrohhh/testjenkinsv3'
     }

     stages{
        stage('check docker'){
            steps { 
                 sh 'docker version' 
            }
        }

        stage('Build image'){
            steps {
                sh 'docker build -t $IMAGE .'
        }
        }

        stage('Docker login and push image'){
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'DOCKERHUBCRED',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS',
                )]) {
                    sh ''' 
                         echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                         docker push $IMAGE
                        '''
                }
            }
        }
     }
}