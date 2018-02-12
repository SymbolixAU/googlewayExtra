googleMeasureDependencies <- function() {
	list(
		htmltools::htmlDependency(
			"MeasureTool",
			"0.0.9",
			system.file("lib/MeasureTool", package = "googlewayExtra"),
			script = c("lib/MeasureTool.min.js", "lib/measure.js")
		)
	)
}

#' Add Measure
#'
#' @export
add_measure <- function(map) {
	map$dependencies <- c(map$dependencies, googleMeasureDependencies())
	invoke_method(map, "add_measure")
}
