```sh
# git 日志 单个分支 美化展示
git log  --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --first-parent --no-merges dev
```