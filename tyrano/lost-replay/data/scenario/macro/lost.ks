[macro name=lr]
[l][r]
[endmacro]

[macro name=ability]
[iscript]
mp.y_1=10
mp.y_2=48

mp.x_img=mp.x
mp.y_img=mp.y
mp.x_name=mp.x - -20
mp.y_name=mp.y - -mp.y_1
mp.x_group=mp.x - -620
mp.y_group=mp.y - -mp.y_1
mp.x_specialty=mp.x - -143
mp.y_specialty=mp.y - -mp.y_2
mp.x_type=mp.x - -380
mp.y_type=mp.y - -mp.y_2
mp.x_recoil=mp.x - -570
mp.y_recoil=mp.y - -mp.y_2
mp.x_target=mp.x - -700
mp.y_target=mp.y - -mp.y_2
mp.x_effect1=mp.x - -20
mp.y_effect1=mp.y - -95
mp.x_effect2=mp.x - -20
mp.y_effect2=mp.y - -130
[endscript]

[image layer=0 storage=lost/replay/specialty-table.png width=800 height=180 visible=true x=%x_img y=%y_img color]
[ptext layer=0 page=fore text=%name size=30 x=%x_name y=%y_name color=0x000000 vertical=false]
[ptext layer=0 page=fore text=%group size=30 x=%x_group y=%y_group color=0x000000 vertical=false]
[ptext layer=0 page=fore text=%specialty size=30 x=%x_specialty y=%y_specialty color=0x000000 vertical=false]
[ptext layer=0 page=fore text=%type size=30 x=%x_type y=%y_type color=0x000000 vertical=false]
[ptext layer=0 page=fore text=%recoil size=30 x=%x_recoil y=%y_recoil color=0x000000 vertical=false]
[ptext layer=0 page=fore text=%target size=30 x=%x_target y=%y_target color=0x000000 vertical=false]
[ptext layer=0 page=fore text=%effect1 size=30 x=%x_effect1 y=%y_effect1 color=0x000000 vertical=false]
[ptext layer=0 page=fore text=%effect2 size=30 x=%x_effect2 y=%y_effect2 color=0x000000 vertical=false]
[endmacro]

[macro name=item-table]
[iscript]
mp.y_1=5
mp.y_2=48

mp.x_img=mp.x
mp.y_img=mp.y
mp.x_name=mp.x - -20
mp.y_name=mp.y - -mp.y_1
mp.x_specialty=mp.x - -400
mp.y_specialty=mp.y - -mp.y_1
mp.x_weight=mp.x - -100
mp.y_weight=mp.y - -mp.y_2
mp.x_type=mp.x - -290
mp.y_type=mp.y - -mp.y_2
mp.x_area=mp.x - -500
mp.y_area=mp.y - -mp.y_2
mp.x_target=mp.x - -700
mp.y_target=mp.y - -mp.y_2
mp.x_effect1=mp.x - -20
mp.y_effect1=mp.y - -95
mp.x_effect2=mp.x - -20
mp.y_effect2=mp.y - -130
[endscript]

[image layer=%layer|0 storage=lost/replay/item-table.png width=800 height=180 visible=true x=%x_img y=%y_img color]
[ptext layer=%layer|0 page=fore text=%name size=30 x=%x_name y=%y_name color=0x000000 vertical=false]
[ptext layer=%layer|0 page=fore text=%specialty size=30 x=%x_specialty y=%y_specialty color=0x000000 vertical=false]
[ptext layer=%layer|0 page=fore text=%weight size=30 x=%x_weight y=%y_weight color=0x000000 vertical=false]
[ptext layer=%layer|0 page=fore text=%type size=30 x=%x_type y=%y_type color=0x000000 vertical=false]
[ptext layer=%layer|0 page=fore text=%area size=30 x=%x_area y=%y_area color=0x000000 vertical=false]
[ptext layer=%layer|0 page=fore text=%target size=30 x=%x_target y=%y_target color=0x000000 vertical=false]
[ptext layer=%layer|0 page=fore text=%effect1 size=30 x=%x_effect1 y=%y_effect1 color=0x000000 vertical=false]
[ptext layer=%layer|0 page=fore text=%effect2 size=30 x=%x_effect2 y=%y_effect2 color=0x000000 vertical=false]
[endmacro]
