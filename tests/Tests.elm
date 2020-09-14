module Tests exposing (suite)

import Expect exposing (Expectation)
import Main exposing (..)
import Test exposing (..)
import Test.Html.Event as Event
import Test.Html.Query as Query
import Test.Html.Selector as Selector


suite : Test
suite =
    describe "The Main module"
        [ describe "chatForm"
            [ test "フォームに 'abc' と入力したら UpdateContent 'abc' の Msgが発行される" <|
                \_ ->
                    chatForm
                        |> Query.fromHtml
                        |> Query.find [ Selector.tag "input" ]
                        |> Event.simulate (Event.input "abc")
                        |> Event.expect (UpdateContent "abc")
            ]
        , describe "mediaView" <|
            let
                suzukiComment =
                    mediaView (Comment "Suzuki Taro" "コメントです。")
            in
            [ test "コメントしたのは、「Suzuki Taro」だ。" <|
                \_ ->
                    suzukiComment
                        |> Query.fromHtml
                        |> Query.find [ Selector.class "media-body" ]
                        |> Query.find [ Selector.tag "h4" ]
                        |> Query.has [ Selector.text "Suzuki Taro Date:2018/12/29" ]
            , test "コメント内容は、「コメントです。」だ。" <|
                \_ ->
                    suzukiComment
                        |> Query.fromHtml
                        |> Query.find [ Selector.class "media-body" ]
                        |> Query.find [ Selector.tag "div" ]
                        |> Query.has [ Selector.text "コメントです。" ]
            ]
        ]
