# memo_paper_server

### Require

- This application is based on the nodejs, so the npm you must installed:
  ```sh
  $sudo apt-get install npm
  $npm -v #to check the version installed 
  ```
  If you want to upgrade the npm version:
  ```sh
  sudo npm install npm -g
  ```

- We recommand to use the latest version of nodejs, the default version in Ubuntu 16 LTS is "out of style". 
  There is a powerful tool ("n") used to choose what nodejs version you want to install. 
  "n" can be installed using npm simply by running the following command:
  ```sh
  $ npm install n
  ```
  After installing n, you can switch between different versions of NodeJS installations as follows:
  ```sh
  $ n list
  $ n xxx #install nodejs according to xxx which is replaced by whatever version list above
  $ n use xxx #choose the version you installed 
  ```
  You can use `node -v` to check the version.

- mongodb is the database we used, so you'd better install that and start the deamon:
  ```sh
  sudo npm install mongodb
  sudo systemctl start mongodb.service #Make sure the deamon started.
  ```

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:8000
```

### IDEA
- I have got an idea, this application can not only use as a reminder. The user can choose what the app will be. For example, It could be choosen as a reminder, a weather reporter, a static calendar, a clock it even can dynamic reminde the user to do something(like the Reminders in ios). May be combine colock and reminder.
- If as a clock, it could have multiple pattern to choose.
- Add the lovers mode, so the lover can reminde each other by the application and the message will show on the ink display.

### The Function will have
[] memo
[] Weather forecast
[] clock


### TODO

- Use the email to send the verification code, and replace the invitation code.// Or use the ink paper display the QR code when the first use, the user need to scan the QR code and get a number or some code else, when the user register, he/she need to input the code and the email verification code.
- After md5, use ajex to transport username and password to server and wait return code, if the code is ok, then redirect /dashboard, else report error. //DONE
- Add a 404 page for the 404 not found //DONE
- Add a 500 page for the server error //DONE
