* [`SSH` Server on Kali Linux](#ssh-server-on-kali-linux)
  * [Install `SSH` server](#install-ssh-server)
  * [Enable root account access from `ssh`](#enable-root-account-access-from-ssh)

# `SSH` Server on Kali Linux
Ref
* <https://www.youtube.com/watch?v=hX4eWqAKQpE>

## Install `SSH` server
This step is usually not required in Kali Linux as it comes preinstalled with `ssh` server. However, if its not installed, you can use
```
sudo apt-get install openssh-server
```
## Enable root account access from `ssh`
By default Kali does not allow root account access from `ssh`. You need to make following changes in the config file.
```
nano /etc/ssh/sshd_config
```
Change following in the config file
```
PermitRootLogin yes
```
Now, `start` the service and check its status
```
service ssh start
service ssh status
```

## Generate SSH key-pair
Let us generate a ssh key-pair in the windows client
```
ssh-keygen -t rsa -b 4096 -f %USERPROFILE%/.ssh/ubuntu_rsa
```
Now, copy the public file into the remote host
```
$ scp %USERPROFILE%/.ssh/ubuntu_rsa.pub student@10.10.10.105:~
```
On the remote host, perform following changes
```
# append the contents of the public key to end of the authorized_keys
$ cat ubuntu_rsa.pub >>~/.ssh/authorized_keys
# you can change the permissions as a good practice
$ chmod 600 authorized_keys
$ rm ~/ubuntu_rsa.pub
```
Now, you can test your connection
```
scp %USERPROFILE%/.ssh/ubuntu_rsa.pub student@10.10.10.105
```
## VS Code SSHSetup
Refs:
* <https://www.youtube.com/watch?v=lKXMyln_5q4>

VS Code SSH configuration
```
Host ubuntu_remote
    HostName 10.10.10.105
    User student
    IdentityFile C:\Users\user\.ssh\ubuntu_rsa
```

