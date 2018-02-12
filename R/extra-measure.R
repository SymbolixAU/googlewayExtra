googleMeasureDependencies <- function() {
	list(
		htmltools::htmlDependency(
			"MeasureTool",
			"3",
			system.file("lib/MeasureTool", package = "googlewayExtra"),
			script = "lib/MeasureTool.min.js"
		)
	)
}

#' Add Measure
#'
#' @export
add_measure <- function(map) {

	print("adding measure")
	map$dependencies <- c(map$dependencies, googleMeasureDependencies())

	invoke_method(map, "add_measure")
}
