const app = {
	// tags: ({
	player: document.querySelector(`.player`),
	// 	video: this.player.querySelector(`.viewer`),
	// 	progress: app.tags.player.querySelector(`.progress`),
	// 	progressBar: player.querySelector(`.progress__filled`),
	// 	toggle: player.querySelector(`.toggle`),
	// 	ranges: player.querySelector(`.player__slider`),
	// 	skipButtons: player.querySelector(`[data-skip]`),
	// 	init() {
	// 		return this;
	// 	},
	// }).init(),

	playListener() {
		const video = app.player.querySelector(`.viewer`);
		const toggle = app.player.querySelector(`.toggle`);

		[video, toggle].forEach((div)=> {
			div.addEventListener(`click`, app.togglePlayPause);
		});

		[`play`, `pause`].forEach((e)=> {
			video.addEventListener(e, app.togglePlayPauseButton);
		});
	},

	togglePlayPause() {
		const video = app.player.querySelector(`.viewer`);

		video.paused
			? video.play()
			: video.pause();
	},

	togglePlayPauseButton() {
		const video = app.player.querySelector(`.viewer`);
		const toggle = app.player.querySelector(`.toggle`);

		const icon = video.paused
			? `►`
			: `❚❚`;

		toggle.textContent = icon;
	},

	skipListener() {
		const skipButtons = app.player.querySelectorAll(`[data-skip]`);

		skipButtons.forEach((button)=> {
			button.addEventListener(`click`, app.skip);
		});
	},

	skip() {
		const video = app.player.querySelector(`.viewer`);

		video.currentTime += parseFloat(this.dataset.skip);
	},

	rangeListener() {
		const ranges = app.player.querySelectorAll(`.player__slider`);

		ranges.forEach((range)=> {
			[`change`, `input`].forEach((e)=> {
				range.addEventListener(e, app.updateRange);
			});
		});
	},

	updateRange() {
		const video = app.player.querySelector(`.viewer`);

		video[this.name] = this.value;
	},

	progressListener() {
		const video = app.player.querySelector(`.viewer`);

		video.addEventListener(`timeupdate`, app.updateProgress);
	},

	updateProgress() {
		const video = app.player.querySelector(`.viewer`);
		const progressBar = app.player.querySelector(`.progress__filled`);

		const percent = (video.currentTime / video.duration) * 100;

		progressBar.style.flexBasis = `${percent}%`;
	},

	scrubListener() {
		const progress = app.player.querySelector(`.progress`);
		let mousedown = false;

		progress.addEventListener(`click`, app.scrub);

		[`mousedown`, `mouseup`, `touchstart`, `touchend`].forEach((e)=> {
			progress.addEventListener(e, ()=> mousedown = !mousedown);
		});

		// progress.addEventListener(`mousemove`, (e)=> mousedown && app.scrub(e));
		[`mousemove`, `touchmove`].forEach((e)=> {
			progress.addEventListener(e, (evt)=> mousedown && app.scrub(evt));
		});
	},

	scrub(e) {
		const video = app.player.querySelector(`.viewer`);
		const progress = app.player.querySelector(`.progress`);
		const left = e.targetTouches[0].clientX - progress.getBoundingClientRect().left;
		
		console.log(e);
		console.log(e.targetTouches[0].clientX);
		console.log(progress.getBoundingClientRect().left);
		console.log(left);

		// const scrubTime = e.touches
		// 	? Math.round((left / progress.offsetWidth) * video.duration)
		// 	: (e.offsetX / progress.offsetWidth) * video.duration;

		// video.currentTime = scrubTime;
		// console.log(e);
		// console.log(scrubTime);
	},

	onloadFunction() {
		app.playListener();
		app.skipListener();
		app.rangeListener();
		app.progressListener();
		app.scrubListener();
	},
};

window.onload = app.onloadFunction;
