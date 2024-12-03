import 'package:json_annotation/json_annotation.dart';

import '../users/user.dart';
part 'login.g.dart';

@JsonSerializable()
class Login {
  @JsonKey()
  String accessToken;
  @JsonKey(name: "createdUser")
  User createdUser;

  Login({required this.accessToken, required this.createdUser});

  factory Login.fromJson(Map<String, dynamic> json) => _$LoginFromJson(json);
}
