var loaders = [
	{
		width: 100,
		height: 100,
		stepsPerFrame: 1,
		trailLength: 1,
		pointDistance: .02,
		fps: 30,
		fillColor: '#05E2FF',
		step: function(point, index) {
			this._.beginPath();
			this._.moveTo(point.x, point.y);
			this._.arc(point.x, point.y, index * 7, 0, Math.PI*2, false);
			this._.closePath();
			this._.fill();
		},
		path: [
			['arc', 50, 50, 30, 0, 360]
		]
	}

];

var d, a, container = document.getElementById('in');
for (var i = -1, l = loaders.length; ++i < l;) {
	d = document.createElement('div');
	d.className = 'l';
	console.log(i);
	a = new Sonic(loaders[i]);
	d.appendChild(a.canvas);
	container.appendChild(d);
	a.canvas.style.marginTop = (150 - a.fullHeight) / 2 + 'px';
	a.canvas.style.marginLeft = (150 - a.fullWidth) / 2 + 'px';
	a.play();
}
