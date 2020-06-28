## hydra
### http-get-form
Refs:
* <https://youtu.be/3pSjwLbdxLA>
* <https://securitytutorials.co.uk/brute-forcing-web-logins-with-dvwa/>

Typical layout of the command is as follows
```
hydra -L <USER> -P <Password> <IP Address> http-post-form “<Login Page>:<Request parameters/body>:<Error Message>”
```
Lets, take a typical case of bruteforcing the dvwa app. Here, we are already logged-in. Therefore, we have to send the cokies along with our hydra command

```

```
