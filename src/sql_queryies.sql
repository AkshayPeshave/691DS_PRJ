
update baltimore."tbl_331_1000_OnlyLatLng"  set point_location = ST_MakePoint(lng, lat);

update baltimore."tbl_331_1000_OnlyLatLng"  set point_location = 
	ST_Transform(ST_SetSRID(ST_MakePoint(lng, lat), 4326), 26913);	
ST_Transform(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326),26913);

