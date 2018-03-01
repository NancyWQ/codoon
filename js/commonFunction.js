function header1(){
	//第一类页头的加载
	$.ajax({
		type:"get",
		url:"header.html"
	}).then((data)=>{
		$(".title").html(data);
	});
}
function footer(){
	//第一类页尾的加载
	$.ajax({
		type:"get",
		url:"footer.html"
	}).then((data)=>{
		$(".footers").html(data);
	});
}
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			//屏幕会相对平滑
			return window.setTimeout(callback, 1000 / 60);
		};
})();