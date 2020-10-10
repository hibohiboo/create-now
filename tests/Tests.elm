module Tests exposing (suite)

import Chat exposing (..)
import Expect exposing (Expectation)
import Test exposing (..)
import Test.Html.Event as Event
import Test.Html.Query as Query
import Test.Html.Selector as Selector
import Time exposing (utc)


nameInitialTest : User -> String -> Test
nameInitialTest ({ name } as user) initial =
    test (name ++ "のイニシャルは「" ++ initial ++ "」だ。") <|
        \_ ->
            let
                actual =
                    nameInitial user

                expect =
                    initial
            in
            Expect.equal expect actual


suite : Test
suite =
    describe "The Main module"
        [ describe "chatForm"
            [ test "フォームに 'abc' と入力したら UpdateContent 'abc' の Msgが発行される" <|
                \_ ->
                    chatForm ""
                        |> Query.fromHtml
                        |> Query.find [ Selector.tag "input" ]
                        |> Event.simulate (Event.input "abc")
                        |> Event.expect (UpdateContent "abc")
            , test "SENDボタンを押したら、SendContent Msgが発行される" <|
                \_ ->
                    chatForm ""
                        |> Query.fromHtml
                        |> Query.find [ Selector.tag "button" ]
                        |> Event.simulate Event.click
                        |> Event.expect SendContent
            ]
        , describe "mediaView" <|
            let
                tanaka =
                    User 1 "Tanaka Jiro"

                suzuki =
                    User 2 "Suzuki Taro"

                meComment =
                    mediaView tanaka Time.utc (Comment tanaka "田中のコメントです。" newYear2019)

                otherComment =
                    mediaView tanaka Time.utc (Comment suzuki "鈴木のコメントです。" newYear2019)
            in
            [ test "コメントしたのは、「Tanaka Jiro」で、現在時刻が表示されるはずだ。" <|
                \_ ->
                    meComment
                        |> Query.fromHtml
                        |> Query.find [ Selector.class "media-body" ]
                        |> Query.find [ Selector.tag "h4" ]
                        |> Query.has [ Selector.text "Tanaka Jiro Date: 2019年1月1日 00:00 火曜日" ]
            , test "コメント内容は、「コメントです。」だ。" <|
                \_ ->
                    meComment
                        |> Query.fromHtml
                        |> Query.find [ Selector.class "media-body" ]
                        |> Query.find [ Selector.tag "div" ]
                        |> Query.has [ Selector.text "田中のコメントです。" ]
            , test "Tanakaのコメントのアイコンの頭文字は「T」である。" <|
                \_ ->
                    meComment
                        |> Query.fromHtml
                        |> Query.find [ Selector.class "icon-rounded" ]
                        |> Query.has [ Selector.text "T" ]
            , test "自身のアイコンは右側に「media-right」のクラスが付くはずだ。" <|
                \_ ->
                    meComment
                        |> Query.fromHtml
                        |> Query.children [ Selector.class "media-part" ]
                        |> Query.index 1
                        |> Query.has [ Selector.class "media-right" ]
            , test "自分以外のアイコンは左側に「media-left」のクラスが付くはずだ。" <|
                \_ ->
                    otherComment
                        |> Query.fromHtml
                        |> Query.children [ Selector.class "media-part" ]
                        |> Query.index 0
                        |> Query.has [ Selector.class "media-left" ]
            ]
        , describe "nameInitial" <|
            let
                tanaka =
                    User 1 "Tanaka Jiro"

                suzuki =
                    User 2 "Suzuki Taro"
            in
            [ nameInitialTest tanaka "T"
            , nameInitialTest suzuki "S"
            ]
        , describe "updateSendContent" <|
            let
                tanaka =
                    User 1 "Tanaka Jiro"

                suzuki =
                    User 2 "Suzuki Taro"
            in
            [ test "打たれている内容が空の場合、コメント反映はされない。" <|
                \_ ->
                    let
                        actual =
                            updateSendContent newYear2019 <| Model tanaka "" [] Time.utc

                        expect =
                            Model tanaka "" [] Time.utc
                    in
                    Expect.equal expect actual
            , test "打たれている内容が空ではない場合、コメントはリストの先頭に追加され、内容は空になる。" <|
                \_ ->
                    let
                        actual =
                            updateSendContent newYear2019 <|
                                Model tanaka
                                    "second"
                                    [ Comment suzuki "first" newYear2019
                                    ]
                                    Time.utc

                        expect =
                            Model tanaka
                                ""
                                [ Comment tanaka "second" newYear2019
                                , Comment suzuki "first" newYear2019
                                ]
                                Time.utc
                    in
                    Expect.equal expect actual
            ]
        , describe "toDate" <|
            [ test "Posixから 2019年1月1日 00:00 火曜日" <|
                \_ ->
                    let
                        actual =
                            toDate utc (Time.millisToPosix 1546300800000)

                        expect =
                            "2019年1月1日 00:00 火曜日"
                    in
                    Expect.equal expect actual
            ]
        ]

newYear2019: TIme.Posix
newYear2019 =
    Time.millisToPosix 1546300800000
