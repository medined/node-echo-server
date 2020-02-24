// WORKSPACE holds the project files.
pipeline {
  agent any
  stages {
    stage('Deploy to ephemeral namespace.') {
      steps {
        withKubeConfig(credentialsId: 'jenkins-deployer-credentials', serverUrl: 'https://api.va-oit.cloud') {
          sh '''
          NAMESPACE="ephermeral-$JOB_NAME"
          echo "NAMESPACE: $NAMESPACE"

          # create namespace if needed.
          kubectl get namespace $NAMESPACE > /dev/null 2>&1 || kubectl create namespace $NAMESPACE;

          kubectl create configmap nodejs-app \
            --from-file=src/ \
            --namespace=$NAMESPACE \
            -o=yaml \
            --dry-run > deploy/configmap.yaml

          kubectl apply \
            -f deploy/ \
            --namespace=$NAMESPACE
          '''
        }
      }
    }
 }
}
