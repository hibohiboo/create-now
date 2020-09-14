module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (class, href, placeholder, type_, value)
import Html.Events exposing (onClick, onInput)
import Time exposing (Month(..), Posix, Weekday(..), Zone)



-- ---------------------------
-- MODEL
-- ---------------------------


type alias Model =
    { me : User, content : String, comments : List Comment }


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
    ( { me = tanaka
      , content = ""
      , comments =
            [ Comment tanaka "Tanakaの2つ目のコメントです。"
            , Comment suzuki "Suzukiの3つ目のコメントです。"
            , Comment tanaka "Tanakaの1つ目のコメントです。"
            , Comment suzuki "Suzukiの2つ目のコメントです。"
            , Comment suzuki "Suzukiの1つ目のコメントです。"
            ]
      }
    , Cmd.none
    )



-- ---------------------------
-- UPDATE
-- ---------------------------


type Msg
    = UpdateContent String
    | SendContent


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ me, content, comments } as model) =
    case msg of
        UpdateContent c ->
            ( { model | content = c }, Cmd.none )

        SendContent ->
            ( updateSendContent model, Cmd.none )


updateSendContent : Model -> Model
updateSendContent ({ me, content, comments } as model) =
    if String.isEmpty (String.trim content) then
        model

    else
        { model
            | comments = Comment me content :: comments
            , content = ""
        }


toDate : Time.Zone -> Time.Posix -> String
toDate zone time =
    ""



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
view { me, content, comments } =
    div [ class "page" ]
        [ section [ class "card" ]
            [ div [ class "card-header" ]
                [ text "Elm Chat"
                ]
            , div [ class "card-body" ] <|
                (comments |> List.reverse |> List.map (mediaView me) |> List.intersperse (hr [] []))
            ]
        , section [ class "page-footer" ]
            [ chatForm content
            ]
        ]


chatForm : String -> Html Msg
chatForm content =
    div [ class "chart-form pure-form" ]
        [ div [ class "input-group" ]
            [ input [ type_ "text", value content, placeholder "Comment", onInput UpdateContent ] []
            , button [ class "pure-button button-secondary", onClick SendContent ] [ text "SNED" ]
            ]
        ]


mediaView : User -> Comment -> Html Msg
mediaView me { user, content } =
    let
        mediaBody =
            div [ class "media-body media-part" ]
                [ h4 [ class "media-heading" ] [ text <| user.name ++ " Date:2018/12/29" ]
                , div [] [ text content ]
                ]

        mediaChildren =
            if user == me then
                [ mediaBody
                , div [ class "media-right media-part" ]
                    [ a [ href "#", class "icon-rounded" ] [ text <| nameInitial user ]
                    ]
                ]

            else
                [ div [ class "media-left media-part" ]
                    [ a [ href "#", class "icon-rounded" ] [ text <| nameInitial user ]
                    ]
                , mediaBody
                ]
    in
    div [ class "media" ] mediaChildren
