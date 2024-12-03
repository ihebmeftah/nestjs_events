import 'dart:developer';

import 'package:events/app/data/local/sharedpref.dart';
import 'package:events/app/data/models/login/login.dart';
import 'package:events/app/data/models/login/login.dto.dart';
import 'package:events/app/data/remote/apis_exception.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../data/remote/auth_services.dart';
import '../../../routes/app_pages.dart';

class LoginController extends GetxController with StateMixin {
  final siginFormkey = GlobalKey<FormState>();
  final siginEmail = TextEditingController();
  final siginPassword = TextEditingController();
  @override
  void onInit() {
    change(null, status: RxStatus.success());
    super.onInit();
  }

  void onSignIn() async {
    try {
      if (siginFormkey.currentState!.validate()) {
        change(null, status: RxStatus.loading());
        LoginDto loginDto = LoginDto(
          email: siginEmail.text,
          password: siginPassword.text,
        );
        final Login loggedUser = await AuthServices.login(loginDto);
        Sharedpref().saveToken(loggedUser.accessToken);
        Get.offAllNamed(Routes.HOME);
      }
    } on NotFoundExcpetion {
      Get.snackbar('Email incorrect', 'User with this email not found');
    } on BadRequestExcpetion {
      Get.snackbar('Password incorrect', 'Please check your password');
    } catch (e) {
      log(e.toString());
    } finally {
      change(null, status: RxStatus.success());
    }
  }
}
