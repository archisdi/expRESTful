green=`tput setaf 2`

cd ./database

sequelize db:seed:all

echo "\n ${green}Seeding Success"