// WORKSPACE holds the project files.
pipeline {
  agent any
  stages {
    stage('Environment') {
      steps {
        sh 'env | sort'
      }
    }
    stage('Project Directory') {
      steps {
        sh 'find $WORKSPACE'
      }
    }
    stage('Deploy to ephemeral namespace.') {
      steps {
        withKubeConfig(credentialsId: 'jenkins-deployer-credentials', serverUrl: 'https://api.va-oit.cloud') {
          sh '''
          NAMESPACE="ephermeral-$JOB_NAME"
          # create namespace if needed.
          kubectl get namespace $NAMESPACE > /dev/null || kubectl create namespace $NAMESPACE;
          kubectl get pods --namespace $NAMESPACE;
          kubectl delete namespace $NAMESPACE
          '''
        }
      }
    }
  }
}
