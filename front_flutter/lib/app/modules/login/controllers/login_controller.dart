import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../routes/app_pages.dart';

class LoginController extends GetxController {
  final siginFormkey = GlobalKey<FormState>();
  final siginEmail = TextEditingController();
  final siginPassword = TextEditingController();

  void onSignIn() {
    if (siginFormkey.currentState!.validate()) {
      Get.offAllNamed(Routes.HOME);
    }
  }
}
