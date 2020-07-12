@loadjs storage=plugin/targetFocusZIndex/main.js
[macro name=offTargetFocusZIndex]
[iscript]
TYRANO.kag.stat.autoTargetZIndex = false;
[endscript]
[endmacro]

[macro name=onTargetFocusZIndex]
[iscript]
TYRANO.kag.stat.autoTargetZIndex = true;
[endscript]
[endmacro]
@return