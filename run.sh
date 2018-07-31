screen -dm bash -c 'echo '$password' | sudo -S mongod'
screen -dm bash -c 'cd server && nodemon'
screen -dm bash -c 'npm start'
