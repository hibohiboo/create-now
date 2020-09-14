module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (class, href, placeholder, type_)
import Html.Events exposing (onInput)



-- ---------------------------
-- MODEL
-- ---------------------------


type alias Model =
    { content : String, comments : List Comment }


type alias Comment =
    { user : User, content : String }


type alias User =
    { uid : Int, name : String }


nameInitial : User -> String
nameInitial { name } =
    String.slice 0 1 name


tanaka =
    User 1 "Tanaka Jiro"


suzuki =
    User 2 "Suzuki Taro"


init : () -> ( Model, Cmd Msg )
init _ =
    ( { content = ""
      , comments =
            [ Comment suzuki "1つ目のコメントです。"
            , Comment suzuki "2つ目のコメントです。"
            , Comment tanaka "1つ目のコメントです。"
            , Comment suzuki "3つ目のコメントです。"
            ]
      }
    , Cmd.none
    )



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
view { content, comments } =
    div [ class "page" ]
        [ section [ class "card" ]
            [ div [ class "card-header" ]
                [ text "Elm Chat"
                ]
            , div [ class "card-body" ] <|
                List.map (mediaView tanaka) comments
                    ++ [ hr [] []
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


mediaView : User -> Comment -> Html Msg
mediaView me { user, content } =
    div [ class "media" ]
        [ div [ class "media-right media-part" ]
            [ a [ href "#", class "icon-rounded" ] [ text <| nameInitial user ]
            ]
        , div [ class "media-body media-part" ]
            [ h4 [ class "media-heading" ] [ text <| user.name ++ " Date:2018/12/29" ]
            , div [] [ text content ]
            ]
        ]
