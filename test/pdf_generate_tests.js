jQuery(function($) {

	var datestringregex = /\/CreationDate \(D:\d+\)/,
		replacementdatestring = '/CreationDate (D:0)',
		producerstringregex = /\/Producer\s+\(jsPDF\s+\d+\)/,
		replacementproducerstring = '/Producer  (jsPDF 0)',
		removeMinorDiffs = function(t){
			t = t.replace(datestringregex, replacementdatestring);
			t = t.replace(producerstringregex, replacementproducerstring);
			return !!t.trim ? t.trim() : t;
		};

	////////////////////////////////////////////////////
	// running homogenous tests

	[
		"empty",
		"twopagedoc",
		"twopagedoc_oldapi",
		"demolandscape",
		"fontsizes",
		"fonttypes",
		"textcolors",
		"metadata",
		"demorectangles",
		"demoliness",
		"democircles",
		"multilinetext",
		"multiplelines"
	].forEach(function (filename) {
		asyncTest(filename, function () {
			require(['text!reference_files/' + filename + '.pdf']).then(function (control) {
				var test = (new jsPDFDoc(filename)).output(),
					e = 0;

				e++;
				QUnit.strictEqual(test, control);

				QUnit.expect(e);
				QUnit.start();
			},
			function () {
			});
		});
	});

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
