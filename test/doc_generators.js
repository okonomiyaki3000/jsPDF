var jsPDFDoc = (function (global) {

	var docs = {
		"empty": {
			'requirements': [],
			'generate': function() {
				return new jsPDF();
			}
		},
		"twopagedoc": {
			'requirements': [],
			'generate': function() {
				return (new jsPDF())
				.text('Hello world!', 20, 20)
				.text('This is client-side Javascript, pumping out a PDF.', 20, 30)
				.addPage()
				.text('Do you like that?', 20, 20);
			}
		},
		"twopagedoc_oldapi": {
			'requirements': [],
			'generate': function() {
				return (new jsPDF())
				.text(20, 20, 'Hello world!')
				.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
				.addPage()
				.text(20, 20, 'Do you like that?');
			}
		},
		"landscape": {
			'requirements': [],
			'generate': function() {
				return (new jsPDF('landscape'))
				.text('Hello landscape world!', 20, 20);
			}
		},
		"fontsizes": {
			'requirements': [],
			'generate': function() {
				return (new jsPDF())
				.setFontSize(22)
				.text(20, 20, 'This is a title')
				.setFontSize(16)
				.text(20, 30, 'This is some normal sized text underneath.');
			}
		},
		"fonttypes": {
			'requirements': [],
			'generate': function() {
				return (new jsPDF())
				.text(20, 20, 'This is the default font.')
				.setFont("courier").setFontType("normal").text(20, 30, 'This is courier normal.')
				.setFont("times").setFontType("italic").text(20, 40, 'This is times italic.')
				.setFont("helvetica").setFontType("bold").text(20, 50, 'This is helvetica bold.')
				.setFont("courier").setFontType("bolditalic").text(20, 60, 'This is courier bolditalic.');
			}
		},
		"textcolors": {
			'requirements': [],
			'generate': function () {
				return (new jsPDF())
				.setTextColor(100).text(20, 20, 'This is gray.')
				.setTextColor(150).text(20, 30, 'This is light gray.')
				.setTextColor(255,0,0).text(20, 40, 'This is red.')
				.setTextColor(0,255,0).text(20, 50, 'This is green.')
				.setTextColor(0,0,255).text(20, 60, 'This is blue.');
			}
		},
		"metadata": {
			'requirements': [],
			'generate': function () {
				return (new jsPDF())
				.text(20, 20, 'This PDF has a title, subject, author, keywords and a creator.')
				.setProperties({
					'title': 'Title',
					'subject': 'This is the subject',
					'author': 'James Hall',
					'keywords': 'generated, javascript, web 2.0, ajax',
					'creator': 'MEEE'
				});
			}
		},
		"rectangles": {
			'requirements': [],
			'generate': function () {
				return (new jsPDF())
				.rect(20, 20, 10, 10) // empty square
				.rect(40, 20, 10, 10, 'F') // filled square
				.setDrawColor(255,0,0).rect(60, 20, 10, 10); // empty red square
				.setDrawColor(255,0,0).rect(80, 20, 10, 10, 'FD') // filled square with red borders
				.setDrawColor(0).setFillColor(255,0,0).rect(100, 20, 10, 10, 'F') // filled red square
				.setDrawColor(0).setFillColor(255,0,0).rect(120, 20, 10, 10, 'FD'); // filled red square with black borders
			}
		},
		"lines": {
			'requirements': [],
			'generate': function () {
				return (new jsPDF())
				.line(20, 20, 60, 20) // horizontal line
				.setLineWidth(0.5).line(20, 25, 60, 25)
				.setLineWidth(1).line(20, 30, 60, 30)
				.setLineWidth(1.5).line(20, 35, 60, 35)
				.setDrawColor(255,0,0) // draw red lines
				.setLineWidth(0.1).line(100, 20, 100, 60) // vertical line
				.setLineWidth(0.5).line(105, 20, 105, 60)
				.setLineWidth(1).line(110, 20, 110, 60)
				.setLineWidth(1.5).line(115, 20, 115, 60);
			}
		),
		"circles": {
			'requirements': [],
			'generate': function () {
				return (new jsPDF())
				.ellipse(40, 20, 10, 5)
				.setFillColor(0,0,255).ellipse(80, 20, 10, 5, 'F')
				.setLineWidth(1).setDrawColor(0).setFillColor(255,0,0).circle(120, 20, 5, 'FD');
			}
		},
		"multilinetext": {
			'requirements': [],
			'generate': function() {
				return (new jsPDF())
				.text([
					'This is line one',
					'This is line two',
					'This is line three',
					'This is line four',
					'This is line five'
					], 20, 20);
			}
		},
		"multiplelines": {
			'requirements': [],
			'generate': function () {
				var x1 = 40,
					y1 = 40,
					lines = [
						[10,10],
						[-20,10],
						[-15,5,-20,10,-30,15]
					];

				return (new jsPDF())
				.lines(lines, x1, y1)
				.lines(lines, x1, y1, [-1, -1])
				.lines(lines, x1, y1, [0.5, -0.5])
				.lines(lines, x1, y1, [-2, 2]);
			}
		}
	};

	function jsPDFDoc(doc) {
		if (!docs[doc]) {
			throw 'Requested doc does not exist.';
		}

		var scope = this;

		scope.doc = doc;

		scope.getRequirements = function () {
			return ['jspdf.js'].concat(docs[scope.doc].requirements);
		};

		scope.save = function (name) {
			return docs[scope.doc].generate().save(!!name ? name : scope.doc + '.pdf');
		};

		scope.output = function () {
			return docs[scope.doc].generate().output();
		};
	}

	var exports = {
		jsPDFDoc: jsPDFDoc
	};

	if (typeof module === 'object') {
		module.exports = exports;
	} else if (typeof define === 'function') {
		define(function() {
			return exports;
		});
	} else {
		global.jsPDFDoc = jsPDFDoc;
	}

	return jsPDFDoc;
}(self));
