// import Cookies from 'universal-cookie';
// import axios from 'axios';

// const cookies = new Cookies();
// const cookie_name: string = process.env.api_key;

// const setSession = (token: number, username: string, otp_code: string) => {
//   fetch('/api/additional?q=setToken', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ token: token }),
//   });
//   fetch('/api/additional?q=setUsername', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username: username }),
//   });
//   fetch('/api/additional?q=setOtp', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ otp_code: otp_code }),
//   });
// };

// const getSessionToken = (req) => {
//   let token;
//   if (process.env.NODE_ENV === 'development') {
//     token = req.cookies._coin_goapp_dev;  } 
//   return Number(token || process.env.API_KEY);
// };

// const getSessionUsername = (req) => {
//   let username;
//   if (process.env.NODE_ENV === 'development') {
//     username = req.cookies._username_goapp_dev;
//   } 
//   return String(username || '');
// };

// const getSessionOtp = (req) => {
//   let otp_code;
//   if (process.env.NODE_ENV === 'development') {
//     otp_code = req.cookies._otp_goapp_dev;
//   } 
//   return String(otp_code || '');
// };

// const removeSession = () => {
//   fetch('/api/additional?q=removeToken', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({}),
//   });

//   fetch('/api/additional?q=removeUsername', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({}),
//   });

//   fetch('/api/additional?q=removeOtp', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({}),
//   });
// };

// //If you need token or guarded route use this function
// //to check if token and username already stored or not
// //avoid page login, register, forgot password, send email password
// //handle with yourself

// //from -> when page needed login will redirect to login page
// //and back to from page
// const checkSession = async (from: string, needLogin: boolean) => {
//   //needLogin : true -> login, register, forgot password
//   // send email password
//   // dont use this if page no need login
//   const token: number = await axios
//     .get('/api/additional?q=getToken')
//     .then((value) => {
//       return value.data.token;
//     });

//   if (token &&   needLogin === false) {
//     window.location.href = '/';
//   } else if (!token &&  needLogin === true) {
//     window.location.href = '/';
//   }
// };

// export default {
//   getSessionToken,
//   // getSessionUsername,
//   // getSessionOtp,
//   // removeSession,
//   // checkSession,
//   // setSession,
// };
