import { Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserModel } from "./user.interface";
import { UserStatus } from "./user.constant";
import config from "../../config/config";

const userSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "trainer", "trainee"],
      default: "trainee",
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round));
  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isPasswordMatched = async function (candidatePassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

userSchema.statics.isUserExistById = async function (id: string): Promise<IUser | null> {
  console.log(id);
  return await this.findById(id);
};

userSchema.statics.isUserExistByEmail = async function (email: string): Promise<IUser | null> {
  return await this.findOne({ email }).select("+password");
};

const UserModel = model<IUser, IUserModel>("User", userSchema);

export default UserModel;
