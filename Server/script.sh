#!/bin/sh

# Setup Users
adduser -D git
adduser -D webadmin

# Configure Passwords
usermod -p $SERVER_PASS git
usermod -p $WEBADMIN_PASS webadmin

# Clear Variables
unset WEBADMIN_PASS
unset SERVER_PASS

# Git Configuration
git config --global user.name "git-server"
git config --global user.email "root@localhost"

# DIR VARIABLES
GIT_SERVER="webadmin/git-server"

# Init Repos & Copy over Repos
# And setup Permissions
REPO_DIR='/home/git'

echo "Setup Repository Permisions"
for d in $REPO_DIR/* ; do
	file=`basename $d`

	# Make sure it Exists
	if [ -d "$REPO_DIR/$file" ]; then
		# Set Permissions
		chgrp -R git $d
		chown -R git $d
	fi
done


# Setup sshd
ssh-keygen -f /etc/ssh/ssh_host_rsa_key -N '' -t rsa
ssh-keygen -f /etc/ssh/ssh_host_dsa_key -N '' -t dsa
/usr/sbin/sshd -D&

# Run Git Server
echo "Starting Web-Server..."
mkdir -p /logs
cd $GIT_SERVER

if [ $DEBUG_ENABLE = true ]; then
	npm run start-dev | tee /logs/git-server.log
else
	npm run start | tee /logs/git-server.log
fi
