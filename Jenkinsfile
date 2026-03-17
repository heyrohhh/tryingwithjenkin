pipeline{
    agent any

     stages{
        stage('check docker'){
            steps { 
                 sh 'docker version'
            }
        }

        stage('Build image'){
            steps {
                sh 'docker build -t heyrohhh/testjenkin:v1 .'
        }
        }
     }
}