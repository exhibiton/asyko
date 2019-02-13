## Deployment

This is a guide on how to deploy this application to Google Kubernetes Engine. 

## Prerequisites

As prerequisites you need to have installed Google Cloud SDK and Helm. 

For installation guides check out [how to install gcloud SDK](https://cloud.google.com/sdk/install) and [how to install Helm](https://github.com/helm/helm/blob/master/docs/install.md).

## Step 1 - Create Cluster

Pretty basic step, you can just use the default cluster settings or customize how you want. *Remember to Check Enable VPC-native/IP aliasing for Kubernetes Clusters* if you want to use `Cloud Memorystore`. It will be a new default in the future.

## Step 2 - Setup your Configuration

This step requires you to have your Configuration files which are secrets and ssl yaml files.

1. Lets first create `secrets-yml`.

Create it with

    kubectl create secret generic secrets-yml --from-literal user=admin

or use a file. Remember that GKE wants base64 encoded secrets. `--from-literal` flag converts them but upon editing with kubectl, you need to pass those.

2. Create SSL Certificates

Navigate to the [SSL Certificate Guide](https://github.com/exhibiton/asyko/kubernetes/ssl/README.md).

## Step 3 - Now we need to create the SQL service account

If you want to use a managed database service from Google you need to do this step to connect it with your backend pod.

[GKE guide to connecting your application to Google SQL](https://cloud.google.com/sql/docs/mysql/connect-kubernetes-engine)

Use `gcloud sql instances describe [INSTANCE_NAME]` to find out it. Example:

    connectionName: asyko-projectcode:us-east1:asyko-testing-db-1

Create your Secrets for Google Cloud SQL:

    kubectl create secret generic cloudsql-instance-credentials \\
        --from-file=credentials.json=[PROXY_KEY_FILE_PATH]

and

    kubectl create secret generic cloudsql-db-credentials \\
        --from-literal=username=[DBUSER] --from-literal=password=[PASSWORD]

## Step 4 - Dockerfiles

You need to deploy your docker files to either Google Cloud Registry (gcr.io) or some other docker hosting service such as Docker Hub. Naturally you need to authenticate with the gcloud SDK CLI to have Cloud Registry working with `gcloud auth login`.

Your `deploy.yaml` file should have the correct path for a working Dockerfile.

Basic functions to build and push them locally are:

```
docker build -t gcr.io/asyko-projectname/asyko-applicationname:latest -f Dockerfile .
```

and push next with:

```
docker push gcr.io/asyko-projectname/asyko-applicationname:latest
```

This repository includes the dockerfiles for their respective applications.

## Step 5 - Deploy those yamls!

Deploy the yaml files for the application, the application service to expose it and the ingress. 

    kubectl apply -f kubernetes/deploy.yaml

```
kubectl apply -f kubernetes/svc.yaml
```

```
kubectl apply -f kubernetes/ingress.yaml
```
## Step 6 - Create Ingress with NGINX

[Ingress with NGINX controller on Google Kubernetes Engine](https://cloud.google.com/community/tutorials/nginx-ingress-gke) guide for closer info. These are the commands needed to run the setup.

```
kubectl create serviceaccount --namespace kube-system tiller
```
```
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
```
```
helm init --service-account tiller --upgrade
```
```
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
````
Verify install with `kubectl get deployments -n kube-system`

Then run

    helm install --name nginx-ingress stable/nginx-ingress --set rbac.create=true

And done.