import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../data/models/users/user.dart';
import '../../../data/remote/user_services.dart';

class ProfileController extends GetxController with StateMixin {
  final profileForm = GlobalKey<FormState>();
  final TextEditingController profileFirstname = TextEditingController();
  final TextEditingController profilelastname = TextEditingController();
  final TextEditingController profileEmail = TextEditingController();
  final TextEditingController profilephone = TextEditingController();
  Rx<User> user = User().obs;
  @override
  void onInit() async {
    await getUserDetails();
    super.onInit();
  }

  Future<void> getUserDetails() async {
    try {
      user(await UserServices.getUserDetails());
      profileFirstname.text = user.value.firstName ?? "--";
      profilelastname.text = user.value.lastName ?? "--";
      profileEmail.text = user.value.email ?? "--";
      profilephone.text = user.value.phone ?? "--";
      change(null, status: RxStatus.success());
    } catch (e) {
      change(null, status: RxStatus.error("Error on get user details"));
      log(e.toString());
    }
  }

  void onUpdateProfile() {}
}
