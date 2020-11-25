## gitに関する設定

### git Hooks

コミットメッセージにブランチ名からissueの番号を取得して、メッセージに付与するスクリプトをhooksに追加。
ブランチ名は`feature/issue番号`とする。(ex. feature/3)

コミットの`#番号`は自動で付与されるので、コミットメッセージの最後に以下を入力で操作可能。

フォーマット一覧	記載方法
--|--
fix	|fix #8
fixes|	This commit fixes #8
fixed|	We have finally fixed #8
close||	close #8
closes|	This closes #8
resolve|	resolve #8
resolves|	resolves #8
resolved|	resolved #8

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
           $1 == "feature" || $1 == "id" { printf "#%s", $2, $3 }
           $2 == "feature" || $2 == "id" { printf "#%s", $3, $4 }
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

## github actions

### 参考
[prごとに](https://qiita.com/resessh/items/38ef6492d0cf21facec8)
[storycap reg-suit](https://qiita.com/eretica/items/080cf75f8b9d2d928799)
[github actions](https://qiita.com/bigwheel/items/2ab7deb237122db2fb8d)
[ms learn GitHub Actions を使用して継続的インテグレーション (CI) ワークフローを作成する](https://docs.microsoft.com/ja-jp/learn/modules/github-actions-ci/)

