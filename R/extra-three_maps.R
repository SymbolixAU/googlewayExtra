googleThreeDependencies <- function() {
	list(
		htmltools::htmlDependency(
			"ThreeMaps",
			"0.0.9",
			system.file("lib/ThreeMaps", package = "googlewayExtra"),
			script = c("three_maps.js", "threejs-layer.js","lib/three.js","lib/detector.js", "lib/dat.gui.js", "lib/stats.js","styles.js")
		)
	)
}


add_three <- function(map, data) {
	if(! "ThreeMaps" %in% sapply(map$dependencies, function(x) x[['name']]) )
		map$dependencies <- c(map$dependencies, googleThreeDependencies())


	shape <- jsonlite::toJSON(df)
	invoke_method(map, "add_threemaps", shape)
}


