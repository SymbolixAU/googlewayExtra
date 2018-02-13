function add_measure(map_id) {
	window[map_id + 'googleMeasure'] = [];
	window[map_id + 'googleMeasure'] = new MeasureTool(window[map_id + 'map']);

	measure_data(map_id);

}

/*
function clear_measure(map_id) {
	window[map_id + 'googleMeasure'] = null;
}
*/

function measure_data(map_id) {
//	if (!HTMLWidgets.shinyMode) {
//        return;
//  }
  console.log("measure data");
  window[map_id + 'googleMeasure'].addListener('measure_start', function(event) {
      console.log('ended', event.result);
    });
}
