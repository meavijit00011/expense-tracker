const User = require("../model/user");

const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "Please Enter Valid Crendential !" });
  }
  const passwordIsRight = await user.comparePassword(password);
  if (!passwordIsRight) {
    return res.status(401).json({ msg: "Please enter valid password !" });
  }
  const token = user.createJwt();
  res
    .status(200)
    .json({
      msg: "user is logged in",
      token,
      userData: { userName: user.name, email: user.email },
      userSetting:{currency:user.currency,image:user.image}
    });
};


const Signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.createJwt();
    res
      .status(201)
      .json({
        msg: "user is created",
        token,
        userData: { userName: user.name, email: user.email },
        userSetting:{currency:user.currency}
      });
  } catch (e) {
    if (e.code == 11000) {
      return res
        .status(409)
        .json({ msg: "Email is allready registered with us !" });
    }
    res.status(500).json("something went wrong !");
  }
};

module.exports = {
  Login,
  Signup,
};
