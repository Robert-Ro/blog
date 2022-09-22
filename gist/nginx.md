```sh
# nginx 代理ws
            proxy_pass http://charge-dev.auteltech.cn;
            # proxy_http_version 2.0;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
            proxy_set_header Host $host;
```
