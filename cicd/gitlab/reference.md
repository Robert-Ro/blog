```bash
docker run -d --name gitlab-runner3 --restart always -v /var/run/docker.sock:/var/run/docker.sock    -v $pwd/gitlab-runner3:/etc/gitlab-runner   gitlab/gitlab-runner:latest


docker run --detach --hostname gitlab.mapleimage.com --publish 443:443 --publish 80:80 --publish 22:22 --name maple-gitlab --restart always --volume C:\Users\liuts\gitlab\config:/etc/gitlab --volume C:\Users\liuts\gitlab\logs:/var/log/gitlab --volume C:\Users\liuts\gitlab\data:/var/opt/gitlab  --network=gitlab  gitlab/gitlab-ce:latest
```
