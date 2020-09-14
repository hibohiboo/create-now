module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (class, href, placeholder, type_)
import Html.Events exposing (onInput)



-- ---------------------------
-- MODEL
-- ---------------------------


type alias Model =
    { content : String }


type alias Comment =
    { name : String, content : String }


mediaView : Comment -> Html Msg
mediaView comment =
    div [ class "media" ]
        [ div [ class "media-left" ]
            [ a [ href "#", class "icon-rounded" ] [ text "S" ]
            ]
        , div [ class "media-body" ]
            [ h4 [ class "media-heading" ] [ text " Date:2018/12/29" ]
            , div [] [ text "" ]
            ]
        ]


init : () -> ( Model, Cmd Msg )
init _ =
    ( { content = "" }, Cmd.none )



-- ---------------------------
-- UPDATE
-- ---------------------------


type Msg
    = UpdateContent String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        -- イベントで受け取った値でモデルを更新
        UpdateContent c ->
            ( { model | content = c }, Cmd.none )



-- ---------------------------
-- MAIN
-- ---------------------------


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


view : Model -> Html Msg
view { content } =
    div [ class "page" ]
        [ section [ class "card" ]
            [ div [ class "card-header" ]
                [ text "Elm Chat"
                ]
            , div [ class "card-body" ]
                [ div [ class "media" ]
                    [ div [ class "media-left" ]
                        [ a [ href "#", class "icon-rounded" ] [ text "S" ]
                        ]
                    , div [ class "media-body" ]
                        [ h4 [ class "media-heading" ] [ text "Suzuki Taro Date:2016/09/01" ]
                        , div [] [ text "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。" ]
                        ]
                    ]
                , hr [] []
                , div
                    [ class "media" ]
                    [ div [ class "media-body" ]
                        [ h4 [ class "media-heading" ] [ text "Tanaka Jiro Date:2016/09/01" ]
                        , div [] [ text content ]
                        ]
                    , div
                        [ class "media-right" ]
                        [ a [ href "#", class "icon-rounded" ] [ text "T" ]
                        ]
                    ]
                ]
            ]
        , section []
            [ chatForm ]
        ]


chatForm : Html Msg
chatForm =
    form [ class "chart-form pure-form" ]
        [ div [ class "input-group" ]
            [ input [ type_ "text", class "", placeholder "Comment", onInput UpdateContent ] []
            , button [ class "pure-button button-secondary" ] [ text "SNED" ]
            ]
        ]
