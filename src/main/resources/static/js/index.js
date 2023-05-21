function createSlides() {
	var slidesContainer = document.querySelector('.slideshow-container');
	var slideContents = [
		{ title: '여행을 하기 위한 첫걸음', subtitle: 'Hang' },
		{ subtitle: `문화재 위치를 지도에서 확인하며 문화유산의 아름다움을 경험하세요` }
	];
	for (var i = 1; i <= 13; i++) {
		var slide = document.createElement('div');
		slide.className = 'slide';

		var img = document.createElement('img');
		img.src = './img/img' + i + '.jpg';
		img.alt = 'Image ' + i;
		slide.appendChild(img);

		var slideContent = document.createElement('div');
		slideContent.className = 'slide-content';

		var title = document.createElement('p');
		title.textContent = slideContents[0].title;
		slideContent.appendChild(title);

		var subtitle = document.createElement('p');
		subtitle.style.fontFamily = 'moonhwa';
		subtitle.textContent = slideContents[0].subtitle;
		slideContent.appendChild(subtitle);

		var subtitle2 = document.createElement('p');
		subtitle2.className = 'subtitle-subject';
		subtitle2.textContent = slideContents[1].subtitle;
		slideContent.appendChild(subtitle2);

		var button = document.createElement('button');
		button.type = 'button';
		button.className = 'start-button';
		button.onclick = function() {
			location.href = '/main';
		};
		var icon = document.createElement('img');
		icon.src = './icon/startbutton.gif';
		icon.alt = 'Start Button';
		button.appendChild(icon);
		slideContent.appendChild(button);

		slide.appendChild(slideContent);
		slidesContainer.appendChild(slide);
	}
	var slides = document.querySelectorAll('.slide');
	slides[0].classList.add('active');
}

function resizeImage() {
	var slides = document.querySelectorAll('.slide');
	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;

	slides.forEach(function(slide) {
		var img = slide.querySelector('img');
		var imgRatio = img.naturalWidth / img.naturalHeight;
		var screenRatio = screenWidth / screenHeight;

		if (screenRatio < imgRatio) {
			img.style.width = 'auto';
			img.style.height = '100%';
		} else {
			img.style.width = '100%';
			img.style.height = 'auto';
		}
	});
}

function startSlideShow() {
	var slides = document.querySelectorAll('.slide');
	var currentSlide = 0;
	setInterval(function() {
		slides[currentSlide].classList.remove('active');
		currentSlide = (currentSlide + 1) % slides.length;
		slides[currentSlide].classList.add('active');
	}, 1200);
}
createSlides();
window.addEventListener('resize', resizeImage);
resizeImage();
startSlideShow();