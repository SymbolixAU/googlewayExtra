googleCanvasLayerDependencies <- function() {
	list(
		htmltools::htmlDependency(
			"CanvasLayer",
			"0.0.9",
			system.file("lib/CanvasLayer", package = "googlewayExtra"),
			script = c("lib/CanvasLayer.js", "lib/CanvasLayer.js")
		)
	)
}

#' Add Measure
#'
#' @export
add_canvas <- function(map) {

	if(! "CanvasLayer" %in% sapply(map$dependencies, function(x) x[['name']]) )
		map$dependencies <- c(map$dependencies, googleCanvasLayerDependencies())

	invoke_method(map, "add_canvas")
}
