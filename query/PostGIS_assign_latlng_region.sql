with cte as 
(
    select 1 as id, ST_Transform(ST_SetSRID(ST_MakePoint(-76.6129, 39.3106), 4326), 102685) point_location
    ,st_astext(ST_Transform(ST_SetSRID(ST_MakePoint(-76.6129, 39.3106), 4326), 102685)) wkt 
)
SELECT a.id, b.csa2010
FROM baltimore."vs14_housing" b, cte a 
WHERE 
ST_Intersects(a.point_location,  b.geom) 
    or 
ST_Contains(a.point_location, b.geom)
    or
ST_Within(a.point_location, b.geom)