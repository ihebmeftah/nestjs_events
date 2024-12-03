import 'package:events/app/data/models/login/login.dart';
import 'package:events/app/data/models/login/login.dto.dart';
import 'package:events/app/data/models/users/user.dart';
import 'package:events/app/data/remote/httphelper.dart';

class AuthServices {
  AuthServices._();

  static Future<Login> login(LoginDto loginDto) async {
    return Login.fromJson(
      await Httphelper.post(
        path: "/auth/login",
        body: loginDto.toJson(),
      ),
    );
  }

  static Future<Login> register(User user) async {
    return Login.fromJson(
      await Httphelper.post(
        path: "/auth/register",
        body: user.toJson(),
      ),
    );
  }
}
