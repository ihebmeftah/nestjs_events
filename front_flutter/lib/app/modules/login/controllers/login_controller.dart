import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginController extends GetxController {
  final siginFormkey = GlobalKey<FormState>();
  final registerFormkey = GlobalKey<FormState>();
  final siginEmail = TextEditingController();
  final siginPassword = TextEditingController();

  void onSignIn() {
    if (siginFormkey.currentState!.validate()) {}
  }
}
