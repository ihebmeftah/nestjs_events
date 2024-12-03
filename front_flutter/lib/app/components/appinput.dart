import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AppInput extends StatelessWidget {
  const AppInput(
      {super.key,
      this.name,
      this.isPassword = false,
      this.isRequired = false,
      this.controller,
      this.suffixIcon,
      this.prefixIcon,
      this.textInputType,
      this.hint,
      this.counter});
  final String? name, hint;
  final Widget? counter, suffixIcon, prefixIcon;
  final TextEditingController? controller;
  final TextInputType? textInputType;
  final bool isRequired, isPassword;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (name != null)
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              "$name",
              style: const TextStyle(fontSize: 18),
            ),
          ),
        TextFormField(
          keyboardType: textInputType,
          controller: controller,
          obscureText: isPassword,
          validator: (value) {
            if (textInputType == TextInputType.emailAddress) {
              if (!GetUtils.isEmail(value!)) {
                return "Please enter a valid email";
              }
            }

            if (isRequired) {
              if (value!.isEmpty) {
                return "This field is required";
              }
            }
            return null;
          },
          decoration: InputDecoration(
              prefixIcon: prefixIcon,
              suffixIcon: suffixIcon,
              counter: counter,
              hintText: hint),
          onTapOutside: (_) => FocusManager.instance.primaryFocus?.unfocus(),
        ),
      ],
    );
  }
}
