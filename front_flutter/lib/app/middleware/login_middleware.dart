import 'package:events/app/data/local/sharedpref.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../routes/app_pages.dart';

class LoginMiddleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    if (Sharedpref().getToken != null) {
      return const RouteSettings(name: Routes.HOME);
    }
    return null;
  }
}
