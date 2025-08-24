import { Expose } from "class-transformer";
import { IsEmail, IsString, IsNotEmpty, IsInt, IsDate } from "class-validator";

export class CreateDtoUser {
  @Expose()
  @IsString({ message: "Họ không được để trống!" })
  @IsNotEmpty({ message: "Họ không được để trống!" })
  first_name!: string;

  @Expose()
  @IsString({ message: "Tên không được để trống!" })
  @IsNotEmpty({ message: "Tên không được để trống!" })
  last_name!: string;

  @Expose()
  @IsEmail({}, { message: "Email không hợp lệ!" })
  email!: string;

  @Expose()
  @IsString({ message: "Mật khẩu không được để trống!" })
  password!: string;

  @Expose()
  @IsString({ message: "Số điện thoại không được để trống!" })
  phone!: string;

  @Expose()
  @IsInt({ message: "Trạng thái phải là một số nguyên!" })
  status!: number;

  @Expose()
  @IsInt({ message: "Loại người dùng phải là một số nguyên!" })
  userType!: number;
}
