import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../../../components/appinput.dart';
import '../../../routes/app_pages.dart';
import '../controllers/login_controller.dart';

class LoginView extends GetView<LoginController> {
  const LoginView({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(),
        body: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Sign in",
                style: TextStyle(fontSize: 38, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 30),
              Form(
                  key: controller.siginFormkey,
                  child: Column(
                    children: [
                      AppInput(
                        controller: controller.siginEmail,
                        textInputType: TextInputType.emailAddress,
                        prefixIcon: const Icon(Icons.email),
                        name: "Email",
                        hint: "Johndoe@example.com",
                      ),
                      const SizedBox(height: 10),
                      AppInput(
                        controller: controller.siginPassword,
                        isPassword: true,
                        isRequired: true,
                        textInputType: TextInputType.visiblePassword,
                        prefixIcon: const Icon(Icons.password),
                        suffixIcon: const Icon(Icons.remove_red_eye),
                        name: "Password",
                        hint: "*******************",
                        counter: TextButton(
                            onPressed: () {},
                            child: const Text("Forgot password?")),
                      ),
                      const SizedBox(height: 30),
                      ElevatedButton(
                          onPressed: controller.onSignIn,
                          child: const Text("Sign in")),
                      const SizedBox(height: 10),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text("Don't have an account?"),
                          TextButton(
                              onPressed: () => Get.toNamed(Routes.REGISTER),
                              child: const Text(
                                "Register",
                                style: TextStyle(
                                    decoration: TextDecoration.underline,
                                    decorationColor: Colors.pink),
                              ))
                        ],
                      )
                    ],
                  ))
            ],
          ),
        ));
  }
}
