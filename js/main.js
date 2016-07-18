(function (windowObject, documentObject) {
	var fontFamilyArray = [
	    'Helvetica', 'Agency FB', 'Antiqua', 'Architect', 'Arial', 'BankFuturistic', 'BankGothic', 'Blackletter',
	    'Blagovest', 'Calibri', 'Comic Sans', 'Courier', 'Cursive', 'Decorative', 'Fantasy', 'Fraktur', 'Frosty',
	    'Garamond', 'Georgia', 'Impact', 'Minion', 'Modern', 'Monospace', 'Open Sans', 'Palatino', 'Roman',
	    'Sans-serif', 'Serif', 'Script', 'Swiss', 'Times', 'Times New Roman', 'Tw Cen MT', 'Verdana'
	], fontSizeArray = [
	    /*8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96*/
	    1, 2, 3, 4, 5, 6, 7
	], fontColorArray = [
	    '#880E4F', '#9C27B0', '#673AB7', '#3F51B5', '#00BCD4', '#006064', '#01579B', '#009688', '#4CAF50', '#795548', 
	    '#9E9E9E', 'black', 'gray', 'white', '#333', 'yellow', 'lime', 'aqua', 'fuchsia', 'red', 'green', 'blue',
	    'purple', 'maroon', 'olive', 'silver', 'navy', 'teal'
	];
	var functions = {
		buildElement: function (tag, className, styleObject, text) {
			var element = documentObject.createElement(tag);
			if (className) {
				element.className = className;
			}
			//setting style
			if (styleObject) {
				Object.keys(styleObject).forEach(function (key) {
					element.style[key] = styleObject[key];
				});
			}
			if (text) {
				var textNode = documentObject.createTextNode(text);
			    element.appendChild(textNode);
			}
			return element;
		},
		addColorBoxes: function (chooseColorDiv) {
			for (var i = 0; i < fontColorArray.length; i++) {
				var styleObject = {
					background: fontColorArray[i]
				};
				var colorBox = functions.buildElement('div', 'colorBox', styleObject, null);
				chooseColorDiv.appendChild(colorBox)
			}
		},
		toggleDisplay: function (element) {
			element.style.display = (element.style.display == 'none') ? 'block' : 'none';
		},
		addFontSizeBoxes: function (chooseFontSizeDiv) {
			for (var i = 0; i < fontSizeArray.length; i++) {
				var fontSizeBox = functions.buildElement('div', 'fontSizeBox', null, fontSizeArray[i]);
				chooseFontSizeDiv.appendChild(fontSizeBox);
			}
		},
		addFontFamilyBoxes: function (chooseFontFamilyDiv) {
			for (var i = 0; i < fontFamilyArray.length; i++) {
				var styleObject = {
					fontFamily: fontFamilyArray[i]
				};
				var fontFamilyBox = functions.buildElement('div', 'fontFamilyBox', styleObject, fontFamilyArray[i]);
				chooseFontFamilyDiv.appendChild(fontFamilyBox);
			}
		},
		changeFontColor: function (event) {
			var element = event.target || event.srcElement;
			var color = element.style.background;
			var temp = color.indexOf('none');
			if (temp != -1) {
				color = color.slice(0, (temp - 1));
			}
			documentObject.execCommand('styleWithCSS', false, true);
			documentObject.execCommand('foreColor', false, color);
			event.preventDefault();
		},
		changeFontFamily: function (event) {
			var element = event.target || event.srcElement;
			var fontFamily = element.style.fontFamily;
			documentObject.querySelector('#toolbar ul li:nth-child(6) span').firstChild.nodeValue = fontFamily;
			//documentObject.execCommand('styleWithCSS', false, true);
			documentObject.execCommand('fontName', false, fontFamily);
			event.preventDefault();
		},
		changeFontSize: function (event) {
			var element = event.target || event.srcElement;
			var fontSize = element.firstChild.nodeValue;
			documentObject.querySelector('#toolbar ul li:nth-child(5) span').firstChild.nodeValue = fontSize;		
			documentObject.execCommand('fontSize', false, fontSize);
			event.preventDefault();
		}
	};

	windowObject.onload = function () {
		var boldButton = documentObject.getElementById('boldButton'),
		    underlineButton = documentObject.getElementById('underlineButton'),
		    italicButton = documentObject.getElementById('italicButton'),
		    textColorButton = documentObject.getElementById('textColorButton'),
		    fontSizeButton = documentObject.getElementById('fontSizeButton'),
		    fontFamilyButton = documentObject.getElementById('fontFamilyButton'),
		    chooseColorDiv = documentObject.getElementById('chooseColor'),
		    chooseFontSizeDiv = documentObject.getElementById('chooseFontSize')
		    chooseFontFamilyDiv = documentObject.getElementById('chooseFontFamily'),
		    writeAreaDiv = documentObject.getElementById('writeArea'),
		    undoButton = documentObject.getElementById('undoButton'),
		    redoButton = documentObject.getElementById('redoButton');
		//checking if documentText is set
		var documentText = localStorage.getItem('whiteboardContent');
		if (documentText) {
			writeAreaDiv.innerHTML = documentText;
		} else {
			writeAreaDiv.text = 'Your text goes here...';
		}
		//adding color to choose from
		functions.addColorBoxes(chooseColorDiv);
		chooseColorDiv.style.display = 'none';
		//registering toggle event on textColorButton
		textColorButton.addEventListener('mousedown', function (event) {
			chooseFontSizeDiv.style.display = 'none';
			chooseFontFamilyDiv.style.display = 'none';
			functions.toggleDisplay(chooseColorDiv);
			event.preventDefault();
		});
		//adding font-size to choose from
		functions.addFontSizeBoxes(chooseFontSizeDiv);
		chooseFontSizeDiv.style.display = 'none';
		//registering toggle event on fontSizeButton
		fontSizeButton.addEventListener('mousedown', function (event) {
			chooseColorDiv.style.display = 'none';
			chooseFontFamilyDiv.style.display = 'none';
			functions.toggleDisplay(chooseFontSizeDiv);
			event.preventDefault();
		});
		//adding font-family to choose from
		functions.addFontFamilyBoxes(chooseFontFamilyDiv);
		chooseFontFamilyDiv.style.display = 'none';
		//registering toggle event on fontFamilyButton
		fontFamilyButton.addEventListener('mousedown', function (event) {
			chooseColorDiv.style.display = 'none';
			chooseFontSizeDiv.style.display = 'none';
			functions.toggleDisplay(chooseFontFamilyDiv);
			event.preventDefault();
		});
		writeArea.addEventListener('click', function () {
			chooseColorDiv.style.display = 'none';
			chooseFontSizeDiv.style.display = 'none';
			chooseFontFamilyDiv.style.display = 'none';
		});

		//editing text
		boldButton.addEventListener('mousedown', function (event) {
			//documentObject.execCommand('bold', false, windowObject.getSelection().toString());
			documentObject.execCommand('bold');
			event.preventDefault();
		});
		underlineButton.addEventListener('mousedown', function (event) {
			documentObject.execCommand('underline');
			event.preventDefault();
		});
		italicButton.addEventListener('mousedown', function (event) {
			documentObject.execCommand('italic');
			event.preventDefault();
		});

		for (var i = 0; i < fontColorArray.length; i++) {
			documentObject.getElementsByClassName('colorBox')[i].addEventListener('mousedown', functions.changeFontColor);
		}

		for (var i = 0; i < fontFamilyArray.length; i++) {
			documentObject.getElementsByClassName('fontFamilyBox')[i].addEventListener('mousedown', functions.changeFontFamily);
		}

		for (var i = 0; i < fontSizeArray.length; i++) {
			documentObject.getElementsByClassName('fontSizeBox')[i].addEventListener('mousedown', functions.changeFontSize);
		}

		undoButton.addEventListener('click', function () {
			documentObject.execCommand('undo');
		});

		redoButton.addEventListener('click', function () {
			documentObject.execCommand('redo');
		});

		windowObject.addEventListener('unload', function (event) {
			var documentText = writeAreaDiv.innerHTML;
			localStorage.setItem('whiteboardContent', documentText);
		});
	};
})(window, document);