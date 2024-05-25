docker build . -t registry.deti/egs-fuellink/composer-angular
docker push registry.deti/egs-fuellink/composer-angular
kubectl delete -f angular-deployment.yaml
kubectl apply -f angular-deployment.yaml
