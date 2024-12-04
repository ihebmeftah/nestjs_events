import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/notifications_controller.dart';

class NotificationsView extends GetView<NotificationsController> {
  const NotificationsView({super.key});
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'NotificationsView is working',
        style: TextStyle(fontSize: 20),
      ),
    );
  }
}
