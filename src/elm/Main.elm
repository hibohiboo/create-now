port module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (class, href, placeholder, type_, value)
import Html.Events exposing (onClick, onInput)
import Json.Decode as D
import Json.Decode.Pipeline as Pipeline
import Json.Encode as E exposing (Value)
import Task
import Time exposing (Month(..), Posix, Weekday(..), Zone)



-- ---------------------------
-- Ports
-- ---------------------------


port addCollection : Value -> Cmd msg


port readComments : () -> Cmd msg


port readedComments : (Value -> msg) -> Sub msg



-- ==============================================================================================
-- エンコーダ
-- ==============================================================================================


encodeUser : User -> Value
encodeUser user =
    E.object
        [ ( "uid", E.int <| user.uid )
        , ( "name", E.string <| user.name )
        ]


encodeComment : Comment -> Value
encodeComment comment =
    E.object
        [ ( "user", encodeUser comment.user )
        , ( "content", E.string <| comment.content )
        , ( "postTime", E.int <| Time.posixToMillis comment.postTime )
        ]


encode : Comment -> Value
encode comment =
    E.object [ ( "collection", E.string <| "comments" ), ( "payload", encodeComment comment ) ]



-- ---------------------------
-- MODEL
-- ---------------------------


type alias Model =
    { me : User
    , content : String
    , comments : List Comment
    , zone : Zone
    }


type alias Comment =
    { user : User
    , content : String
    , postTime : Posix
    }


type alias User =
    { uid : Int
    , name : String
    }


nameInitial : User -> String
nameInitial { name } =
    String.slice 0 1 name


tanaka : User
tanaka =
    User 1 "Tanaka Jiro"


suzuki : User
suzuki =
    User 2 "Suzuki Taro"


init : () -> ( Model, Cmd Msg )
init _ =
    ( { me = tanaka
      , content = ""
      , comments =
            [ Comment suzuki "新年明けましておめでとうございます。" (Time.millisToPosix 1546300800000)
            ]
      , zone =
            Time.utc
      }
    , Task.perform AdjustTimeZone Time.here
    )



-- ---------------------------
-- UPDATE
-- ---------------------------


type Msg
    = AdjustTimeZone Zone
    | UpdateContent String
    | SendContent
    | AddComment Posix


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ me, content, comments } as model) =
    case msg of
        AdjustTimeZone zone ->
            ( { model | zone = zone }, Cmd.none )

        UpdateContent c ->
            ( { model | content = c }, Cmd.none )

        SendContent ->
            ( model, Task.perform AddComment Time.now )

        AddComment postTime ->
            ( updateSendContent postTime model, addCollection <| encode <| Comment model.me model.content postTime )


updateSendContent : Posix -> Model -> Model
updateSendContent postTime ({ me, content, comments } as model) =
    if String.isEmpty (String.trim content) then
        model

    else
        { model
            | comments = Comment me content postTime :: comments
            , content = ""
        }


toDate : Zone -> Posix -> String
toDate zone time =
    let
        padZero2 =
            String.padLeft 2 '0'

        month =
            Time.toMonth zone time |> toMonthNumber

        day =
            Time.toDay zone time |> String.fromInt

        year =
            Time.toYear zone time |> String.fromInt

        hour =
            Time.toHour zone time |> String.fromInt |> padZero2

        minutes =
            Time.toMinute zone time |> String.fromInt |> padZero2

        week =
            Time.toWeekday zone time |> toJapaneseWeekday
    in
    year ++ "年" ++ month ++ "月" ++ day ++ "日 " ++ hour ++ ":" ++ minutes ++ " " ++ week ++ "曜日"


toMonthNumber : Time.Month -> String
toMonthNumber month =
    case month of
        Jan ->
            "1"

        Feb ->
            "2"

        Mar ->
            "3"

        Apr ->
            "4"

        May ->
            "5"

        Jun ->
            "6"

        Jul ->
            "7"

        Aug ->
            "8"

        Sep ->
            "9"

        Oct ->
            "10"

        Nov ->
            "11"

        Dec ->
            "12"


toJapaneseWeekday : Weekday -> String
toJapaneseWeekday weekday =
    case weekday of
        Mon ->
            "月"

        Tue ->
            "火"

        Wed ->
            "水"

        Thu ->
            "木"

        Fri ->
            "金"

        Sat ->
            "土"

        Sun ->
            "日"



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
view { me, content, comments, zone } =
    div [ class "page" ]
        [ section [ class "card" ]
            [ div [ class "card-header" ]
                [ text "Elm Chat"
                ]
            , div [ class "card-body" ] <|
                (comments |> List.reverse |> List.map (mediaView me zone) |> List.intersperse (hr [] []))
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


mediaView : User -> Zone -> Comment -> Html Msg
mediaView me zone { user, content, postTime } =
    let
        mediaBody =
            div [ class "media-body media-part" ]
                [ h4 [ class "media-heading" ] [ text <| user.name ++ " Date: " ++ toDate zone postTime ]
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
