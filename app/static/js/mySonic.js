var loaders = [
			{
				width: 100,
				height: 100,
				stepsPerFrame: 1,
				trailLength: 1,
				pointDistance: .05,
				strokeColor: '#4AE5EC',
				fps: 20,
				setup: function() {
					this._.lineWidth = 4;
				},
				step: function(point, index) {
					var cx = this.padding + 50,
						cy = this.padding + 50,
						_ = this._,
						angle = (Math.PI/180) * (point.progress * 360),
						innerRadius = index === 1 ? 10 : 25;
					_.beginPath();
					_.moveTo(point.x, point.y);
					_.lineTo(
						(Math.cos(angle) * innerRadius) + cx,
						(Math.sin(angle) * innerRadius) + cy
					);
					_.closePath();
					_.stroke();
				},
				path: [
					['arc', 50, 50, 40, 0, 360]
				]
			}
		];


		var d, a, container = document.getElementById('in');
		for (var i = -1, l = loaders.length; ++i < l;) {
			d = document.createElement('div');
			d.className = 'canvas-wrapper';
			a = new Sonic(loaders[i]);
			d.appendChild(a.canvas);
			container.appendChild(d);
			a.play();
		}
