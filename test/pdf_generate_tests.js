jQuery(function($) {

	var datestringregex = /\/CreationDate \(D:\d+\)/,
		replacementdatestring = '/CreationDate (D:0)',
		producerstringregex = /\/Producer\s+\(jsPDF\s+\d+\)/,
		replacementproducerstring = '/Producer  (jsPDF 0)',
		displayInTextArea = function(output, label) {
			var $l = $('<label for="'+label+'">'+label+'</label>').appendTo(document.body)
			$('<textarea id="'+label+'"></textarea>').appendTo($l).text(btoa(output));
		},
		removeMinorDiffs = function(t){
			t = t.replace(datestringregex, replacementdatestring)
			t = t.replace(producerstringregex, replacementproducerstring)
			if (t.trim)
				return t.trim()
			else
				return t
		},
		testInventory = {
			"empty": function() {
				return (new jsPDF()).output();
			},
			"twopagedoc": function() {
				var doc = new jsPDF()
				doc.text('Hello world!', 20, 20)
				doc.text('This is client-side Javascript, pumping out a PDF.', 20, 30)
				doc.addPage()
				doc.text('Do you like that?', 20, 20)
				return doc.output()
			},
			"twopagedoc_oldapi": function() {
				var doc = new jsPDF()
				doc.text(20, 20, 'Hello world!')
				doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
				doc.addPage()
				doc.text(20, 20, 'Do you like that?')
				return doc.output()
			},
			"demolandscape": function() {
				var doc = new jsPDF('landscape')
				doc.text('Hello landscape world!', 20, 20)
				return doc.output()
			},
			"fontsizes": function() {
				var doc = new jsPDF()
				doc.setFontSize(22)
				doc.text(20, 20, 'This is a title')

				doc.setFontSize(16)
				doc.text(20, 30, 'This is some normal sized text underneath.');

				return doc.output()
			},
			"demofonttypes": function() {
				var doc = new jsPDF()

				doc.text(20, 20, 'This is the default font.')

				doc.setFont("courier")
				doc.setFontType("normal")
				doc.text(20, 30, 'This is courier normal.')

				doc.setFont("times")
				doc.setFontType("italic")
				doc.text(20, 40, 'This is times italic.')

				doc.setFont("helvetica")
				doc.setFontType("bold")
				doc.text(20, 50, 'This is helvetica bold.')

				doc.setFont("courier")
				doc.setFontType("bolditalic")
				doc.text(20, 60, 'This is courier bolditalic.')

				return doc.output()
			},
			"demotestcolors": function () {
				var doc = new jsPDF()

				doc.setTextColor(100)
				doc.text(20, 20, 'This is gray.')

				doc.setTextColor(150)
				doc.text(20, 30, 'This is light gray.')

				doc.setTextColor(255,0,0)
				doc.text(20, 40, 'This is red.')

				doc.setTextColor(0,255,0)
				doc.text(20, 50, 'This is green.')

				doc.setTextColor(0,0,255)
				doc.text(20, 60, 'This is blue.')

				return doc.output()
			},
			"demometadata": function () {
				var doc = new jsPDF()
				doc.text(20, 20, 'This PDF has a title, subject, author, keywords and a creator.')

				// Optional - set properties on the document
				doc.setProperties({
					title: 'Title',
					subject: 'This is the subject',
					author: 'James Hall',
					keywords: 'generated, javascript, web 2.0, ajax',
					creator: 'MEEE'
				})

				return doc.output()
			},
			"demorectangles": function () {
				var doc = new jsPDF()

				doc.rect(20, 20, 10, 10); // empty square

				doc.rect(40, 20, 10, 10, 'F') // filled square

				doc.setDrawColor(255,0,0)
				doc.rect(60, 20, 10, 10); // empty red square

				doc.setDrawColor(255,0,0)
				doc.rect(80, 20, 10, 10, 'FD') // filled square with red borders

				doc.setDrawColor(0)
				doc.setFillColor(255,0,0)
				doc.rect(100, 20, 10, 10, 'F') // filled red square

				doc.setDrawColor(0)
				doc.setFillColor(255,0,0)
				doc.rect(120, 20, 10, 10, 'FD') // filled red square with black borders

				return doc.output()
			},
			"demoliness": function () {
				var doc = new jsPDF()

				doc.line(20, 20, 60, 20) // horizontal line

				doc.setLineWidth(0.5)
				doc.line(20, 25, 60, 25)

				doc.setLineWidth(1)
				doc.line(20, 30, 60, 30)

				doc.setLineWidth(1.5)
				doc.line(20, 35, 60, 35)

				doc.setDrawColor(255,0,0) // draw red lines

				doc.setLineWidth(0.1)
				doc.line(100, 20, 100, 60) // vertical line

				doc.setLineWidth(0.5)
				doc.line(105, 20, 105, 60)

				doc.setLineWidth(1)
				doc.line(110, 20, 110, 60)

				doc.setLineWidth(1.5)
				doc.line(115, 20, 115, 60)

				return doc.output()
			},
			"democircles": function () {
				var doc = new jsPDF()

				doc.ellipse(40, 20, 10, 5)

				doc.setFillColor(0,0,255)
				doc.ellipse(80, 20, 10, 5, 'F')

				doc.setLineWidth(1)
				doc.setDrawColor(0)
				doc.setFillColor(255,0,0)
				doc.circle(120, 20, 5, 'FD')

				return doc.output()
			},
			"multilinetext": function() {
				var doc = new jsPDF()
				, text = [
				'This is line one'
				, 'This is line two'
				, 'This is line three'
				, 'This is line four'
				, 'This is line five'
				]
				doc.text(text, 20, 20)
				return doc.output()
			},
			"multiplelines": function () {
				var doc = new jsPDF()
				, x1 = 40
				, y1 = 40
				, lines = [
				[10,10]
				, [-20,10]
				, [-15,5,-20,10,-30,15]
				]

				doc.lines(lines, x1, y1)
				doc.lines(lines, x1, y1, [-1, -1])
				doc.lines(lines, x1, y1, [0.5, -0.5])
				doc.lines(lines, x1, y1, [-2, 2])
				return doc.output()
			}
		},
		generateTest = function (filename) {
			asyncTest(filename, function () {
				require(['text!reference_files/' + filename + '.pdf']).then(function (control) {
					var test = testInventory[filename](),
						e = 0;

					e++;
					strictEqual(test, control);

					expect(e);
					start();
				});
			});
		};

	////////////////////////////////////////////////////
	// running homogenous tests

	for (var filename in testInventory) {
		if(testInventory.hasOwnProperty(filename)) {
			generateTest(filename);
		}
	}

// asyncTest('013_sillysvgrenderer', function() {
// 	//QUnit.stop()
// 	require(['text!013_sillysvgrenderer.svg', 'text!013_sillysvgrenderer.pdf'])
// 	.then(function(svgtext, expectedtext){
// 		QUnit.expect(1)

// 		var pdf = jsPDF() // 'p','pt','letter')

// 	pdf.addSVG(svgtext, 20, 20, pdf.internal.pageSize.width - 20*2)

// 		// pdf.output('dataurl')
// 		// window.mypdf = pdf.output('dataurlstring')

// 		var output = pdf.output()
// 		if (dump) {
// 			displayInTextArea(output, '013_sillysvgrenderer')
// 			QUnit.equal(true, true)

// 		} else {
// 			QUnit.equal(
// 				removeMinorDiffs( output )
// 				, removeMinorDiffs( expectedtext )
// 				)
// 		}
// 		QUnit.start()
// 		//stop()
// 	})
// })

// handcrafted tests
// asyncTest('014_addImage', function() {

// 	//QUnit.stop()
// 	require(
// 		['text!014_addImage.jpeg.base64.txt', 'text!014_addImage.pdf.base64.txt']
// 		).then(function(base64encodedJpeg, base64encodedPDF){
// 			QUnit.expect(2)

// 			var pdf = jsPDF()

// 			pdf.addImage(atob(base64encodedJpeg), 'jpeg', 20, 20)

// 			QUnit.equal(
// 			// just testing if it does not blow up.
// 			pdf.output('datauristring') !== ''
// 			, true
// 			)

// 			pdf = jsPDF()

// 			pdf.addImage(atob(base64encodedJpeg), 'jpeg', 20, 20)

// 		// window.pdfbase64 = btoa(pdf.output())

// 		var output = pdf.output()

// 		if (dump) {
// 			displayInTextArea(output, '014_addImage')

// 			QUnit.equal(true, true)

// 		} else {

// 			QUnit.equal(
// 				removeMinorDiffs( output )
// 				, removeMinorDiffs( atob(base64encodedPDF) )
// 				)
// 		}
// 		QUnit.start()
// 		//stop()
// 	})
// 	})


// handcrafted tests
// asyncTest('015_splittext', function() {

// 	//QUnit.stop()
// 	require(
// 		['015_splittext', 'text!015_splittext.pdf']
// 		).then(function(runner, shouldbe){
// 			QUnit.expect(1)
// 			console.log(runner)
// 			var pdf = runner(jsPDF)

// 			var output = pdf.output()
// 			if (dump) {
// 				displayInTextArea(output, '015_splittext')
// 				QUnit.equal(true, true)

// 			} else {
// 				QUnit.equal(
// 					removeMinorDiffs( output )
// 					, removeMinorDiffs( shouldbe )
// 					)
// 			}
// 			QUnit.start()
// 		//stop()
// 	})
// 	})


}); // end of document.ready()


