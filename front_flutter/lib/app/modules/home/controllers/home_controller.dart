import 'package:get/get.dart';

class HomeController extends GetxController {
  int indexbtnav = 0;

  void changeBtnnav(index) {
    if (index != indexbtnav) {
      indexbtnav = index;
      update(["indexbtnav"]);
    }
  }
}
