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

	if(! "MeasureTool" %in% sapply(map$dependencies, function(x) x[['name']]) )
		map$dependencies <- c(map$dependencies, googleMeasureDependencies())

	invoke_method(map, "add_measure")
}




# Clear Measure
#
# @export
# clear_measure <- function(map) {
# 	invoke_method(map, "clear_measure")
# }
