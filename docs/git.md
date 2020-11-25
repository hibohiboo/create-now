## gitに関する設定

### git Hooks

コミットメッセージにブランチ名からissueの番号を取得して、メッセージに付与するスクリプトをhooksに追加。


```bash:.git/hooks/commit-msg
#!/bin/sh

if [ -n "${GIT_DIR}" ]; then
    hooksdir="./${GIT_DIR}/hooks/"
else
    hooksdir="./.git/hooks/"
fi

. "${hooksdir}common.sh"

ticket="$(extractTicketId)"
if [ -n "${ticket}" ]; then
    appendMsgTo1stLine "$1" "${ticket}"
fi
```

```bash:.git/hooks/common.sh
#! /bin/sh

getGitBranchName()
{
    branch="$(git symbolic-ref HEAD 2>/dev/null)" ||
            "$(git describe --contains --all HEAD)"
    echo ${branch##refs/heads/}
}

extractTicketId()
{
    echo "$(getGitBranchName)" \
    | awk 'BEGIN{ FS="[/]"}
           $1 == "feature" || $1 == "id" { printf "issue #%s", $2, $3 }
           $2 == "feature" || $2 == "id" { printf "issue #%s", $3, $4 }
           '
}

appendMsgTo1stLine()
{
    mv $1 $1.$$
    if [ -s "$1.$$" ]; then
    if head -1 "$1.$$" | grep "$2" > /dev/null; then
        cp "$1.$$" "$1"
    else
            sed '1s/$/ '"$2"'/' "$1.$$" > $1
    fi
    else
        echo "$2" > "$1"
    fi
    rm -f $1.$$
}
```


