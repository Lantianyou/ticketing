x = '- stdout: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: auth-depl\n  namespace: default\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: auth\n  template:\n    metadata:\n      labels:\n        app: auth\n    spec:\n      containers:\n      - env:\n        - name: MONGO_URI\n          value: mongodb://auth-mongo-srv:27017/auth\n        - name: JWT_KEY\n          valueFrom:\n            secretKeyRef:\n              key: JWT_KEY\n              name: jwt-secret\n        image: lantianyou/auth\n        name: auth\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: auth-srv\n  namespace: default\nspec:\n  ports:\n  - name: auth\n    port: 3000\n    protocol: TCP\n    targetPort: 3000\n  selector:\n    app: auth\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: auth-mongo-depl\n  namespace: default\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: auth-mongo\n  template:\n    metadata:\n      labels:\n        app: auth-mongo\n    spec:\n      containers:\n      - image: mongo\n        name: auth\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: auth-mongo-srv\n  namespace: default\nspec:\n  ports:\n  - name: db\n    port: 27017\n    protocol: TCP\n    targetPort: 27017\n  selector:\n    app: auth-mongo\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: client-depl\n  namespace: default\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: client\n  template:\n    metadata:\n      labels:\n        app: client\n    spec:\n      containers:\n      - image: lantianyou/client\n        name: client\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: client-srv\n  namespace: default\nspec:\n  ports:\n  - name: client\n    port: 3000\n    protocol: TCP\n    targetPort: 3000\n  selector:\n    app: client\n---\napiVersion: extensions/v1beta1\nkind: Ingress\nmetadata:\n  annotations:\n    kubernetes.io/ingress.class: nginx\n    nginx.ingress.kubernetes.io/use-regex: \"true\"\n  name: ingress-service\n  namespace: default\nspec:\n  rules:\n  - host: ticketing.dev\n    http:\n      paths:\n      - backend:\n          serviceName: auth-srv\n          servicePort: 3000\n        path: /api/users/?(.*)\n      - backend:\n          serviceName: tickets-srv\n          servicePort: 3000\n        path: /api/tickets/?(.*)\n      - backend:\n          serviceName: client-srv\n          servicePort: 3000\n        path: /?(.*)\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: tickets-depl\n  namespace: default\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: tickets\n  template:\n    metadata:\n      labels:\n        app: tickets\n    spec:\n      containers:\n      - env:\n        - name: MONGO_URI\n          value: mongodb://tickets-mongo-srv:27017/tickets\n        - name: JWT_KEY\n          valueFrom:\n            secretKeyRef:\n              key: JWT_KEY\n              name: jwt-secret\n        image: lantianyou/tickets\n        name: tickets\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: tickets-srv\n  namespace: default\nspec:\n  ports:\n  - name: tickets\n    port: 3000\n    protocol: TCP\n    targetPort: 3000\n  selector:\n    app: tickets\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: tickets-mongo-depl\n  namespace: default\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: tickets-mongo\n  template:\n    metadata:\n      labels:\n        app: tickets-mongo\n    spec:\n      containers:\n      - image: mongo\n        name: tickets\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: tickets-mongo-srv\n  namespace: default\nspec:\n  ports:\n  - name: db\n    port: 27017\n    protocol: TCP\n    targetPort: 27017\n  selector:\n    app: tickets-mongo\n'

print(x)

y = 'error: error validating \"/Users/alan/Developer/ticketing/infra/k8s/nats-depl.yaml\": error validating data: apiVersion not set; if you choose to ignore these errors, turn validation off with --validate=false\n'
print(y)
