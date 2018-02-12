
## Googleway Extra

3rd-party libraries for Google Maps. To be used with a `google_map` object from `library(googleway)`


## Intallation



```
devtools::install_github("SymbolixAU/googlewayExtra")
```

## Example

```
library(googleway)
library(googlewayExtra)

google_map(key = "api_key") %>%
  add_measure()
  
```
