"use server";
import connectDB from "@/lib/db/mongodb";
import User from "@/models/auth/User";

const getUserName = async ({ email, provider }) => {
    await connectDB();
    const userExist = await User.findOne({ email, provider });
    console.log("in get user name", userExist);

  if (userExist) {
    return {
      success: true,
      error: false,
      name: userExist.name,
      message: "User already exist!",
    };
  }
  return;
};
export { getUserName };
