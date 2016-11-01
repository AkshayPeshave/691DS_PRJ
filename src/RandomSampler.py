import mysql.connector
import sys
from mysql.connector import errorcode

DATABASE = 'DataScience_Siraj'
HOST = 'janus.cs.umbc.edu'
PWD = 'root'
USER = 'root'

try:
  cnx = mysql.connector.connect(user=USER,
  								password='root',
  								host = HOST,
                                database=DATABASE,
                                buffered=True
                                )
  query = '''
select ZipCode, Agency, count(*) from tbl331
group by ZipCode, Agency
having count(*) > 100
'''
  cursorZipCode = cnx.cursor()
  cursorZipCode.execute(query)

  for records in  cursorZipCode:
    count = int(records[2])
    print records[2]
    query2 = "insert into random331 select * from tbl331 where ZipCode = '" 
    query2 += records[0] + "'and Agency = '" + records[1] 
    query2 += "' order by rand() limit " + str(count / 5) 

    cursorRecords = cnx.cursor()
    cursorRecords.execute(query2)

except mysql.connector.Error as err:
	if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
		print("Something is wrong with your user name or password")
	elif err.errno == errorcode.ER_BAD_DB_ERROR:
		print("Database does not exist")
	else:
		print(err)
else:
	cnx.close()