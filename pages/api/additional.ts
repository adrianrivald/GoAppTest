// import cookie from 'cookie';
// export default (req, res) => {
//   const query = req.query;
//   let token;

//   if (query.q === 'getToken') {
//     if (process.env.NODE_ENV === 'development') {
//       token = req.cookies._coin_goapp_dev
//     }
//   } else if (query.q === 'getUsername') {
//     if (process.env.NODE_ENV === 'development') {
//       token = req.cookies._username_goapp_dev;
//     }
//     // res.statusCode = 200;
//     // res.json({ cookie: username });
//   } else if (query.q === 'setToken') {
//     res.setHeader(
//       'Set-Cookie',
//       cookie.serialize(process.env.COOKIE_TOKEN, req.body.token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== 'development',
//         //maxAge: 60 * 60,
//         sameSite: 'strict',
//         path: '/',
//       })
//     );
//   } else if (query.q === 'setUsername') {
//     res.setHeader(
//       'Set-Cookie',
//       cookie.serialize(
//         process.env.COOKIE_USERNAME,
//         req.body.username,
//         {
//           httpOnly: true,
//           secure: process.env.NODE_ENV !== 'development',
//           //maxAge: 60 * 60,
//           sameSite: 'strict',
//           path: '/',
//         }
//       )
//     );
//   } else if (query.q === 'setOtp') {
//     res.setHeader(
//       'Set-Cookie',
//       cookie.serialize(
//         process.env.COOKIE_OTP_CODE,
//         req.body.otp_code,
//         {
//           httpOnly: true,
//           secure: process.env.NODE_ENV !== 'development',
//           //maxAge: 60 * 60,
//           sameSite: 'strict',
//           path: '/',
//         }
//       )
//     );
//   } else if (query.q === 'removeToken') {
//     res.setHeader(
//       'Set-Cookie',
//       cookie.serialize(process.env.COOKIE_TOKEN, '', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== 'development',
//         expires: new Date(0),
//         sameSite: 'strict',
//         path: '/',
//       })
//     );
//   } else if (query.q === 'removeUsername') {
//     res.setHeader(
//       'Set-Cookie',
//       cookie.serialize(process.env.COOKIE_USERNAME, '', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== 'development',
//         expires: new Date(0),
//         sameSite: 'strict',
//         path: '/',
//       })
//     );
//   } else if (query.q === 'removeOtp') {
//     res.setHeader(
//       'Set-Cookie',
//       cookie.serialize(process.env.COOKIE_OTP_CODE, '', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== 'development',
//         expires: new Date(0),
//         sameSite: 'strict',
//         path: '/',
//       })
//     );
//   }
//   res.statusCode = 200;
//   res.json({ message: 'Nothing to see here', token: token });
// };
