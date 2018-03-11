green=`tput setaf 2`

cd ./database

sequelize db:migrate:undo:all
echo "\n ${green}Rollback Success"