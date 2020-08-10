tyrano.plugin.kag.tag.bg3 = {
	vital: ["storage"],
	pm: {
		storage: "",
		method: "crossfade",
		wait: "true",
		time: 3E3,
		cross: "false"
	},
	start: function (pm) {
		TYRANO.kag.ftag.hideNextImg();
		var that = this;
		if (pm.time == 0) pm.wait = "false";
		var storage_url = pm.storage;
		// if ($.isHTTP(pm.storage)) storage_url = pm.storage;
		TYRANO.kag.preload(storage_url, function () {
			var j_old_bg = TYRANO.kag.layer.getLayer("base", "fore");
			var j_new_bg = j_old_bg.clone(false);
			j_new_bg.css("background-image", "url(" + storage_url + ")");
			j_new_bg.css("display",
				"none");
			j_old_bg.after(j_new_bg);
			TYRANO.kag.ftag.hideNextImg();
			TYRANO.kag.layer.updateLayer("base", "fore", j_new_bg);
			if (pm.wait == "true") TYRANO.kag.layer.hideEventLayer();
			pm.time = TYRANO.kag.cutTimeWithSkip(pm.time);
			if (pm.cross == "true") $.trans(pm.method, j_old_bg, parseInt(pm.time), "hide", function () {
				j_old_bg.remove()
			});
			$.trans(pm.method, j_new_bg, parseInt(pm.time), "show", function () {
				j_new_bg.css("opacity", 1);
				if (pm.cross == "false") j_old_bg.remove();
				if (pm.wait == "true") {
					TYRANO.kag.layer.showEventLayer();
					TYRANO.kag.ftag.nextOrder()
				}
			})
		});
		if (pm.wait == "false") TYRANO.kag.ftag.nextOrder()
	}
};

(function(){
  var tag_name = 'bg3';
  tyrano.plugin.kag.ftag.master_tag[tag_name] = object(tyrano.plugin.kag.tag[tag_name]);
  tyrano.plugin.kag.ftag.master_tag[tag_name].kag = TYRANO.kag;
  TYRANO.kag.ftag.master_tag[tag_name] = object(tyrano.plugin.kag.tag[tag_name]);
}());
