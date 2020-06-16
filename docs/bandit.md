# Bandit

## level 0
```
$ ssh bandit0@bandit.labs.overthewire.org -p 2220
```
__Check disk usage__
```
du -h /home/mandeep/test 

Output:
44K    /home/mandeep/test/data
2.0M    /home/mandeep/test/system design
```
## level 1
__How to open `-` filename__
This type of approach has a lot of misunderstanding because using `-` as an argument refers to `STDIN/STDOUT` i.e `dev/stdin` or `dev/stdout`.So if you want to open this type of file you have to specify the full location of the file such as `./-` .For eg. , if you want to see what is in that file use `cat ./-`
```
bandit1@bandit:~$ ls -la
total 24
-rw-r-----  1 bandit2 bandit1   33 May  7 20:14 -
drwxr-xr-x  2 root    root    4096 May  7 20:14 .
drwxr-xr-x 41 root    root    4096 May  7 20:14 ..
-rw-r--r--  1 root    root     220 May 15  2017 .bash_logout
-rw-r--r--  1 root    root    3526 May 15  2017 .bashrc
-rw-r--r--  1 root    root     675 May 15  2017 .profile
bandit1@bandit:~$ cat ./-
CV1DtqXWVFXTvM2F0k09SHz0YwRINYA9
```
## level 2
__spaces in the filename__
```
bandit2@bandit:~$ cat spaces\ in\ this\ filename
UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK
```

## level 3
__hidden files__
```
bandit3@bandit:~/inhere$ ls -la
total 12
drwxr-xr-x 2 root    root    4096 May  7 20:14 .
drwxr-xr-x 3 root    root    4096 May  7 20:14 ..
-rw-r----- 1 bandit4 bandit3   33 May  7 20:14 .hidden
bandit3@bandit:~/inhere$ cat .hidden
pIwrPrtPN36QITSp3EQaw936yaFoFgAB
```

## level 4
__human readable__
```
bandit4@bandit:~/inhere$ file ./*
./-file00: data
./-file01: data
./-file02: data
./-file03: data
./-file04: data
./-file05: data
./-file06: data
./-file07: ASCII text
./-file08: data
./-file09: data
bandit4@bandit:~/inhere$ cat ./-file07
koReBOKuIDDepwhWk7jZC0RTdopnAYKh
```
