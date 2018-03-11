green=`tput setaf 2`

cd ./database

sequelize db:migrate
echo "\n ${green}Migrating Success"

if [[ $1 == "seed" ]]; then
        sequelize db:seed:all
        echo "\n ${green}Seeding Success"
fi
