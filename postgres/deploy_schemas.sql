--Deploy fresh db tables in order, \i executes scripts

\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'

-- seed tables with initial data for testing
\i '/docker-entrypoint-initdb.d/seed/seed.sql'
