import 'package:events/app/data/local/sharedpref.dart';
import 'package:get/get.dart';

import '../../../routes/app_pages.dart';

class HomeController extends GetxController with StateMixin {
  int indexbtnav = 0;

  void changeBtnnav(index) {
    if (index != indexbtnav) {
      indexbtnav = index;
      update(["indexbtnav"]);
    }
  }



  void logout() async {
    await Sharedpref().clearStorage();
    Get.offAllNamed(Routes.LOGIN);
  }
}
