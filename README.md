# node-echo-server

kubectl create configmap nodejs-app \
    --from-file=src/ \
    --namespace=sandbox \
    -o=yaml \
    --dry-run > deploy/configmap.yaml

kubectl apply \
  -f deploy/ \
  --namespace=sandbox
