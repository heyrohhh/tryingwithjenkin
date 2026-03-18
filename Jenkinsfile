pipeline{
    agent any
     environment {
         IMAGE = 'heyrohhh/testjenkinsv3'
         TAG = "${BUILD_NUMBER}"
     }

     stages{
        stage('check docker'){
            steps { 
                 sh 'docker version' 
            }
        }

        stage('Build image'){
            steps {
                sh 'docker build -t $IMAGE:$TAG .'
        }
        }

        stage('Trivy Scan'){
            steps{
                sh ''' 
                      trivy image --exit-code 0 --severity CRITICAL,HIGH --format json --output trivy-report.json $IMAGE:$TAG 
                      trivy image --exit-code 1 --severity CRITICAL,HIGH --format template --template "@/usr/local/share/trivy/templates/html.tpl" --output trivy-report.html $IMAGE:$TAG
                    '''
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
                         docker push $IMAGE:$TAG
                         docker logout
                        '''
                }
            }
        }
     }
    post {
        always {
            archiveArtifacts artifacts: 'trivy-report.html, trivy-report.json',
                         allowEmptyArchive: true
            sh 'docker system prune -f || true'
        }

        failure {
            sh "echo 'Critical Vuln. found image not pushed \$(date '+%Y-%m-%d %H:%M:%S')' >> pipeline.log"
            echo 'Critical Vuln. found image not pushed'
        }

        success {
            sh "echo 'trivy scan clean no vuln found \$(date '+%Y-%m-%d %H:%M:%S')' >> pipeline.log"
            echo 'trivy scan passed'
        }

    }
}