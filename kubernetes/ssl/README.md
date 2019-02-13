## Deployment

This is a guide on how to create a SSL certificate with LetsEncrypt using `cert-manager` and applying it to your k8s deployment.

This guide bases itself on [cert-managers quick start](https://github.com/jetstack/cert-manager/blob/master/docs/tutorials/acme/quick-start/index.rst).

## Prerequisites

As prerequisites you need to have installed Google Cloud SDK and Helm. 

For installation guides check out [how to install gcloud SDK](https://cloud.google.com/sdk/install) and [how to install Helm](https://github.com/helm/helm/blob/master/docs/install.md).

## Step 1 - Install Tiller

Tiller is Helm's server-side component, which the `helm` client uses to deploy resources.

Create the a ServiceAccount for tiller:
```
kubectl create serviceaccount tiller --namespace=kube-system
```

Grant the `tiller` service account cluster admin privileges: 
```
kubectl create clusterrolebinding tiller-admin --serviceaccount=kube-system:tiller --clusterrole=cluster-admin
```

Install tiller with the `tiller` service account: 
```
helm init --service-account=tiller
```

## Step 2 - Deploy Cert Manager

We need to install [cert-manager](https://github.com/jetstack/cert-manager/) to request to certificate from LetsEncrypt.

Install the cert-manager CRDs:
```
kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.6/deploy/manifests/00-crds.yaml
```

Install cert-manager 
```
helm install --name cert-manager --namespace cert-manager stable/cert-manager
```

## Step 3 - Configure Lets Encrypt Issuer

We need to setup an issuer for Lets Encrypt to issue the certificate. You should first try to get the certificate using the staging issuer, then delete them and do it with the production version.

Remember to see that your variables are correct.

Deploy the staging-issuer: 
```
kubectl apply -f kubernetes/ssl/staging-issuer.yaml
```

## Step 4 - Request SSL Certificate

Check that the `staging-certificate.yaml` that your variables are correct and it's time to request the certificate!

It's as easy as:
```
kubectl apply -f kubernetes/ssl/staging-certificate.yaml
```

You can check the progress with 
```
kubectl describe certificate staging-certificate
```

## Step 5 - Apply certificate

The issuer creates us a certificate and a Google Kubernetes Engine configuration so we only need to apply that to our Ingress controller.

This is a simple step of adding 
```
  tls:
  - secretName: $CERTIFICATE_NAME
```
to the `issuer.yaml` file. You're all done :)