// 注：デフォルトで読み込んでいるのは min 版です。

// =================================
// gMessageTester オブジェクトの簡単な定義
// =================================
window.gMessageTester = {
	 power: false
	,currentCharNumber: 0
	,currentTextNumber: 0
	,currentChar: ""
	,currentHtml: ""
	,currentText: ""
	,glyphUrl: "./tyrano/images/system/nextpage.gif"
	,cssUrl: "./data/others/plugin/theme/testMessagePlus/style.css"
	,sampleUrl: "./data/others/plugin/theme/testMessagePlus/sampletext.ks"
	,className: "test_message_area"
	,messageArea: function() {}
	,timer: null
	,isAutoMode: true
	,shouldHarryUp: false
	,sampleTexts: [""]
	,style: {}
	,toggle: function() {}
	,getKidokuColor: function() {}
	,checkEndText: function() {}
	,getCurrentState: function() {}
	,clearMessageArea: function() {}
	,appendChar: function() {}
	,appendGlyph: function() {}
	,increaseCharNumber: function() {}
	,increaseTextNumber: function() {}
	,update: function() {}
	,next: function() {}
};

// =================================
// gMessageTester オブジェクトの詳細な定義
// =================================

// TM が gMessageTester を指す名前空間で作業（長いので）
(function(TM) {

	//
	// スタイルの取得
	//

	$.get(TM.cssUrl, function(data){
		var style = gMessageTester.style;
		// コメントの削除（/*～*/）
		data = data.replace(/\/\*[\s\S]*?\*\//g, "");
		// 改行、空白、タブの削除
		data = data.replace(/(\n|\s|\t)/g, "");
		// { ～ } の間を取り出して更に ; で区切って配列にする
		data = data.split("{")[ 1 ]
		           .split("}")[ 0 ]
		           .split(";");
		for (var i = 0; i < data.length; i++) {
			var arr = data[ i ].split(":");
			if (arr[ 0 ] != "") {
				style[ arr[ 0 ] ] = arr[ 1 ];
			}
		};
	});

	//
	// サンプル文章の取得
	//

	$.get(TM.sampleUrl, function(data){
		// コメント行の削除
		data = data.replace(/;.*/g, "\n");
		// 改行、空白、タブの削除
		data = data.replace(/(\n|\s|\t)/g, "");
		// [p] で区切る
		var arr = data.split("[p]");
		// 最後に何もなかったらポップ
		if (arr[ arr.length - 1 ] == "") {
			arr.pop();
		}
		// 代入
		gMessageTester.sampleTexts = arr;
	});

	//
	// 既読色の取得
	//

	TM.getKidokuColor = function() {
		var cfg = tyrano.plugin.kag.config;
		var flg = cfg.autoRecordLabel;
		var col = cfg.alreadyReadTextColor;
		if (flg == "true" && col != "default" && typeof col == "string") {
			// $.convertColor(col) は libs.js で定義されているメソッド
			// col に対して String プロトタイプオブジェクトのメソッドを使うので
			// String 型じゃない col を引数にするとバグる
			// （「未定義の関数を実行している」、と出る）
			return $.convertColor(col);
		}
		return "";
	};

	//
	// 現在の情報取得
	//

	TM.getCurrentState = function() {
		// 現在の文章と文字を取得
		var idx = this.currentCharNumber;
		var str = this.sampleTexts[ this.currentTextNumber ];
		var chr = str.charAt(idx);
		if (chr == "[") {
			var idx2 = str.indexOf("]", idx);
			var len  = idx2 - idx + 1;
			var chr  = str.substr(idx, len);
			this.currentCharNumber += len;
			this.getCurrentState();
		}
		this.currentText = str;
		this.currentChar = chr + this.currentChar;
	};

	//
	// 文末に達しているかどうかを返す
	//

	TM.checkEndText = function() {
		if (this.currentCharNumber == 0) {
			return true;
		}
		else {
			return false;
		};
	};

	//
	// 文末に達しているならメッセージエリアをクリアする
	//

	TM.clearMessageArea = function() {
		if (this.checkEndText()) {
			this.messageArea.empty();
			this.currentHtml = "";
		};
	};

	//
	// メッセージエリアに文字をひとつ足す
	//

	TM.appendChar = function() {
		var chr = this.currentChar;
		chr = chr.replace(/\[r\]/g, "<br />");
		chr = chr.replace(/\[kidoku\]/g, "<span style='color:" + this.getKidokuColor() + "'>");
		chr = chr.replace(/\[endkidoku\]/g, "</span>");
		this.currentHtml += chr;
		this.messageArea.html(this.currentHtml);
		this.currentChar = "";
	};

	//
	// メッセージエリアにクリックグリフを足す
	//

	TM.appendGlyph = function() {
		var height = this.style["font-size"] || tyrano.plugin.kag.stat.default_font.size;
		var color  = this.style["color"]     || tyrano.plugin.kag.stat.default_font.color;
		//this.messageArea.append("<img src='" + this.glyphUrl + "' />");
		this.messageArea.append('<span style="display: inline-block; width: 10px; height: 4px; background-color: ' + color + '; transform: translateY(3px);" class="img_next_test">　</span>')
	};

	//
	// 文字番号の増加処理
	//

	TM.increaseCharNumber = function() {
		// 文字番号増加
		this.currentCharNumber++;
		// 文章の長さを超えたら
		if (this.currentCharNumber >= this.currentText.length) {
			// ０にして
			this.currentCharNumber = 0;
			// 文章番号を増加
			this.increaseTextNumber();
			// ハリーアップ義務をなくす
			this.shouldHarryUp = false;
		};
	};

	//
	// 文章番号の増加処理
	//

	TM.increaseTextNumber = function() {
		// 文章番号を増加
		this.currentTextNumber++;
		// 文章番号が文章の数を超えたら
		if (this.currentTextNumber >= this.sampleTexts.length) {
			// ０にする
			this.currentTextNumber = 0;
		};
	};

	//
	// アップデート処理
	//

	TM.update = function() {
		//console.log("update.")
		// 参照
		var CO = tyrano.plugin.kag.config;
		// 現在の文章と文字を取得
		TM.getCurrentState();
		// メッセージエリアの消去チェック
		TM.clearMessageArea();
		// 文字を足す
		TM.appendChar();
		// 文字番号の増加処理
		TM.increaseCharNumber();
		// 文末でなければ
		if (!TM.checkEndText()) {
			// ディレイを計算
			var delay = parseInt(CO.chSpeed);
			if (TM.shouldHarryUp) {
				delay = 2;
			};
			// ディレイ≦１ならば即座にアップデート
			if (delay <= 1) {
				TM.update();
			}
			// ディレイ＞０ならばアップデートの予約
			else {
				clearTimeout(TM.timer);
				TM.timer = setTimeout(TM.update, delay);
			};
		}
		// 文末ならば
		else {
			// デストロイチェック
			if ($("." + TM.className).length < 1) return TM.destroy();
			// クリック待ちグリフを追加
			TM.appendGlyph();
			// オートモードならば
			if (TM.isAutoMode) {
				// ディレイを計算して
				var delay = parseInt(CO.autoSpeed)
				          + parseInt(CO.autoSpeedWithText)
				          * TM.currentText.length;
				// アップデートの予約
				clearTimeout(TM.timer);
				TM.timer = setTimeout(TM.update, delay);
				// アニメーション
				$(".img_next_test").css("width", 10 * delay / 1000).animate({
					"width": "0"
				}, delay, "linear")
			};
		};
	};

	TM.next = function() {
		// 文末に達していて待機中ならば次の文章の読み込み
		if (TM.checkEndText()) {
			clearTimeout(TM.timer);
			TM.update();
		}
		// 文末に達していなければ表示を急がせる
		else {
			TM.shouldHarryUp = true;
		};
	};

	//
	// 駆動状態のＯＮ／ＯＦＦを行う
	//

	TM.create = function () {
		//console.log("create.");
		var that = this;
		// フリーレイヤーの表示
		$(".layer_free").show();
		// 現在のデフォルトフォント設定の取得
		var font = tyrano.plugin.kag.stat.default_font;
		// スクロールイベント名
		var scroll = "onwheel"      in document ? "wheel" :
		             "onmousewheel" in document ? "mousewheel" :
		                                          "DOMMouseScroll";
		// メッセージエリアの作成
		var area = $("<div class='" + this.className + "'></div>")
		// 挿入
		.appendTo(".layer_free")
		// エリアクリック/スクロール時の処理
		.click(this.next)
		.on(scroll, this.next);
		// スタイルのセット
		if (!this.style["font-weight"]) area.css("font-weight", font.bold);
		if (!this.style["font-size"  ]) area.css("font-size"  , font.size + "px");
		if (!this.style["font-family"]) area.css("font-family", font.face);
		if (!this.style["color"      ]) area.css("color"      , font.color);
		// 代入
		this.messageArea = area;
		// 起動する
		clearTimeout(this.timer);
		this.timer = setTimeout(this.update, 500);
	};

	TM.destroy = function () {
		//console.log("destroy.");
		// タイマーを切る
		clearTimeout(this.timer);
		// 初期化
		this.currentCharNumber = 0;
		this.currentTextNumber = 0;
		// DOM 要素の削除
		this.messageArea.remove();
	};

}(window.gMessageTester));
