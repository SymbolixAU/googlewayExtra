# library(googleway)
# set_key(read.dcf("~/Documents/.googleAPI", fields = "GOOGLE_MAP_KEY"))
#
# set.seed(123)
# n <- 1e3
# lons <- sample(-180:180, n, replace = T)
# lats <- sample(-90:90, n, replace = T)
#
# df <- data.frame(lat = lats, lon = lons)
#
# google_map(
# 	styles = map_styles()$dark,
# 	location = c(0,0),
# 	zoom = 2) %>%
# 	add_three()
