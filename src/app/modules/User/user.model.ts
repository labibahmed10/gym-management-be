import { Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserModel } from "./user.interface";
import { UserStatus } from "./user.constant";
import config from "../../config/config";

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
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
      required: [true, "Status is required"],
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

userSchema.methods.isPasswordMatched = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel: Model<IUser> = model<IUser, IUserModel>("User", userSchema);

export default UserModel;
