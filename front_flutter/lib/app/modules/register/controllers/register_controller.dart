import 'package:get/get.dart';
import 'package:flutter/material.dart';

import '../../../routes/app_pages.dart';

class RegisterController extends GetxController {
  final registerFormkey = GlobalKey<FormState>();
  final registerEmail = TextEditingController();
  final registerUsername = TextEditingController();
  final registerPhone = TextEditingController();
  final registerpassword = TextEditingController();
  final registerconfirmpassword = TextEditingController();

  void onSignIn() {
    if (registerFormkey.currentState!.validate()) {
      Get.offAllNamed(Routes.HOME);
    }
  }
}
