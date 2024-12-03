import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/home_controller.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: GetBuilder<HomeController>(
          id: "indexbtnav",
          builder: (_) {
            return BottomNavigationBar(
                currentIndex: controller.indexbtnav,
                onTap: controller.changeBtnnav,
                items: const [
                  BottomNavigationBarItem(
                      icon: Icon(Icons.home), label: 'Home'),
                  BottomNavigationBarItem(
                      icon: Icon(Icons.event_note), label: 'My events'),
                  BottomNavigationBarItem(
                      icon: Icon(Icons.notifications), label: 'Notifications'),
                ]);
          }),
      drawer: Drawer(
        child: Column(
          children: [
            UserAccountsDrawerHeader(
              decoration: const BoxDecoration(
                color: Colors.pink,
              ),
              accountName: const Text("Iheb meftah"),
              accountEmail: const Text("c6gqU@example.com"),
              currentAccountPicture: CircleAvatar(
                backgroundColor: Colors.grey.shade200,
                child: const Text("I"),
              ),
            ),
            const ListTile(
              leading: Icon(Icons.person),
              title: Text("My profile"),
            ),
            const Spacer(),
            SafeArea(
              child: ListTile(
                onTap: controller.logout,
                titleTextStyle: const TextStyle(fontWeight: FontWeight.bold),
                iconColor: Colors.red,
                textColor: Colors.red,
                leading: const Icon(Icons.logout),
                title: const Text("Logout"),
              ),
            )
          ],
        ),
      ),
      appBar: AppBar(
        title: const Text("Eventy"),
        bottom: PreferredSize(
            preferredSize:
                Size(Get.width, MediaQuery.sizeOf(context).height * 0.1),
            child: Padding(
              padding: EdgeInsets.all(MediaQuery.sizeOf(context).height * 0.02),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  TextField(
                    onTapOutside: (_) => FocusScope.of(context).unfocus(),
                    decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide.none,
                            borderRadius: BorderRadius.circular(10)),
                        border: OutlineInputBorder(
                            borderSide: BorderSide.none,
                            borderRadius: BorderRadius.circular(10)),
                        enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide.none,
                            borderRadius: BorderRadius.circular(10)),
                        prefixIcon: const Icon(Icons.search),
                        suffixIcon: IconButton(
                            onPressed: () {},
                            icon: const Icon(
                              Icons.send,
                              color: Colors.pink,
                            )),
                        hintText: "Search for events"),
                  )
                ],
              ),
            )),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(MediaQuery.sizeOf(context).height * 0.02),
        child: GetBuilder<HomeController>(
            id: "indexbtnav",
            builder: (_) {
              return IndexedStack(
                index: controller.indexbtnav,
                children: const [
                  Home(),
                  Text("my"),
                  Text("notifications"),
                ],
              );
            }),
      ),
    );
  }
}

class Home extends StatelessWidget {
  const Home({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          children: [
            Icon(Icons.category),
            Text(
              "Categories",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
            ),
          ],
        ),
        const SizedBox(height: 10),
        SizedBox(
          height: 48.0,
          child: ListView.separated(
            physics: const ClampingScrollPhysics(),
            shrinkWrap: true,
            scrollDirection: Axis.horizontal,
            itemCount: 10,
            separatorBuilder: (context, index) => const SizedBox(width: 5),
            itemBuilder: (BuildContext context, int index) {
              return Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.pink.shade500,
                  borderRadius: BorderRadius.circular(15),
                ),
                child: Center(
                  child: Text(
                    "Category $index",
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        fontWeight: FontWeight.bold),
                  ),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 20),
        const Row(
          children: [
            Icon(Icons.event_available),
            Text(
              "Coming soon..",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
            ),
          ],
        ),
        const SizedBox(height: 10),
        SizedBox(
          width: Get.width,
          height: 200,
          child: CarouselView(
            itemExtent: Get.width * 0.7,
            children: List.generate(
              5,
              (i) {
                return Container(
                  decoration: const BoxDecoration(
                    color: Colors.grey,
                  ),
                );
              },
            ),
          ),
        ),
        const SizedBox(height: 20),
        const Row(
          children: [
            Icon(Icons.person),
            Text(
              "Top Organizers",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
            ),
          ],
        ),
        const SizedBox(height: 10),
        ...List.generate(
            3,
            (i) => ListTile(
                  leading: const CircleAvatar(),
                  title: Text('Organizer $i'),
                  subtitle: const Text('100 events'),
                )),
      ],
    );
  }
}
