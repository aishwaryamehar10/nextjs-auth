import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
//handling a POST request

export async function POST(request: NextRequest) {
  try {
    //how we are going to grab the data from body
    const reqBody = await request.json();
    const { username, email, password } = reqBody; //destructuring beacuse we need to extract some data from request body

    console.log(reqBody);

    //check if user alredy exist
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User alredy exist" }, { status: 400 });
    }

    //hashing the password
    //create a salt
    const salt = await bcryptjs.genSalt(10);
    //create a hashedpassword
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create a new user

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //save this to the database i.e the newUser
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      username: "",
    });
  } catch (error: any) {
    //handling the error by sending a json response with error message and status
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
