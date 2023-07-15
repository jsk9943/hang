function createSlides() {
    var slidesContainer = document.querySelector('.slideshow-container');
    var slideContents = [
        { title: '여행을 하기 위한\n첫걸음\nHang', subtitle: '문화재 위치를 지도에서 확인하며\n문화유산의 아름다움을 경험하세요' }
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

        var title = document.createElement('div');
        title.className = 'title';
        var lines = slideContents[0].title.split('\n');
        lines.forEach(function(line) {
            var lineElement = document.createElement('p');
            lineElement.textContent = line;
            title.appendChild(lineElement);
        });
        slideContent.appendChild(title);

        var subtitle = document.createElement('div');
        subtitle.className = 'subtitle';
        var lines = slideContents[0].subtitle.split('\n');
        lines.forEach(function(line) {
            var lineElement = document.createElement('p');
            lineElement.textContent = line;
            subtitle.appendChild(lineElement);
        });
        slideContent.appendChild(subtitle);

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
		var screenRatio = screenWidth / screenHeight;

		if (screenRatio > 1) {
			img.style.width = '100%';
			img.style.height = 'auto';
		} else {
			img.style.width = 'auto';
			img.style.height = '100%';
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
	}, 2000);
}
createSlides();
window.addEventListener('resize', resizeImage);
resizeImage();
startSlideShow();