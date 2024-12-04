import 'package:events/app/data/local/sharedpref.dart';

import '../models/users/user.dart';
import 'httphelper.dart';

class UserServices {
  UserServices._();

  static Future<User> getUserDetails() async {
    return User.fromJson(
        await Httphelper.get(path: "/users/${Sharedpref().getUserId}"));
  }
}
