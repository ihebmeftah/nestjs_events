import 'dart:developer';

import 'package:events/app/data/models/users/user.dart';
import 'package:get/get.dart';
import 'package:flutter/material.dart';

import '../../../data/local/sharedpref.dart';
import '../../../data/models/login/login.dart';
import '../../../data/remote/apis_exception.dart';
import '../../../data/remote/auth_services.dart';
import '../../../routes/app_pages.dart';

class RegisterController extends GetxController with StateMixin {
  final registerFormkey = GlobalKey<FormState>();
  final registerEmail = TextEditingController();
  final registerFirstname = TextEditingController();
  final registerLastname = TextEditingController();
  final registerPhone = TextEditingController();
  final registerpassword = TextEditingController();
  final registerconfirmpassword = TextEditingController();
  @override
  void onInit() {
    change(null, status: RxStatus.success());
    super.onInit();
  }

  void onRegister() async {
    try {
      if (registerFormkey.currentState!.validate()) {
        change(null, status: RxStatus.loading());
        User userCreated = User(
          firstName: registerFirstname.text,
          lastName: registerLastname.text,
          phone: registerPhone.text,
          email: registerEmail.text,
          password: registerpassword.text,
        );
        final Login loggedUser = await AuthServices.register(userCreated);
        Sharedpref().saveToken(loggedUser.accessToken);
        Get.offAllNamed(Routes.HOME);
      }
    } on ConflictExcpetion {
      Get.snackbar('Email or phone exist',
          'User with this email or phone already exist');
    } on BadRequestExcpetion {
      Get.snackbar('Error', 'Please check your information');
    } catch (e) {
      log(e.toString());
    } finally {
      change(null, status: RxStatus.success());
    }
  }
}
