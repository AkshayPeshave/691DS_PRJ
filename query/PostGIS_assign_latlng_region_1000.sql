SELECT a.id, b.csa2010
FROM baltimore."vs14_housing" b, baltimore."tbl_331_1000_OnlyLatLng" a 
WHERE 
ST_Within(a.point_location, b.geom)
