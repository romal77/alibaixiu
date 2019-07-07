// module.exports = async (req, res) => {
// 	if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
// 		const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}\"`
// 		res.send(s)
// 	}else {
// 		res.send('var isLogin = false')
// 	}
// };
module.exports = async(req, res) => {
	if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
	  const s = `var isLogin = true; var isNormalLogin = true;var userId=\"${req.session.userInfo._id}\"`
	  res.send(s)
	} else if (req.session && req.session.userInfo && req.session.userInfo.role == 'normal') {
	  const s = `var isNormalLogin = true;var isLogin = false ;var userId=\"${req.session.userInfo._id}\"`
	  res.send(s)
	} else {
	  res.send('var isLogin = false')
	}
  };
