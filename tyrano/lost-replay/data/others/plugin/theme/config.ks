; 2018/07/22 @ko10panda edit
;=========================================
; コンフィグ モード　画面作成
;=========================================

;	メッセージレイヤ0を不可視に
	[layopt layer="message0" visible="false"]

;	fixボタンをクリア
	[clearfix]

;	キーコンフィグの無効化
	[stop_keyconfig]

;	レイヤーモードの解放
	[free_layermode time="100" wait="true"]

;	カメラのリセット
	[reset_camera time="100" wait="true"]

;	前景レイヤの中身をすべて空に
	[iscript]
	$(".layer_camera").empty();
	[endscript]

;	メニューボタン非表示
	[hidemenubutton]

	[iscript]

	TG.config.autoRecordLabel = "true"; // ラベル通過記録を有効に

	tf.current_bgm_vol = parseInt(TG.config.defaultBgmVolume); // BGM音量
	tf.current_se_vol = parseInt(TG.config.defaultSeVolume); // SE音量

	tf.current_ch_speed = parseInt(TG.config.chSpeed); // テキスト表示速度
	tf.current_auto_speed = parseInt(TG.config.autoSpeed); // オート時のテキスト表示速度

	tf.text_skip ="ON"; // 未読スキップ
	if(TG.config.unReadTextSkip != "true"){
		tf.text_skip ="OFF";
	}

	[endscript]

	[iscript]

	/* 画像類のパス */
	tf.img_path = '../others/plugin/theme/image/config/';

	/* 画像類のパス（ボタン） */
	tf.btn_path_off = tf.img_path + 'c_btn.gif';
	tf.btn_path_on  = tf.img_path + 'c_set.gif';

	// ボタン画像の幅と高さ
	tf.btn_width  = 52; // 幅
	tf.btn_height = 60; // 高さ

	// ボタンを表示する座標（tf.config_y_ch[0]とtf.config_y_auto[0]は未使用）
	tf.config_x       = [1094, 361,　429, 497, 565, 633, 701, 769, 837, 905, 973]; // X座標（共通）
	tf.config_y_bgm   = 180; // BGMのY座標
	tf.config_y_se    = 256; // SEのY座標
	tf.config_y_ch    = 332; // テキスト速度のY座標
	tf.config_y_auto  = 408; // オート速度のY座標

	// 上記の配列変数の添字を格納しておく変数。選択した音量や速度に対応。
	tf.config_num_bgm;  // BGM
	tf.config_num_se;   // SE
	tf.config_num_ch;   // テキスト速度
	tf.config_num_auto; // オート速度

	// 既読スキップの画像ファイル名を格納しておく変数
	tf.img_unread_skip;

	// BGMの音量チェック
	switch(tf.current_bgm_vol){
		case   0: tf.config_num_bgm =  0; break;
		case  10: tf.config_num_bgm =  1; break;
		case  20: tf.config_num_bgm =  2; break;
		case  30: tf.config_num_bgm =  3; break;
		case  40: tf.config_num_bgm =  4; break;
		case  50: tf.config_num_bgm =  5; break;
		case  60: tf.config_num_bgm =  6; break;
		case  70: tf.config_num_bgm =  7; break;
		case  80: tf.config_num_bgm =  8; break;
		case  90: tf.config_num_bgm =  9; break;
		case 100: tf.config_num_bgm = 10; break;

		default: break;
	};


	// SEの音量チェック
	switch(tf.current_se_vol){
		case   0: tf.config_num_se =  0; break;
		case  10: tf.config_num_se =  1; break;
		case  20: tf.config_num_se =  2; break;
		case  30: tf.config_num_se =  3; break;
		case  40: tf.config_num_se =  4; break;
		case  50: tf.config_num_se =  5; break;
		case  60: tf.config_num_se =  6; break;
		case  70: tf.config_num_se =  7; break;
		case  80: tf.config_num_se =  8; break;
		case  90: tf.config_num_se =  9; break;
		case 100: tf.config_num_se = 10; break;

		default: break;
	};


	// テキスト速度のチェック
	switch(tf.current_ch_speed){
		case 100: tf.config_num_ch =  0; break;
		case  80: tf.config_num_ch =  1; break;
		case  50: tf.config_num_ch =  2; break;
		case  40: tf.config_num_ch =  3; break;
		case  30: tf.config_num_ch =  4; break;
		case  25: tf.config_num_ch =  5; break;
		case  20: tf.config_num_ch =  6; break;
		case  11: tf.config_num_ch =  7; break;
		case   8: tf.config_num_ch =  8; break;
		case   5: tf.config_num_ch =  9; break;

		default: break;
	};


	// オート時のテキスト速度のチェック
	switch(tf.current_auto_speed){
		case 5000: tf.config_num_auto =  0; break;
		case 4500: tf.config_num_auto =  1; break;
		case 4000: tf.config_num_auto =  2; break;
		case 3500: tf.config_num_auto =  3; break;
		case 3000: tf.config_num_auto =  4; break;
		case 2500: tf.config_num_auto =  5; break;
		case 2000: tf.config_num_auto =  6; break;
		case 1300: tf.config_num_auto =  7; break;
		case  800: tf.config_num_auto =  8; break;
		case  500: tf.config_num_auto =  9; break;

		default: break;
	};

	// ミュート用のBGM、SE音量管理
	if( typeof f.prev_vol_list === 'undefined'){
		f.prev_vol_list = [tf.current_bgm_vol, tf.config_num_bgm, tf.current_se_vol, tf.config_num_se];
	}

	[endscript]

[cm]

;	コンフィグ用の背景を読み込んでトランジション
	[bg storage="&tf.img_path +'bg_config.png'" time="100"]

;	画面右上の「Back」ボタン
	[button fix="true" graphic="&tf.img_path + 'c_btn_back.png'" enterimg="&tf.img_path + 'c_btn_back2.png'" target="*backtitle" x="1140" y="20"]

[jump target="*config_page"]


*config_page
[clearstack]
;------------------------------------------------------------------------------------------------------
; BGM音量
;------------------------------------------------------------------------------------------------------
	[button name="bgmvol,bgmvol_10"  fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[1]"  y="&tf.config_y_bgm" exp="tf.current_bgm_vol =  10; tf.config_num_bgm =  1"]
	[button name="bgmvol,bgmvol_20"  fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[2]"  y="&tf.config_y_bgm" exp="tf.current_bgm_vol =  20; tf.config_num_bgm =  2"]
	[button name="bgmvol,bgmvol_30"  fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[3]"  y="&tf.config_y_bgm" exp="tf.current_bgm_vol =  30; tf.config_num_bgm =  3"]
	[button name="bgmvol,bgmvol_40"  fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[4]"  y="&tf.config_y_bgm" exp="tf.current_bgm_vol =  40; tf.config_num_bgm =  4"]
	[button name="bgmvol,bgmvol_50"  fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[5]"  y="&tf.config_y_bgm" exp="tf.current_bgm_vol =  50; tf.config_num_bgm =  5"]
	[button name="bgmvol,bgmvol_60"  fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[6]"  y="&tf.config_y_bgm" exp="tf.current_bgm_vol =  60; tf.config_num_bgm =  6"]
	[button name="bgmvol,bgmvol_70"  fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[7]"  y="&tf.config_y_bgm" exp="tf.current_bgm_vol =  70; tf.config_num_bgm =  7"]
	[button name="bgmvol,bgmvol_80"  fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[8]"  y="&tf.config_y_bgm" exp="tf.current_bgm_vol =  80; tf.config_num_bgm =  8"]
	[button name="bgmvol,bgmvol_90"  fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[9]"  y="&tf.config_y_bgm" exp="tf.current_bgm_vol =  90; tf.config_num_bgm =  9"]
	[button name="bgmvol,bgmvol_100" fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[10]" y="&tf.config_y_bgm" exp="tf.current_bgm_vol = 100; tf.config_num_bgm = 10"]

;	BGMミュート
;	[button name="bgmvol,bgmvol_0"   fix="true" target="*vol_bgm_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[0]" y="&tf.config_y_bgm" exp="tf.current_bgm_vol = 0; tf.config_num_bgm = 0"]
	[button name="bgmvol,bgmvol_0"   fix="true" target="*vol_bgm_mute" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[0]" y="&tf.config_y_bgm"]

;------------------------------------------------------------------------------------------------------
; SE音量
;------------------------------------------------------------------------------------------------------
	[button name="sevol,sevol_10"  fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[1]"  y="&tf.config_y_se" exp="tf.current_se_vol =  10; tf.config_num_se =  1"]
	[button name="sevol,sevol_20"  fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[2]"  y="&tf.config_y_se" exp="tf.current_se_vol =  20; tf.config_num_se =  2"]
	[button name="sevol,sevol_30"  fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[3]"  y="&tf.config_y_se" exp="tf.current_se_vol =  30; tf.config_num_se =  3"]
	[button name="sevol,sevol_40"  fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[4]"  y="&tf.config_y_se" exp="tf.current_se_vol =  40; tf.config_num_se =  4"]
	[button name="sevol,sevol_50"  fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[5]"  y="&tf.config_y_se" exp="tf.current_se_vol =  50; tf.config_num_se =  5"]
	[button name="sevol,sevol_60"  fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[6]"  y="&tf.config_y_se" exp="tf.current_se_vol =  60; tf.config_num_se =  6"]
	[button name="sevol,sevol_70"  fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[7]"  y="&tf.config_y_se" exp="tf.current_se_vol =  70; tf.config_num_se =  7"]
	[button name="sevol,sevol_80"  fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[8]"  y="&tf.config_y_se" exp="tf.current_se_vol =  80; tf.config_num_se =  8"]
	[button name="sevol,sevol_90"  fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[9]"  y="&tf.config_y_se" exp="tf.current_se_vol =  90; tf.config_num_se =  9"]
	[button name="sevol,sevol_100" fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[10]" y="&tf.config_y_se" exp="tf.current_se_vol = 100; tf.config_num_se = 10"]

;	SEミュート
;	[button name="sevol,sevol_0"   fix="true" target="*vol_se_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[0]" y="&tf.config_y_se" exp="tf.current_se_vol = 0; tf.config_num_se = 0"]
	[button name="sevol,sevol_0"   fix="true" target="*vol_se_mute" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[0]" y="&tf.config_y_se"]

;------------------------------------------------------------------------------------------------------
; テキスト速度
;------------------------------------------------------------------------------------------------------
	[button name="ch,ch_100" fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[1]"  y="&tf.config_y_ch" exp="tf.set_ch_speed =100; tf.config_num_ch = 0"]
	[button name="ch,ch_80"  fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[2]"  y="&tf.config_y_ch" exp="tf.set_ch_speed = 80; tf.config_num_ch = 1"]
	[button name="ch,ch_50"  fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[3]"  y="&tf.config_y_ch" exp="tf.set_ch_speed = 50; tf.config_num_ch = 2"]
	[button name="ch,ch_40"  fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[4]"  y="&tf.config_y_ch" exp="tf.set_ch_speed = 40; tf.config_num_ch = 3"]
	[button name="ch,ch_30"  fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[5]"  y="&tf.config_y_ch" exp="tf.set_ch_speed = 30; tf.config_num_ch = 4"]
	[button name="ch,ch_25"  fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[6]"  y="&tf.config_y_ch" exp="tf.set_ch_speed = 25; tf.config_num_ch = 5"]
	[button name="ch,ch_20"  fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[7]"  y="&tf.config_y_ch" exp="tf.set_ch_speed = 20; tf.config_num_ch = 6"]
	[button name="ch,ch_11"  fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[8]"  y="&tf.config_y_ch" exp="tf.set_ch_speed = 11; tf.config_num_ch = 7"]
	[button name="ch,ch_8"   fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[9]"  y="&tf.config_y_ch" exp="tf.set_ch_speed =  8; tf.config_num_ch = 8"]
	[button name="ch,ch_5"   fix="true" target="*ch_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[10]" y="&tf.config_y_ch" exp="tf.set_ch_speed =  5; tf.config_num_ch = 9"]

;------------------------------------------------------------------------------------------------------
; オート速度
;------------------------------------------------------------------------------------------------------
	[button name="auto,auto_5000" fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[1]"  y="408" exp="tf.set_auto_speed = 5000; tf.config_num_auto = 0"]
	[button name="auto,auto_4500" fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[2]"  y="408" exp="tf.set_auto_speed = 4500; tf.config_num_auto = 1"]
	[button name="auto,auto_4000" fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[3]"  y="408" exp="tf.set_auto_speed = 4000; tf.config_num_auto = 2"]
	[button name="auto,auto_3500" fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[4]"  y="408" exp="tf.set_auto_speed = 3500; tf.config_num_auto = 3"]
	[button name="auto,auto_3000" fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[5]"  y="408" exp="tf.set_auto_speed = 3000; tf.config_num_auto = 4"]
	[button name="auto,auto_2500" fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[6]"  y="408" exp="tf.set_auto_speed = 2500; tf.config_num_auto = 5"]
	[button name="auto,auto_2000" fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[7]"  y="408" exp="tf.set_auto_speed = 2000; tf.config_num_auto = 6"]
	[button name="auto,auto_1300" fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[8]"  y="408" exp="tf.set_auto_speed = 1300; tf.config_num_auto = 7"]
	[button name="auto,auto_800"  fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[9]"  y="408" exp="tf.set_auto_speed =  800; tf.config_num_auto = 8"]
	[button name="auto,auto_500"  fix="true" target="*auto_speed_change" graphic="&tf.btn_path_off" width="52" height="60" x="&tf.config_x[10]" y="408" exp="tf.set_auto_speed =  500; tf.config_num_auto = 9"]

;------------------------------------------------------------------------------------------------------
; 未読スキップ
;------------------------------------------------------------------------------------------------------
;	未読スキップ-ON
	[button name="unread_on"  fix="true" target="*skip_on"  graphic="&tf.btn_path_off" width="161" height="60" x="362" y="484"]

;	未読スキップ-OFF
	[button name="unread_off" fix="true" target="*skip_off" graphic="&tf.btn_path_off" width="172" height="60" x="566" y="484"]

;------------------------------------------------------------------------------------------------------
; コンフィグ起動時の画面更新
;------------------------------------------------------------------------------------------------------

	[call target="*load_img"]

	[call target="*icon_bgm"]
	[call target="*icon_se"]
	[call target="*icon_ch"]
	[call target="*icon_auto"]

	[iscript]
	if(tf.text_skip == 'OFF'){
		$(".unread_off").attr("src","data/others/plugin/theme/image/config/skip_off.png");
		}else{
			$(".unread_on").attr("src","data/others/plugin/theme/image/config/skip_on.png");
			}
	[endscript]

	[test_message_start]

[s]

;--------------------------------------------------------------------------------
; コンフィグモードの終了
;--------------------------------------------------------------------------------
*backtitle
[cm]

;	テキスト速度のサンプル表示に使用していたメッセージレイヤを非表示に
	[layopt layer="message1" visible="false"]

;	fixボタンをクリア
	[clearfix]

;	キーコンフィグの有効化
	[start_keyconfig]

;	コールスタックのクリア
	[clearstack]

;	ゲーム復帰
	[awakegame]

;================================================================================

; ボタンクリック時の処理

;================================================================================
;--------------------------------------------------------------------------------
; BGM音量
;--------------------------------------------------------------------------------
*vol_bgm_mute

[iscript]
	// ミュート
	if( tf.current_bgm_vol != 0 ){
		f.prev_vol_list[0] = tf.current_bgm_vol;
		f.prev_vol_list[1] = tf.config_num_bgm;
		tf.current_bgm_vol = 0;
		tf.config_num_bgm  = 0;

	// 解除
	} else {
		tf.current_bgm_vol = f.prev_vol_list[0];
		tf.config_num_bgm  = f.prev_vol_list[1];
	}
[endscript]

*vol_bgm_change

	[free layer="0" name="bgmvol" time="0" wait="true"]
	[call target="*icon_bgm"]
	[bgmopt volume="&tf.current_bgm_vol"]

[return]

;--------------------------------------------------------------------------------
; SE音量
;--------------------------------------------------------------------------------
*vol_se_mute

[iscript]
	// ミュート
	if( tf.current_se_vol != 0 ){
		f.prev_vol_list[2] = tf.current_se_vol;
		f.prev_vol_list[3] = tf.config_num_se;
		tf.current_se_vol = 0;
		tf.config_num_se  = 0;

	// 解除
	} else {
		tf.current_se_vol = f.prev_vol_list[2];
		tf.config_num_se  = f.prev_vol_list[3];
	}
[endscript]

*vol_se_change

	[free layer="0" name="sevol" time="0" wait="true"]
	[call target="*icon_se"]
	[seopt volume="&tf.current_se_vol"]

[return]

;---------------------------------------------------------------------------------
; テキスト速度
;--------------------------------------------------------------------------------
*ch_speed_change

	[iscript]
	tf.current_ch_speed = tf.set_ch_speed;
	[endscript]

	[free layer="0" name="ch" time="0" wait="true"]
	[call target="*icon_ch"]
	[configdelay speed="&tf.set_ch_speed"]

	[test_message_reset]

[return]

;--------------------------------------------------------------------------------
; オート速度
;--------------------------------------------------------------------------------
*auto_speed_change

	[iscript]
	tf.current_auto_speed = tf.set_auto_speed;
	[endscript]

	[free layer="0" name="auto" time="0" wait="true"]
	[call target="*icon_auto"]
	[autoconfig speed="&tf.set_auto_speed"]

[return]

;--------------------------------------------------------------------------------
; スキップ処理-OFF
;--------------------------------------------------------------------------------
*skip_off

	[iscript]
	$(".unread_off").attr("src","data/others/plugin/theme/image/config/skip_off.png");
	$(".unread_on").attr("src","data/others/plugin/theme/image/config/c_btn.gif");
	tf.text_skip = "OFF";
	[endscript]

	[config_record_label skip="false"]

[return]

;--------------------------------------------------------------------------------
; スキップ処理-ON
;--------------------------------------------------------------------------------
*skip_on

	[iscript]
	$(".unread_off").attr("src","data/others/plugin/theme/image/config/c_btn.gif");
	$(".unread_on").attr("src","data/others/plugin/theme/image/config/skip_on.png");
	tf.text_skip = "ON";
	[endscript]

	[config_record_label skip="true"]

[return]

;================================================================================

; サブルーチン

;================================================================================
;--------------------------------------------------------------------------------

; BGM更新

;--------------------------------------------------------------------------------
*icon_bgm

	[iscript]

	// 設定した音量によって色付き画像の表示・非表示を切替える

	$( ".bgm_img_0").css( "visibility", tf.config_num_bgm == 0 ? 'visible' : 'hidden' );
	$( ".bgm_img_1").css( "visibility", tf.config_num_bgm >  0 ? 'visible' : 'hidden' );
	$( ".bgm_img_2").css( "visibility", tf.config_num_bgm >  1 ? 'visible' : 'hidden' );
	$( ".bgm_img_3").css( "visibility", tf.config_num_bgm >  2 ? 'visible' : 'hidden' );
	$( ".bgm_img_4").css( "visibility", tf.config_num_bgm >  3 ? 'visible' : 'hidden' );
	$( ".bgm_img_5").css( "visibility", tf.config_num_bgm >  4 ? 'visible' : 'hidden' );
	$( ".bgm_img_6").css( "visibility", tf.config_num_bgm >  5 ? 'visible' : 'hidden' );
	$( ".bgm_img_7").css( "visibility", tf.config_num_bgm >  6 ? 'visible' : 'hidden' );
	$( ".bgm_img_8").css( "visibility", tf.config_num_bgm >  7 ? 'visible' : 'hidden' );
	$( ".bgm_img_9").css( "visibility", tf.config_num_bgm >  8 ? 'visible' : 'hidden' );
	$(".bgm_img_10").css( "visibility", tf.config_num_bgm >  9 ? 'visible' : 'hidden' );

	[endscript]

[return]

;--------------------------------------------------------------------------------

; SE更新

;--------------------------------------------------------------------------------
*icon_se

	[iscript]

	$(".se_img_0").css( "visibility", tf.config_num_se == 0 ? 'visible' : 'hidden');
	$(".se_img_1").css( "visibility", tf.config_num_se >  0 ? 'visible' : 'hidden');
	$(".se_img_2").css( "visibility", tf.config_num_se >  1 ? 'visible' : 'hidden');
	$(".se_img_3").css( "visibility", tf.config_num_se >  2 ? 'visible' : 'hidden');
	$(".se_img_4").css( "visibility", tf.config_num_se >  3 ? 'visible' : 'hidden');
	$(".se_img_5").css( "visibility", tf.config_num_se >  4 ? 'visible' : 'hidden');
	$(".se_img_6").css( "visibility", tf.config_num_se >  5 ? 'visible' : 'hidden');
	$(".se_img_7").css( "visibility", tf.config_num_se >  6 ? 'visible' : 'hidden');
	$(".se_img_8").css( "visibility", tf.config_num_se >  7 ? 'visible' : 'hidden');
	$(".se_img_9").css( "visibility", tf.config_num_se >  8 ? 'visible' : 'hidden');
	$(".se_img_10").css("visibility", tf.config_num_se >  9 ? 'visible' : 'hidden');

	[endscript]

[return]

;--------------------------------------------------------------------------------

; テキスト速度更新

;--------------------------------------------------------------------------------
*icon_ch

	[iscript]

	$(".ch_img_1").css( "visibility", tf.config_num_ch >= 0 ? 'visible' : 'hidden');
	$(".ch_img_2").css( "visibility", tf.config_num_ch >  0 ? 'visible' : 'hidden');
	$(".ch_img_3").css( "visibility", tf.config_num_ch >  1 ? 'visible' : 'hidden');
	$(".ch_img_4").css( "visibility", tf.config_num_ch >  2 ? 'visible' : 'hidden');
	$(".ch_img_5").css( "visibility", tf.config_num_ch >  3 ? 'visible' : 'hidden');
	$(".ch_img_6").css( "visibility", tf.config_num_ch >  4 ? 'visible' : 'hidden');
	$(".ch_img_7").css( "visibility", tf.config_num_ch >  5 ? 'visible' : 'hidden');
	$(".ch_img_8").css( "visibility", tf.config_num_ch >  6 ? 'visible' : 'hidden');
	$(".ch_img_9").css( "visibility", tf.config_num_ch >  7 ? 'visible' : 'hidden');
	$(".ch_img_10").css("visibility", tf.config_num_ch >  8 ? 'visible' : 'hidden');

	[endscript]

[return]

;--------------------------------------------------------------------------------

; オート速度更新

;--------------------------------------------------------------------------------
*icon_auto

	[iscript]

	$(".auto_img_1").css( "visibility", tf.config_num_auto >= 0 ? 'visible' : 'hidden');
	$(".auto_img_2").css( "visibility", tf.config_num_auto >  0 ? 'visible' : 'hidden');
	$(".auto_img_3").css( "visibility", tf.config_num_auto >  1 ? 'visible' : 'hidden');
	$(".auto_img_4").css( "visibility", tf.config_num_auto >  2 ? 'visible' : 'hidden');
	$(".auto_img_5").css( "visibility", tf.config_num_auto >  3 ? 'visible' : 'hidden');
	$(".auto_img_6").css( "visibility", tf.config_num_auto >  4 ? 'visible' : 'hidden');
	$(".auto_img_7").css( "visibility", tf.config_num_auto >  5 ? 'visible' : 'hidden');
	$(".auto_img_8").css( "visibility", tf.config_num_auto >  6 ? 'visible' : 'hidden');
	$(".auto_img_9").css( "visibility", tf.config_num_auto >  7 ? 'visible' : 'hidden');
	$(".auto_img_10").css("visibility", tf.config_num_auto >  8 ? 'visible' : 'hidden');

	[endscript]

[return]

;================================================================================

; 画像の読み込み（コンフィグ画面の起動時のみコール）

;================================================================================
*load_img

	[layopt layer="0" visible="true"]

;	BGM
	[image layer="0" name="bgm_img_0"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[0]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_1"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[1]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_2"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[2]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_3"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[3]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_4"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[4]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_5"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[5]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_6"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[6]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_7"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[7]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_8"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[8]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_9"  storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[9]"  y="&tf.config_y_bgm"]
	[image layer="0" name="bgm_img_10" storage="&tf.img_path + 'set1.png'"  x="&tf.config_x[10]" y="&tf.config_y_bgm"]

;	SE
	[image layer="0" name="se_img_0"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[0]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_1"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[1]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_2"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[2]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_3"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[3]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_4"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[4]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_5"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[5]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_6"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[6]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_7"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[7]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_8"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[8]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_9"  storage="&tf.img_path + 'set2.png'" x="&tf.config_x[9]"  y="&tf.config_y_se"]
	[image layer="0" name="se_img_10" storage="&tf.img_path + 'set2.png'" x="&tf.config_x[10]" y="&tf.config_y_se"]

;	テキスト速度
	[image layer="0" name="ch_img_1"  storage="&tf.img_path + 'set1.png'" x="&tf.config_x[1]"  y="&tf.config_y_ch"]
	[image layer="0" name="ch_img_2"  storage="&tf.img_path + 'set1.png'" x="&tf.config_x[2]"  y="&tf.config_y_ch"]
	[image layer="0" name="ch_img_3"  storage="&tf.img_path + 'set1.png'" x="&tf.config_x[3]"  y="&tf.config_y_ch"]
	[image layer="0" name="ch_img_4"  storage="&tf.img_path + 'set1.png'" x="&tf.config_x[4]"  y="&tf.config_y_ch"]
	[image layer="0" name="ch_img_5"  storage="&tf.img_path + 'set1.png'" x="&tf.config_x[5]"  y="&tf.config_y_ch"]
	[image layer="0" name="ch_img_6"  storage="&tf.img_path + 'set1.png'" x="&tf.config_x[6]"  y="&tf.config_y_ch"]
	[image layer="0" name="ch_img_7"  storage="&tf.img_path + 'set1.png'" x="&tf.config_x[7]"  y="&tf.config_y_ch"]
	[image layer="0" name="ch_img_8"  storage="&tf.img_path + 'set1.png'" x="&tf.config_x[8]"  y="&tf.config_y_ch"]
	[image layer="0" name="ch_img_9"  storage="&tf.img_path + 'set1.png'" x="&tf.config_x[9]"  y="&tf.config_y_ch"]
	[image layer="0" name="ch_img_10" storage="&tf.img_path + 'set1.png'" x="&tf.config_x[10]" y="&tf.config_y_ch"]

;	オート速度
	[image layer="0" name="auto_img_1"  storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[1]"  y="&tf.config_y_auto"]
	[image layer="0" name="auto_img_2"  storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[2]"  y="&tf.config_y_auto"]
	[image layer="0" name="auto_img_3"  storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[3]"  y="&tf.config_y_auto"]
	[image layer="0" name="auto_img_4"  storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[4]"  y="&tf.config_y_auto"]
	[image layer="0" name="auto_img_5"  storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[5]"  y="&tf.config_y_auto"]
	[image layer="0" name="auto_img_6"  storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[6]"  y="&tf.config_y_auto"]
	[image layer="0" name="auto_img_7"  storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[7]"  y="&tf.config_y_auto"]
	[image layer="0" name="auto_img_8"  storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[8]"  y="&tf.config_y_auto"]
	[image layer="0" name="auto_img_9"  storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[9]"  y="&tf.config_y_auto"]
	[image layer="0" name="auto_img_10" storage="&tf.img_path + 'set2.png'"  x="&tf.config_x[10]" y="&tf.config_y_auto"]

[return]
