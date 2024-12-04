import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../../../components/appinput.dart';
import '../controllers/profile_controller.dart';

class ProfileView extends GetView<ProfileController> {
  const ProfileView({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: controller.obx(
        (s) => SingleChildScrollView(
          padding: const EdgeInsets.all(25.0),
          child: Form(
            key: controller.profileForm,
            child: Column(
              children: [
                CircleAvatar(
                  radius: 60,
                  backgroundColor: Colors.grey.shade200,
                  child: Text(controller.user.value.firstName?[0] ?? "--"),
                ),
                const SizedBox(height: 20),
                AppInput(
                  isRequired: true,
                  controller: controller.profileFirstname,
                  prefixIcon: const Icon(Icons.person),
                  name: "First name",
                  hint: "John",
                ),
                AppInput(
                  isRequired: true,
                  controller: controller.profilelastname,
                  prefixIcon: const Icon(Icons.person),
                  name: "Last name",
                  hint: "doe",
                ),
                const SizedBox(height: 10),
                AppInput(
                  controller: controller.profileEmail,
                  textInputType: TextInputType.emailAddress,
                  prefixIcon: const Icon(Icons.email),
                  name: "Email",
                  hint: "Johndoe@example.com",
                ),
                const SizedBox(height: 10),
                AppInput(
                  controller: controller.profilephone,
                  textInputType: TextInputType.phone,
                  prefixIcon: const Icon(Icons.phone),
                  name: "Phone",
                  hint: "+216 20 000 000",
                ),
                const SizedBox(height: 30),
                ElevatedButton(
                    onPressed: controller.onUpdateProfile,
                    child: const Text("Update")),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
