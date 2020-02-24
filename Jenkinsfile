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

          try {
            // Gathering Node.js app's external IP address
            def ip = ''
            def count = 0
            def countLimit = 10
            // Waiting loop for IP address provisioning
            println("Waiting for IP address")        
            while (ip == '' && count < countLimit) {
              sleep 30
              ip = sh script: 'kubectl get svc --namespace=$NAMESPACE -o jsonpath="{.items[?(@.metadata.name==\'nginx-reverseproxy-service\')].status.loadBalancer.ingress[*].ip}"', returnStdout: true
              ip = ip.trim()
              count++                                                                              
            }
            if (ip == '') {
              error("Not able to get the IP address. Aborting...")
            } else {
              // Executing tests 
              sh "chmod +x tests/integration-tests.sh && ./tests/integration-tests.sh ${ip}"
              // Cleaning the integration environment
              //println("Cleaning integration environment...")
              //sh 'kubectl delete -f deploy --namespace=myapp-integration'
              //println("Integration stage finished.")   
            }
          } catch (Exception e) {
            println("Integration stage failed.")
            println("Cleaning integration environment...")
            //sh 'kubectl delete -f deploy --namespace=myapp-integration'
            error("Exiting...")                                     
          }

          kubectl get pods --namespace $NAMESPACE;
          '''
        }
      }
    }
 }
}
