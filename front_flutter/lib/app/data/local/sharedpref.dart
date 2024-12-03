import 'package:get_storage/get_storage.dart';

class Sharedpref {
  final String _token = "token";

  Sharedpref._internal();

  static final Sharedpref _instance = Sharedpref._internal();

  factory Sharedpref() {
    return _instance;
  }

  final GetStorage _storage = GetStorage();

  Future<bool> saveToken(String value) async {
    await _storage.write(_token, "Bearer $value");
    return true;
  }

  String? get getToken => _storage.read<String>(_token);

  Future<bool> clearStorage() async {
    await _storage.erase();
    return true;
  }
}
