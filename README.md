# memo_paper_server

### Require
You MUST have mongodb installed on the env that the app will run, and start the mongod process.

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

### TODO

- Use the email to send the verification code, and replace the invitation code.// Or use the ink paper display the QR code when the first use, the user need to scan the QR code and get a number or some code else, when the user register, he/she need to input the code and the email verification code.
- After md5, use ajex to transport username and password to server and wait return code, if the code is ok, then redirect /dashboard, else report error. //DONE
- Add a 404 page for the 404 not found //DONE
- Add a 500 page for the server error //DONE
