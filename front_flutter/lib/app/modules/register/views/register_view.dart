import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../../../components/appinput.dart';
import '../controllers/register_controller.dart';

class RegisterView extends GetView<RegisterController> {
  const RegisterView({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          iconTheme: const IconThemeData(color: Colors.black),
          titleTextStyle: const TextStyle(color: Colors.black, fontSize: 22),
          title: const Text('Create an account'),
          centerTitle: false,
        ),
        body: SingleChildScrollView(
            padding: const EdgeInsets.all(25.0),
            child: Form(
                key: controller.registerFormkey,
                child: Column(
                  children: [
                    AppInput(
                      isRequired: true,
                      controller: controller.registerUsername,
                      prefixIcon: const Icon(Icons.person),
                      name: "Username",
                      hint: "John doe",
                    ),
                    const SizedBox(height: 10),
                    AppInput(
                      controller: controller.registerEmail,
                      textInputType: TextInputType.emailAddress,
                      prefixIcon: const Icon(Icons.email),
                      name: "Email",
                      hint: "Johndoe@example.com",
                    ),
                    const SizedBox(height: 10),
                    AppInput(
                      controller: controller.registerEmail,
                      textInputType: TextInputType.phone,
                      prefixIcon: const Icon(Icons.phone),
                      name: "Phone",
                      hint: "+216 20 000 000",
                    ),
                    const SizedBox(height: 10),
                    AppInput(
                      controller: controller.registerpassword,
                      isPassword: true,
                      isRequired: true,
                      textInputType: TextInputType.visiblePassword,
                      prefixIcon: const Icon(Icons.password),
                      suffixIcon: const Icon(Icons.remove_red_eye),
                      name: "Password",
                      hint: "*******************",
                    ),
                    const SizedBox(height: 10),
                    AppInput(
                      controller: controller.registerconfirmpassword,
                      isPassword: true,
                      isRequired: true,
                      textInputType: TextInputType.visiblePassword,
                      prefixIcon: const Icon(Icons.password),
                      suffixIcon: const Icon(Icons.remove_red_eye),
                      name: "Confirm password",
                      hint: "*******************",
                    ),
                    const SizedBox(height: 30),
                    ElevatedButton(
                        onPressed: controller.onSignIn,
                        child: const Text("Register")),
                  ],
                ))));
  }
}
