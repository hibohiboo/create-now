[keyframe name=sway]
  ; [frame] アニメーション25%完了時には右に50px動いている……ということを定義します。
  [frame p=25%  x=50  ]
  ; [frame] アニメーション75%完了時には左に100px動いている……ということを定義します。
  [frame p=75%  x=-50]
[endkeyframe]
[keyframe name=my_anim]
  ; [frmae]x5 scale/rotate/opacityパラメータを指定してみます。
  [frame p=0%   scale=1   rotate=0deg   opacity=1]
  [frame p=25%                          opacity=0]
  [frame p=50%  scale=1.5               opacity=1]
  [frame p=75%            rotate=360deg          ]
  [frame p=100% scale=1                          ]
[endkeyframe]
